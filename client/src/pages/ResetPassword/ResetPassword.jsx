import React, { Component, Fragment } from 'react';
import { authenticationService } from '../../services';
import './ResetPassword.css';
import '../../common.css';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      confirmPassword: '',
      submitted: false,
      loading: false,
      error: ''
    };
  }

  componentDidMount() {
    authenticationService
      .checkResetTokenValidity(this.props.match?.params.token)
      .then(
        res => {
          if (res.message === 'VALID') {
            this.setState({
              name: `${res.user.firstname} ${res.user.lastname}`,
              loading: false,
              error: false
            });
          } else {
            this.setState({ loading: false, error: true });
          }
        },
        error => this.setState({ error, loading: false })
      );
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { password, confirmPassword } = this.state;

    // check form is valid
    if (!password || !confirmPassword) return;

    if (password !== confirmPassword) {
      return this.setState({ error: 'Passwords do not match' });
    }

    this.setState({ loading: true });
    // TODO: update user account here
  };

  render() {
    const {
      name,
      password,
      confirmPassword,
      submitted,
      loading,
      error
    } = this.state;
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
            <p id="reset-password-title">Hello, {name}</p>

            {/* NEW PASSWORD */}
            <div
              className={
                'form-group' + (submitted && !password ? ' has-error' : '')
              }
            >
              <label htmlFor="password">
                New password<p className="compulsory-asterisk">*</p>
              </label>
              <input
                type="text"
                className="form-control"
                name="password"
                value={password}
                onChange={this.handleChange}
              ></input>
              {submitted && !password && (
                <div className="help-block">New password is required</div>
              )}
            </div>

            {/* CONFIRM NEW PASSWORD */}
            <div
              className={
                'form-group' +
                (submitted && !confirmPassword ? ' has-error' : '')
              }
            >
              <label htmlFor="confirmPassword">
                Confirm new password<p className="compulsory-asterisk">*</p>
              </label>
              <input
                type="text"
                className="form-control"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
              ></input>
              {submitted && !confirmPassword && (
                <div className="help-block">
                  Password confirmation is required
                </div>
              )}
            </div>

            {/* SUBMIT */}
            <div id="reset-password-button-container" className="form-group">
              <button className="btn btn-primary" disabled={loading}>
                Reset password
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

export default ResetPassword;
