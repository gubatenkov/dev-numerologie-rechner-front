import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Private route version of react-router Route component checking
 * authentication and redirecting to authentication if needed.
 * Pass props:
 * - isAuthenticated: Function that checks authentication and returns true
 * if authenticated, false else
 * - loginPath: Path to be redirected to if not authenticated
 */
const PrivateRoute = props => {
  return (
    <Route
      render={() => {
        if (props.isAuthenticated()) {
          return <props.component {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: props.loginPath,
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.func.isRequired,
  loginPath: PropTypes.string.isRequired,
  location: PropTypes.object
};

PrivateRoute.defaultProps = {
  location: null
};

export default PrivateRoute;
