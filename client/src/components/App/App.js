import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NavBar } from '../index';
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />

        <Router>
          <Switch>
            <Route path="/event">
              <h1>Event Page</h1> // placeholder
            </Route>
            <Route path="/events">
              <h1>Events Page</h1> // placeholder
            </Route>
            <Route path="/profile">
              <h1>Profile Page</h1> // placeholder
            </Route>
            <Route path="/send-announcement">
              <h1>Announcement Page</h1> // placeholder
            </Route>
            <Route path="/">
              <h1>Home Page</h1> // placeholder
            </Route>
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default App;
