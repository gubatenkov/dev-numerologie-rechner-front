import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * Private route version of react-router Route component checking 
 * authentication and redirecting to authentication if needed. 
 * Pass props: 
 * - isAuthenticated: Function that checks authentication and returns true if authenticated, false else
 * - loginPath: Path to be redirected to if not authenticated
 */
class PrivateRoute extends Component {
	/**
     * default render method that checks login status and renders either passed login component or passed target component
     */
	render() {
		return (
			<Route
				render={() => {
                    // if authenticated -> rendering intended component in Route
					if (this.props.isAuthenticated()) {
						return <this.props.component />;
					} else {
                        // redirecting to passed login page
						return (
							<Redirect
								to={{
									pathname: this.props.loginPath,
									state: { from: this.props.location }
								}}
							/>
						);
					}
				}}
			/>
		);
	}
}

export default PrivateRoute;
