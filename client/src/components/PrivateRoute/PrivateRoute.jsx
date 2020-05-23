import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userService } from '../../services';

const PrivateRoute = ({ component: Component, ...params }) => (
  <Route
    {...params}
    render={(props) => {
      let authorised = false;

      // private route, check the user is logged in
      if (userService.loggedInUserValue) {
        authorised = true;
      }

      // admin required, check the user is logged in AND and admin
      if (
        authorised &&
        params.adminRequired &&
        userService.loggedInUserValue.type !== 1
      ) {
        authorised = false;
      }

      return authorised ? (
        // send to requested page
        <Component {...params} {...props} />
      ) : (
        // redirect to login page
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      );
    }}
  />
);

export default PrivateRoute;
