import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Private route version of react-router Route component checking
 * authentication and redirecting to authentication if needed.
 * Pass props:
 * - isAuthenticated: Function that checks authentication and returns true
 * if authenticated, false else
 * - loginPath: Path to be redirected to if not authenticated
 */
class PrivateRoute extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.func.isRequired,
    loginPath: PropTypes.string.isRequired,
    location: PropTypes.object,
  };

  static defaultProps = {
    location: null,
  };
  /**
   * default render method that checks login status and renders either passed login
   * component or passed target component
   */
  render() {
    // console.log(this.props);
    return (
      <Route
        render={() => {
          // if authenticated -> rendering intended component in Route
          if (this.props.isAuthenticated()) {
            return <this.props.component {...this.props} />;
          }
          // redirecting to passed login page
          return (
            <Redirect
              to={{
                pathname: this.props.loginPath,
                state: { from: this.props.location },
              }}
            />
          );
        }}
      />
    );
  }
}

export default PrivateRoute;
