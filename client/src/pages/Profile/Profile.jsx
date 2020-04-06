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

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
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
            <FaSave className="modal-icon" /> Your changes have been saved
          </p>
        );
      },
      error => {
        this.setState({ error, loading: false });
        toast.error(error);
      }
    );
  }

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
                  onChange={this.props.onChangeValue}
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
                    onChange={this.props.onChangeValue}
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
                  onSuggestSelect={this.props.onSuggestSelect}
                />
              </div>

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
