import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchIntercept from 'fetch-intercept';
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
  Admin,
  SendAnnouncement,
} from '../pages';
import { NavBar, PrivateRoute } from '../components';
import { userService, topicService } from '../services';
import './App.css';

toast.configure();
let unregister; // fetch interceptor

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser: {},
      topics: {},
      searchTitle: '',
    };
  }

  componentDidMount() {
    // subscribe to the logged in user observable
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

    topicService.get().then((topics) => {
      this.setState({ topics: topics.data });
    });

    // FETCH INTERCEPTOR ///////
    unregister = fetchIntercept.register({
      request: (url, config) => {
        // add the auth token to any requests (if user is logged in)
        const authToken = this.state.loggedInUser?.authToken;
        if (authToken) {
          config.headers['x-access-token'] = authToken;
        }
        return [url, config];
      },
      requestError: (error) => {
        return Promise.reject(error);
      },
    });
    ///////////////////////////
  }

  componentWillUnmount() {
    // clear the observable if set
    this.state.loggedInUser.unsubscribe();

    // unregister fetch interceptor
    unregister();
  }

  // called when the user is updated (including login/logout)
  handleUserUpdate = (loggedInUser) => {
    this.setState({
      loggedInUser: loggedInUser,
    });
  };

  handleSearchTitleUpdate = (searchTitle) => {
    this.setState({
      searchTitle: searchTitle,
    });
  };

  render() {
    const { loggedInUser, topics } = this.state;
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

            {/* CREATE EVENT */}
            <PrivateRoute
              path="/event/create"
              loggedInUser={loggedInUser}
              topics={topics}
              component={CreateEvent}
            />

            {/* EVENT LISTINGS */}
            <Route
              path="/event-listings"
              render={(props) => (
                <EventListings
                  {...props}
                  loggedInUser={loggedInUser}
                  topics={topics}
                  searchTitle={this.state.searchTitle}
                  updateSearchTitle={this.handleSearchTitleUpdate}
                />
              )}
            />

            {/* USER PAGE */}
            <PrivateRoute
              path="/user"
              loggedInUser={loggedInUser}
              updateUser={this.handleUserUpdate}
              component={Profile}
            />

            {/* ADMIN PAGE */}
            <PrivateRoute
              path="/admin"
              adminRequired={true}
              loggedInUser={loggedInUser}
              component={Admin}
            />

            {/* ANNOUNCEMENT PAGE */}
            <PrivateRoute
              path="/send-announcement"
              loggedInUser={loggedInUser}
              component={SendAnnouncement}
            />

            {/* HOME PAGE */}
            <Route path="/">
              <Home updateSearchTitle={this.handleSearchTitleUpdate} />
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
