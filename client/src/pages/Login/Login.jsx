import React, { Component, Fragment } from 'react';
import { NavBar } from '../../components/index';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
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
    const { firstname, lastname, email, password } = this.state;

    // check form is valid
    if (!(firstname || lastname || email || password)) return;

    this.setState({ loading: true });
    alert(
      `reached login attempt with values: ${firstname}, ${lastname}, ${email}, ${password}`
    ); // TODO: call the user login API here
  }

  render() {
    const {
      submitted,
      firstname,
      lastname,
      email,
      password,
      loading,
      error
    } = this.state;
    return (
      <Fragment>
        <NavBar />

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
            {/* FIRST NAME */}
            <div
              className={
                'form-group' + (submitted && !firstname ? ' has-error' : '')
              }
            >
              <label htmlFor="firstname">First name</label>
              <input
                type="text"
                className="form-control"
                name="firstname"
                value={firstname}
                onChange={this.handleChange}
              />
              {submitted && !firstname && (
                <div className="help-block">First name is required</div>
              )}
            </div>

            {/* LAST NAME */}
            <div
              className={
                'form-group' + (submitted && !lastname ? ' has-error' : '')
              }
            >
              <label htmlFor="lastname">Last name</label>
              <input
                type="text"
                className="form-control"
                name="lastname"
                value={lastname}
                onChange={this.handleChange}
              />
              {submitted && !lastname && (
                <div className="help-block">Last name is required</div>
              )}
            </div>

            {/* EMAIL */}
            <div
              className={
                'form-group' + (submitted && !email ? ' has-error' : '')
              }
            >
              <label htmlFor="email">Email</label>
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
              <label htmlFor="password">Password</label>
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
            <div id="signup-button-container" className="form-group">
              <button
                id="signup-button"
                className="btn btn-primary"
                disabled={loading}
              >
                Join now
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
            <p>Already have an account? </p>
            <a href="https://www.google.com">Sign in</a>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Login;
