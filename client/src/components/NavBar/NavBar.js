import React, { Component, Fragment } from 'react';
import { authenticationService } from '../../services';
import { NavMenu } from '../index';
import Button from 'react-bootstrap/Button';
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var loggedInUser = this.props.loggedInUser;
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
                } // authenticationService.logout(email); // TODO: get email prop and link this up
              }}
            >
              {loggedInUser && 'LOGOUT'}
              {!loggedInUser && 'LOGIN'}
            </Button>
          </div>
          <div id="img-container">
            <a href="/">
              <img src={require('../../images/upvent.png')} />
            </a>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default NavBar;
