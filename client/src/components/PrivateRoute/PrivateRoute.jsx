import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...params }) => (
  <Route
    {...params}
    render={props => {
      if (params.loggedInUser) {
        return children;
      } else {
        // unauthorised (not logged in) so redirect to login page
        return <Redirect to={{ pathname: '/login' }} />;
      }
    }}
  />
);

export default PrivateRoute;
