import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Login, Signup } from '../pages/index';
import { NavBar } from '../components/index';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    };
  }

  render() {
    return (
      <Fragment>
        <NavBar isLoggedIn={this.state.isLoggedIn} />
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/event">
              <h1>Event Page</h1> // placeholder
            </Route>
            <Route path="/event-listings">
              <h1>Events Page</h1> // placeholder
            </Route>
            <Route path="/user">
              <h1>User Page</h1> // placeholder
            </Route>
            <Route path="/send-announcement">
              <h1>Announcement Page</h1> // placeholder
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default App;
