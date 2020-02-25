import React, { Component, Fragment } from 'react';
import { NavMenu } from '../index';
import Button from 'react-bootstrap/Button';
import './NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <Fragment>
        <NavMenu />
        <div id="nav-container">
          <div id="nav-login-button-container">
            <Button id="nav-login-button" href="/login" variant="link">
              LOGIN
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
