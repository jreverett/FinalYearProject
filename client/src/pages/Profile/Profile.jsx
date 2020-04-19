import React, { Component, Fragment } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Geosuggest from 'react-geosuggest';
import { toast } from 'react-toastify';
import { FaSave } from 'react-icons/fa';
import { userService } from '../../services';
import { SubscriptionTable, MyEventsTable } from '../../components';
import '../../common.css';
import './Profile.css';

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabKey: 'subscriptions',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      changePassword: false,
      loading: false,
      submitted: false,
      error: '',
    };
  }

  // toggles displaying of password boxes when the 'change password' or 'close' button is selected
  changePassword = () => {
    this.setState({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      changePassword: !this.state.changePassword,
    });
  };

  // called when profile state values are modified
  handlePasswordChangeValue = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // called when a property of the loggedInUser is modified
  handleUserChangeValue = (e) => {
    const name = e.target.name;
    var updatedUser = {
      ...this.props.loggedInUser,
      [e.target.name]:
        name === 'emailConsent' ? e.target.checked : e.target.value,
    };

    this.props.updateUser(updatedUser);
  };

  // called when a geosuggest suggestion is selected
  onSuggestSelect = (suggest) => {
    var updatedUser = {
      ...this.props.loggedInUser,
      address: suggest,
    };

    this.props.updateUser(updatedUser);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ submitted: true });

    // check that the email field has been filled
    const { _id, email, emailConsent, address } = this.props.loggedInUser;
    if (!email) return;

    // check if a new password has been input, validate if it has
    const {
      currentPassword,
      newPassword,
      confirmNewPassword,
      changePassword,
    } = this.state;
    if (changePassword) {
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        return toast.info(
          "Click 'Close' above the password fields to proceed without changing your password"
        );
      }
      if (newPassword !== confirmNewPassword) {
        return this.setState({ error: 'New passwords do not match' });
      }
    }

    this.setState({ loading: true });
    userService
      .update(_id, email, emailConsent, address, currentPassword, newPassword)
      .then(
        () => {
          this.setState({ loading: false });
          toast.success(
            <p>
              <FaSave className="form-icon" /> Your changes have been saved
            </p>
          );
        },
        (error) => {
          this.setState({ error, loading: false });
          toast.error(error);
        }
      );
  };

  render() {
    const { email, emailConsent, address } = this.props.loggedInUser;
    const name = `${this.props.loggedInUser.firstname} ${this.props.loggedInUser.lastname}`;

    const {
      currentPassword,
      newPassword,
      confirmNewPassword,
      changePassword,
      submitted,
      loading,
      error,
    } = this.state;
    return (
      <Fragment>
        {loading && <div id="loading-fade" />}

        <div
          id="profile-container"
          className="form-container col-md-6 offset-md-3"
        >
          <div id="profile-form-container">
            <div>
              <p className="text-header">{name}</p>
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
                  onChange={this.handleUserChangeValue}
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
                    onChange={this.handleUserChangeValue}
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
              {changePassword ? (
                <>
                  <div>
                    {/* Hidden username field for accessability (https://goo.gl/9p2vKq) */}
                    <input
                      type="text"
                      className="hidden"
                      name="email"
                      autoComplete="username email"
                    ></input>

                    <button
                      className="profile-toggle-pass"
                      onClick={this.changePassword}
                    >
                      Close
                    </button>

                    {/* CURRENT PASSWORD */}
                    <div
                      className={
                        'form-group' +
                        (submitted && !currentPassword ? ' has-error' : '')
                      }
                    >
                      <label htmlFor="currentPassword">
                        Current password<p className="compulsory-asterisk">*</p>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={this.handlePasswordChangeValue}
                        autoComplete="new-password"
                      ></input>
                      {submitted && !currentPassword && (
                        <div className="help-block">
                          Current password is required
                        </div>
                      )}
                    </div>
                  </div>

                  {/* NEW PASSWORD */}
                  <div
                    className={
                      'form-group' +
                      (submitted && !newPassword ? ' has-error' : '')
                    }
                  >
                    <label htmlFor="newPassword">
                      New password<p className="compulsory-asterisk">*</p>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="newPassword"
                      value={newPassword}
                      onChange={this.handlePasswordChangeValue}
                      autoComplete="new-password"
                    ></input>
                    {submitted && !newPassword && (
                      <div className="help-block">New password is required</div>
                    )}
                  </div>

                  {/* CONFIRM NEW PASSWORD */}
                  <div
                    className={
                      'form-group' +
                      (submitted && !confirmNewPassword ? ' has-error' : '')
                    }
                  >
                    <label htmlFor="confirmNewPassword">
                      Confirm new password
                      <p className="compulsory-asterisk">*</p>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmNewPassword"
                      value={confirmNewPassword}
                      onChange={this.handlePasswordChangeValue}
                      autoComplete="new-password"
                    ></input>
                    {submitted && !confirmNewPassword && (
                      <div className="help-block">
                        Password confirmation is required
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <button
                  className="profile-toggle-pass"
                  onClick={this.changePassword}
                >
                  Change Password
                </button>
              )}

              {/* SAVE */}
              <div id="profile-save-button-container" className="form-group">
                <button
                  id="profile-save-button"
                  className="btn btn-primary button-green"
                  disabled={loading}
                >
                  Save
                </button>
                {loading && (
                  <img
                    id="loading-wheel"
                    src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                    alt="loading wheel"
                  />
                )}
              </div>
              {error && <div className={'alert alert-danger'}>{error}</div>}
            </form>
          </div>

          {/* SUBBSCRIPTIONS / MY EVENTS */}
          <div id="profile-subs-container">
            <Tabs
              activeKey={this.state.tabKey}
              onSelect={(tabKey) => this.setState({ tabKey })}
              className="profile-tabs"
            >
              <Tab
                eventKey="subscriptions"
                title="Subscriptions"
                className="profile-tab"
              >
                <SubscriptionTable loggedInUser={this.props.loggedInUser} />
              </Tab>
              <Tab
                eventKey="myEvents"
                title="My Events"
                className="profile-tab"
              >
                <MyEventsTable loggedInUser={this.props.loggedInUser} />
              </Tab>
            </Tabs>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Profile;
