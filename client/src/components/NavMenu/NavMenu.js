import React, { Component, Fragment } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './NavMenu.css';

class NavMenu extends Component {
  render() {
    return (
      <Menu>
        <a id="home" className="menu-item" href="/">
          Home
        </a>
        <a id="home" className="menu-item" href="/events">
          Events
        </a>
        <a id="home" className="menu-item" href="/user">
          Profile
        </a>
      </Menu>
    );
  }
}

export default NavMenu;
