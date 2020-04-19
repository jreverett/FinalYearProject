import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Home,
  Login,
  Signup,
  ForgotPassword,
  ResetPassword,
  CreateEvent,
  EventListings,
  Profile,
  SendAnnouncement,
} from '../pages';
import { NavBar, PrivateRoute } from '../components';
import { userService } from '../services';
import './App.css';

toast.configure();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser: userService.loggedInUser,
    };
  }

  componentDidMount() {
    userService.loggedInUser.subscribe(this.handleUserUpdate);

    // fetch data for the current logged-in user
    const userID = userService.loggedInUserValue?._id;

    if (userID) {
      userService.get(userID).then((user) => {
        if (user) {
          userService.updateUserObservable(user.data);
        }
      });
    }
  }

  componentWillUnmount() {
    userService.loggedInUser.unsubscribe(this.handleUserUpdate);
  }

  // called when the user is updated (including login/logout)
  handleUserUpdate = (loggedInUser) => {
    this.setState({
      loggedInUser: loggedInUser,
    });
  };

  render() {
    const { loggedInUser } = this.state;
    return (
      <Fragment>
        <NavBar loggedInUser={loggedInUser} />
        <Router>
          <Switch>
            {/* LOGIN */}
            <Route
              path="/login"
              render={(props) => (
                <Login {...props} loggedInUser={loggedInUser} />
              )}
            />

            {/* SIGN UP */}
            <Route path="/signup">
              <Signup loggedInUser={loggedInUser} />
            </Route>

            {/* FORGOT PASSWORD */}
            <Route path="/forgot-password">
              <ForgotPassword loggedInUser={loggedInUser} />
            </Route>

            {/* RESET PASSWORD */}
            <Route
              path="/reset-password/:token"
              render={(props) => (
                <ResetPassword {...props} loggedInUser={loggedInUser} />
              )}
            />

            {/* VIEW EVENT -- NO LONGER REQUIRED */}
            <Route path="/event/view">
              <h1>Event Viewing Page</h1>
            </Route>

            {/* CREATE EVENT */}
            <PrivateRoute path="/event/create" loggedInUser={loggedInUser}>
              <CreateEvent loggedInUser={loggedInUser} />
            </PrivateRoute>

            {/* EVENT LISTINGS */}
            <Route
              path="/event-listings"
              render={(props) => (
                <EventListings {...props} loggedInUser={loggedInUser} />
              )}
            />

            {/* USER PAGE */}
            <PrivateRoute path="/user" loggedInUser={loggedInUser}>
              <Profile
                loggedInUser={loggedInUser}
                updateUser={this.handleUserUpdate}
              />
            </PrivateRoute>

            {/* ANNOUNCEMENT PAGE */}
            <PrivateRoute
              path="/send-announcement"
              loggedInUser={loggedInUser}
              component={SendAnnouncement}
            />

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
  loggedInUser: PropTypes.string,
};

export default App;
