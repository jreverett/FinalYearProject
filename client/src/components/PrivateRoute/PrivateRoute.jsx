import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...params }) => (
  <Route
    {...params}
    render={props =>
      params.loggedInUser ? (
        // authorised (logged in) so send to requested page
        <Component {...params} {...props} />
      ) : (
        // unauthorised (not logged in) so redirect to login page
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;
