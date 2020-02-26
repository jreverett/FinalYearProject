import React, { Component, Fragment } from 'react';
import { userService } from '../../services/user';
import { NavMenu } from '../index';
import Button from 'react-bootstrap/Button';
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var loggedIn = this.props.isLoggedIn;
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
<<<<<<< HEAD
                if (loggedIn) {
                } // userService.logout(email); // TODO: get email prop and link this up
=======
                if (loggedIn) userService.logout;
>>>>>>> 5ad32917a5ac7c11d824f9069eae878505bd06a8
              }}
            >
              {loggedIn && 'LOGOUT'}
              {!loggedIn && 'LOGIN'}
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
