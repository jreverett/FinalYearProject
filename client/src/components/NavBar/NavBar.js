import React, { Component, Fragment } from 'react';
import { NavMenu } from '../index';
import Button from 'react-bootstrap/Button';
import { authenticationService } from '../../services';
import './NavBar.css';

class NavBar extends Component {
  render() {
    const loggedInUser = this.props.loggedInUser;
    return (
      <Fragment>
        <NavMenu />
        <div id="nav-container">
          <div id="nav-login-button-container">
            <Button
              id="nav-login-button"
              href="/login"
              variant="link"
              onClick={() => {
                if (loggedInUser) {
                  authenticationService.logout(loggedInUser.email);
                }
              }}
            >
              {loggedInUser && 'LOGOUT'}
              {!loggedInUser && 'LOGIN'}
            </Button>
          </div>
          <div id="img-container">
            <a href="/">
              <img src={require('../../images/upvent.png')} alt="Upvent logo" />
            </a>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default NavBar;
