import React, { Component, Fragment } from 'react';
import Geosuggest from 'react-geosuggest';
import { toast } from 'react-toastify';
import { FaSave } from 'react-icons/fa';
import { userService } from '../../services';
import { SubscriptionGallery } from '../../components';
import '../../common.css';
import './Profile.css';

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      submitted: false,
      error: ''
    };
  }

  // called when a property of the loggedInUser is modified
  handleChangeValue = e => {
    const name = e.target.name;
    var updatedUser = {
      ...this.props.loggedInUser,
      [e.target.name]:
        name === 'emailConsent' ? e.target.checked : e.target.value
    };

    this.props.updateUser(updatedUser);
  };

  // called when a geosuggest suggestion is selected
  onSuggestSelect = suggest => {
    var updatedUser = {
      ...this.props.loggedInUser,
      address: suggest
    };

    this.props.updateUser(updatedUser);
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { _id, email, emailConsent, address } = this.props.loggedInUser;

    if (!email) return;

    this.setState({ loading: true });
    userService.update(_id, email, emailConsent, address).then(
      () => {
        this.setState({ loading: false });
        toast.success(
          <p>
            <FaSave className="form-icon" /> Your changes have been saved
          </p>
        );
      },
      error => {
        this.setState({ error, loading: false });
        toast.error(error);
      }
    );
  };

  changePassword = () => {
    alert('TODO: This should reveal password reset (new/confirm new) boxes');
    // userService.changePassword(this.props.loggedInUser._id).then(() => {
    //   toast.success(
    //     <p>
    //         <MdEmail className="form-icon" /> A password reset link has been emailed to you
    //       </p>
    //   )
    // })
  };

  render() {
    const {
      submitted,
      email,
      emailConsent,
      address,
      loading
    } = this.props.loggedInUser;

    const name = `${this.props.loggedInUser.firstname} ${this.props.loggedInUser.lastname}`;
    return (
      <Fragment>
        {loading && <div id="loading-fade" />}

        <div
          id="profile-container"
          className="form-container col-md-6 offset-md-3"
        >
          <div id="profile-form-container">
            <div>
              <p id="name-label">{name}</p>
            </div>
            <form name="form" onSubmit={this.handleSubmit}>
              {/* EMAIL */}
              <div
                className={
                  'form-group' + (submitted && !email ? ' has-error' : '')
                }
              >
                <label htmlFor="email">
                  Email<p className="compulsory-asterisk">*</p>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email || ''}
                  onChange={this.handleChangeValue}
                  autoComplete="username"
                />
                {submitted && !email && (
                  <div className="help-block">Email cannot be blank</div>
                )}
              </div>

              {/* EMAIL NOTIFICATIONS */}
              <div className={'form-group'}>
                <label htmlFor="emailConsent">
                  <input
                    type="checkbox"
                    name="emailConsent"
                    checked={emailConsent || ''}
                    onChange={this.handleChangeValue}
                  />
                  <p id="notification-label">
                    I would like to recieve event announcements
                  </p>
                </label>
              </div>

              {/* ADDRESS */}
              <div className={'form-group'}>
                <label htmlFor="address">Address</label>
                <Geosuggest
                  className="address-search"
                  placeholder="Start tying an address..."
                  initialValue={address?.description}
                  onSuggestSelect={this.onSuggestSelect}
                />
              </div>

              {/* RESET PASSWORD */}
              <div id="profile-reset-pass-container">
                <a id="profile-reset-pass" onClick={this.changePassword}>
                  Change Password
                </a>
              </div>

              {/* SAVE */}
              <div id="profile-save-button-container" className="form-group">
                <button
                  id="profile-save-button"
                  className="btn btn-primary button-green"
                  disabled={loading}
                >
                  Save
                </button>
              </div>
            </form>
          </div>

          <div id="profile-subs-container">
            <p id="profile-subs-header">Subscriptions</p>
            <SubscriptionGallery loggedInUser={this.props.loggedInUser} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Profile;
