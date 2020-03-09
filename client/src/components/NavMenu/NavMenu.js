import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './NavMenu.css';

class NavMenu extends Component {
  render() {
    return (
      <Menu>
        <a id="home" className="menu-item" href="/">
          Home
        </a>
        <a id="login" className="menu-item" href="/login">
          Login
        </a>
        <a id="event-listings" className="menu-item" href="/event-listings">
          Events
        </a>
        <a id="user" className="menu-item" href="/user">
          Profile
        </a>
      </Menu>
    );
  }
}

export default NavMenu;
