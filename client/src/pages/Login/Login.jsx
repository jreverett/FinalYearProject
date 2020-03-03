import React, { Component, Fragment } from 'react';
import { authenticationService } from '../../services';
import '../../common.css';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      submitted: false,
      loading: false,
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, password } = this.state;

    // check form is valid
    if (!(email && password)) return;

    this.setState({ loading: true });
    authenticationService.login(email, password).then(
      user => {
        this.setState({ loading: false });
      },
      error => this.setState({ error, loading: false })
    );
  }

  componentWillUpdate() {
    // if user is already logged in, redirect to home
    if (this.props.loggedInUser) window.location.href = '/';
  }

  render() {
    const { submitted, email, password, loading, error } = this.state;
    return (
      <Fragment>
        {loading && <div id="loading-fade" />}

        <div id="form-container" className="col-md-4 offset-md-4">
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
              />
              {submitted && !email && (
                <div className="help-block">Email is required</div>
              )}
            </div>

            {/* PASSWORD */}
            <div
              className={
                'form-group' + (submitted && !password ? ' has-error' : '')
              }
            >
              <label htmlFor="password">
                Password<p className="compulsory-asterisk">*</p>
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              {submitted && !password && (
                <div className="help-block">Password is required</div>
              )}
            </div>
            <div id="login-button-container" className="form-group">
              <button
                id="login-button"
                className="btn btn-primary"
                disabled={loading}
              >
                Login
              </button>
              {loading && (
                <Fragment>
                  <img
                    id="loading-wheel"
                    src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                  />
                </Fragment>
              )}
            </div>
            {error && <div className={'alert alert-danger'}>{error}</div>}
          </form>
          <br />
          <div className="strike">
            <span>or</span>
          </div>
          <div id="question-container">
            <p>Don't have an account? </p>
            <a href="/signup">Sign up</a>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Login;
