import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';

import { Link, withRouter } from 'react-router-dom';

import NavigationDropdownMenu from './NavigationDropdownMenu';
import NavigationDropdownMenuItem from './NavigationDropdownMenuItem';

import '../styles/NavigationBar.css';
import logo from '../logo.png';

import { AUTH_TOKEN } from '../utils/AuthUtils';

/**
 * the navigation bar for the application on top
 */
class NavigationBar extends Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      image: PropTypes.string,
    }),
  };

  static defaultProps = {
    user: null,
  };

  /**
   * handler for logout click
   */
  handleLogout = () => {
    // removing token from local storage => logout
    localStorage.removeItem(AUTH_TOKEN);

    // navigating to input for user
    this.props.history.push('/analysisInput');

    // clearing apollo client cache
    this.props.client.resetStore();

    window.location.reload();
  };

  /**
   * renders the navbar with brand, user name as dropdown and avatar
   */
  render() {
    console.log(this.props);

    // getting auth token for login
    const authToken = localStorage.getItem(AUTH_TOKEN);

    // defining content dependent on if user is logged in
    const userContent =
      authToken && this.props.user ? (
        <ul className="nav navbar-toolbar navbar-right">
          <NavigationDropdownMenu name={`${this.props.user.email}`} navbar>
            <NavigationDropdownMenuItem>
              Meine Analysen
            </NavigationDropdownMenuItem>
            <NavigationDropdownMenuItem onClick={this.handleLogout}>
              Abmelden
            </NavigationDropdownMenuItem>
          </NavigationDropdownMenu>
          <li>
            <a className="nav-link navbar-avatar">
              <span className="avatar">
                <img src={logo} alt={logo} />
              </span>
            </a>
          </li>
        </ul>
      ) : (
        <ul className="nav navbar-toolbar navbar-right">
          <Link className="btn btn-default btn-block " to="/login">
            Anmelden
          </Link>
        </ul>
      );

    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar__brand">Akademie Bios</div>
          <div className="collapse navbar-collapse navbar-collapse-toolbar">
            <ul className="nav navbar-toolbar navbar-right">{userContent}</ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default withApollo(withRouter(NavigationBar));
