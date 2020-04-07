import React, { Component, Fragment } from 'react';
import Geosuggest from 'react-geosuggest';
import { authenticationService, userService } from '../../services';
import '../../common.css';
import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);

    // if user is already logged in, redirect to home
    if (userService.loggedInUserValue) window.location.href = '/';

    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      address: '',
      password: '',
      submitted: false,
      loading: false,
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { firstname, lastname, email, address, password } = this.state;

    // check form is valid
    if (!(firstname && lastname && email && password)) return;

    this.setState({ loading: true });
    userService.signup(firstname, lastname, email, address, password).then(
      user => {
        authenticationService.login(email, password).then(userRes => {
          window.location.href = '/';
        });
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
      firstname,
      lastname,
      email,
      password,
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
            {/* FIRST NAME */}
            <div
              className={
                'form-group' + (submitted && !firstname ? ' has-error' : '')
              }
            >
              <label htmlFor="firstname">
                First name<p className="compulsory-asterisk">*</p>
              </label>
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
              <label htmlFor="lastname">
                Last name<p className="compulsory-asterisk">*</p>
              </label>
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

            {/* ADDRESS */}
            <div className={'form-group'}>
              <label htmlFor="address">Address</label>
              <Geosuggest
                className="address-search"
                placeholder="Start tying an address..."
                onSuggestSelect={this.onSuggestSelect}
              />
              <p className="text-subtext">
                We use your location to provide you with relevant content
              </p>
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
            <div id="signup-button-container" className="form-group">
              <button
                id="signup-button"
                className="btn btn-primary"
                disabled={loading}
              >
                Join now
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
          <br />
          <div className="strike">
            <span>or</span>
          </div>
          <div id="question-container">
            <p>Already have an account? </p>
            <a href="/login">Log in</a>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Signup;
