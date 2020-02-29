import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Home, Login, Signup, CreateEvent } from '../pages';
import { NavBar } from '../components';
import { authenticationService } from '../services';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser: null
    };
  }

  componentDidMount() {
    authenticationService.loggedInUser.subscribe(x =>
      this.setState({ loggedInUser: x })
    );
  }

  render() {
    const { loggedInUser } = this.state;
    return (
      <Fragment>
        <NavBar loggedInUser={loggedInUser} />
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/event/view">
              <h1>Event Viewing Page</h1>
            </Route>
            <Route path="/event/create">
              <CreateEvent loggedInUser={loggedInUser} />
            </Route>
            <Route path="/event-listings">
              <h1>Events Page</h1>
            </Route>
            <Route path="/user">
              <h1>User Page</h1>
            </Route>
            <Route path="/send-announcement">
              <h1>Announcement Page</h1>
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

App.propTypes = {
  loggedInUser: PropTypes.string
};

export default App;
