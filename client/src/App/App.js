import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Home,
  Login,
  Signup,
  CreateEvent,
  EventListings,
  Profile
} from '../pages';
import { NavBar, PrivateRoute } from '../components';
import { userService } from '../services';
import './App.css';

toast.configure();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser: userService.loggedInUser
    };
  }

  componentDidMount() {
    userService.loggedInUser.subscribe(this.handleLoggedInUserChange);

    // fetch data for the current logged-in user
    const userID = userService.loggedInUserValue?._id;

    if (userID) {
      userService.get(userID).then(user => {
        if (user) {
          userService.updateUserObservable(user.data);
        }
      });
    }
  }

  componentWillUnmount() {
    userService.loggedInUser.unsubscribe(this.handleLoggedInUserChange);
  }

  // called when the user logs in/out
  handleLoggedInUserChange = loggedInUser => {
    this.setState({
      loggedInUser: loggedInUser
    });
  };

  // called when a property of the loggedInUser is modified
  handleChangeValue = e => {
    const name = e.target.name;
    var updatedUser = {
      ...this.state.loggedInUser,
      [e.target.name]:
        name === 'emailConsent' ? e.target.checked : e.target.value
    };

    userService.updateUserObservable(updatedUser);
  };

  // called when a geosuggest suggestion is selected
  onSuggestSelect = suggest => {
    var updatedUser = {
      ...this.state.loggedInUser,
      address: suggest
    };

    userService.updateUserObservable(updatedUser);
  };

  render() {
    const { loggedInUser } = this.state;
    return (
      <Fragment>
        <NavBar loggedInUser={loggedInUser} />
        <Router>
          <Switch>
            {/* LOGIN */}
            <Route path="/login">
              <Login loggedInUser={loggedInUser} />
            </Route>

            {/* SIGN UP */}
            <Route path="/signup">
              <Signup loggedInUser={loggedInUser} />
            </Route>

            {/* VIEW EVENT -- NO LONGER REQUIRED */}
            <Route path="/event/view">
              <h1>Event Viewing Page</h1>
            </Route>

            {/* CREATE EVENT */}
            <PrivateRoute path="/event/create" loggedInUser={loggedInUser}>
              <CreateEvent loggedInUser={loggedInUser} />
            </PrivateRoute>

            {/* EVENT LISTINGS */}
            <Route path="/event-listings">
              <EventListings loggedInUser={loggedInUser} />
            </Route>

            {/* USER PAGE */}
            <PrivateRoute path="/user" loggedInUser={loggedInUser}>
              <Profile
                loggedInUser={loggedInUser}
                onChangeValue={this.handleChangeValue}
                onSuggestSelect={this.onSuggestSelect}
              />
            </PrivateRoute>

            {/* ANNOUNCEMENT PAGE */}
            <PrivateRoute path="/send-announcement" loggedInUser={loggedInUser}>
              <h1>Announcement Page</h1>
            </PrivateRoute>

            {/* HOME PAGE */}
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
