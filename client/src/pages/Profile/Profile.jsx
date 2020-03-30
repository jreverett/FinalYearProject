import React, { Component, Fragment } from 'react';
import Geosuggest from 'react-geosuggest';
import { userService, authenticationService } from '../../services';
import '../../common.css';
import './Profile.css';

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      email: '',
      emailConsent: '',
      address: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
  }

  componentDidMount() {
    // fetch and set user state properties
    const userID = authenticationService.loggedInUserValue.id;

    userService.get(userID).then(user => {
      user = user.data;
      this.setState({
        id: user._id,
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
        emailConsent: user.emailConsent,
        address: user.address
      });
    });
  }

  handleChange(e) {
    const name = e.target.name;
    const value = name === 'emailConsent' ? e.target.checked : e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { id, email, emailConsent, address } = this.state;

    if (!email) return;

    this.setState({ loading: true });
    userService.update(id, email, emailConsent, address).then(
      () => {
        this.setState({ loading: false });
      },
      error => this.setState({ error, loading: false })
    );
  }

  onSuggestSelect(suggest) {
    this.setState({ address: suggest });
  }

  render() {
    const {
      submitted,
      name,
      email,
      emailConsent,
      address,
      loading,
      error
    } = this.state;
    return (
      <Fragment>
        {loading && <div id="loading-fade" />}

        <div id="form-container" className="col-md-4 offset-md-4">
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
                value={email}
                onChange={this.handleChange}
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
                  checked={emailConsent}
                  onChange={this.handleChange}
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
                initialValue={address.description}
                onSuggestSelect={this.onSuggestSelect}
              />
            </div>

            <div className="form-group">
              <button
                id="save-button"
                className="btn btn-primary button-green"
                disabled={loading}
              >
                Save
              </button>
              {submitted && !error && (
                <p className="text-success">Your changes have been saved</p>
              )}
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default Profile;
