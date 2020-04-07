import React, { Component, Fragment } from 'react';
import { toast } from 'react-toastify';
import { MdEmail } from 'react-icons/md';
import { userService } from '../../services';
import './ForgotPassword.css';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    // if user is already logged in, redirect to profile for password resetting
    if (userService.loggedInUserValue) {
      window.location.href = '/user';
    }

    this.state = {
      email: '',
      submitted: false,
      loading: false,
      error: ''
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email } = this.state;

    // check form is valid
    if (!email) return;

    this.setState({ loading: true });
    userService.forgotPassword(email).then(
      () => {
        toast.success(
          <p>
            <MdEmail className="form-icon" size={'1.5em'} /> If that account
            exists, a password reset link has been sent to it
          </p>
        );
        this.setState({ loading: false });
      },
      error => this.setState({ error, loading: false })
    );
  };

  render() {
    const { email, submitted, loading, error } = this.state;
    return (
      <Fragment>
        {loading && <div id="loading-fade" />}

        <div className="form-container col-md-4 offset-md-4">
          <div id="logo-container">
            <img
              id="logo"
              src={require('../../images/upvent.png')}
              alt="Upvent logo"
            />
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
              ></input>
              {submitted && !email && (
                <div className="help-block">Email is required</div>
              )}
            </div>

            {/* SUBMIT */}
            <div id="forgot-password-button-container" className="form-group">
              <button
                id="forgot-password-button"
                className="btn btn-primary"
                disabled={loading}
              >
                Send password reset link
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
          <div className="strike">
            <span>or</span>
          </div>
          <div id="question-container">
            <a href="/login">Return to log in</a>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ForgotPassword;
