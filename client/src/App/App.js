import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Home, Login, Signup, CreateEvent } from '../pages';
import { NavBar, PrivateRoute } from '../components';
import { authenticationService } from '../services';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser: null
    };
  }

  componentWillMount() {
    authenticationService.loggedInUser.subscribe(x =>
      this.setState({ loggedInUser: x })
    );
  }

  render() {
    const { loggedInUser } = this.state;
    console.log('app state user: ', loggedInUser);
    return (
      <Fragment>
        <NavBar loggedInUser={loggedInUser} />
        <Router>
          <Switch>
            <Route path="/login">
              <Login loggedInUser={loggedInUser} />
            </Route>
            <Route path="/signup">
              <Signup loggedInUser={loggedInUser} />
            </Route>
            <Route path="/event/view">
              <h1>Event Viewing Page</h1>
            </Route>
            <PrivateRoute path="/event/create" loggedInUser={loggedInUser}>
              <CreateEvent loggedInUser={loggedInUser} />
            </PrivateRoute>
            <Route path="/event-listings">
              <h1>Events Page</h1>
            </Route>
            <PrivateRoute path="/user" loggedInUser={loggedInUser}>
              <h1>User Page</h1>
            </PrivateRoute>
            <PrivateRoute path="/send-announcement" loggedInUser={loggedInUser}>
              <h1>Announcement Page</h1>
            </PrivateRoute>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

App.propTypes = {
  loggedInUser: PropTypes.string
};

export default App;
