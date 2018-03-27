import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';

import NavigationDropdownMenu from './NavigationDropdownMenu';
import NavigationDropdownMenuItem from './NavigationDropdownMenuItem';

import '../styles/NavigationBar.css';
import logo from '../logo.png';

import { AUTH_TOKEN } from '../utils/AuthUtils';

// dummy user until authentication is implemented
// TODO remove this
const DUMMY_USER = {
  firstName: 'Christoph',
  lastName: 'Hechenblaikner',
  image: logo,
  email: 'christoph.hech@gmail.com',
};

/**
 * the navigation bar for the application on top
 */
class NavigationBar extends Component {
  /**
   * default constructor
   */
  constructor(props) {
    // calling super constructor
    super(props);

    // setting initial state
    // TODO get this from user data
    this.state = {
      user: DUMMY_USER,
    };
  }

  /**
   * handler for login button click
   */
  handleLogin = () => {
    // setting user state
    // TODO remove once authentication works
    this.setState({
      user: DUMMY_USER,
    });
  };

  /**
   * handler for logout click
   */
  handleLogout = () => {
    // removing token from local storage => logout
    localStorage.removeItem(AUTH_TOKEN);

    // clearing local user
    this.setState({
      user: null,
    });

    // navigating to input for user
    this.props.history.push('/analysisInput');
  };

  /**
   * renders the navbar with brand, user name as dropdown and avatar
   */
  render() {
    // getting auth token for login
    const authToken = localStorage.getItem(AUTH_TOKEN);

    // defining content dependent on if user is logged in
    const userContent =
      authToken && this.state.user ? (
        <ul className="nav navbar-toolbar navbar-right">
          <NavigationDropdownMenu name={`${this.state.user.email}`} navbar>
            <NavigationDropdownMenuItem>
              Paket ändern
            </NavigationDropdownMenuItem>
            <NavigationDropdownMenuItem onClick={this.handleLogout}>
              Abmelden
            </NavigationDropdownMenuItem>
          </NavigationDropdownMenu>
          <li>
            <a className="nav-link navbar-avatar">
              <span className="avatar">
                <img src={this.state.user.image} alt="..." />
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

export default withRouter(NavigationBar);
