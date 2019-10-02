import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router-dom';

import NavigationDropdownMenu from './NavigationDropdownMenu';
import NavigationDropdownMenuItem from './NavigationDropdownMenuItem';

import '../styles/NavigationBar.css';
import logo from '../logo_image.png';

import { deleteUserAuthData, getUserAuthData } from '../utils/AuthUtils';

/**
 * the navigation bar for the application on top
 */
class NavigationBar extends Component {
  static propTypes = {
    handleDeleteUser: PropTypes.func,
  };

  static defaultProps = {
    handleDeleteUser: null,
  };

  /**
   * handler for logout click
   */
  handleLogout = () => {
    // removing token from local storage => logout
    deleteUserAuthData();

    // navigating to input for user
    this.props.history.push('/analysisInput');

    // reloading to clear cache
    window.location.reload();
  };

  /**
   * opens a url passed in a new tab
   */
  openLinkInNewTab = (url) => {
    const win = window.open(url);
    win.focus();
  };

  /**
   * renders the navbar with brand, user name as dropdown and avatar
   */
  render() {
    // getting auth token for login
    const authUser = getUserAuthData();

    // defining content dependent on if user is logged in
    const userContent =
      authUser.token && authUser.email ? (
        <ul className="nav navbar-toolbar navbar-right">
          <NavigationDropdownMenu name={`${authUser.email}`} navbar>
            <NavigationDropdownMenuItem
              onClick={() => this.props.history.push('/userHome')}
            >
              Meine Analysen
            </NavigationDropdownMenuItem>
            <NavigationDropdownMenuItem
              onClick={() =>
                this.openLinkInNewTab('https://www.psychologischenumerologie.eu/datenschutz/#tab-con-0 ')
              }
            >
              Datenschutzerklärung
            </NavigationDropdownMenuItem>
            <NavigationDropdownMenuItem
              onClick={() =>
                this.openLinkInNewTab('https://www.psychologischenumerologie.eu/impressum/ ')
              }
            >
              Impressum
            </NavigationDropdownMenuItem>
            <NavigationDropdownMenuItem onClick={this.props.handleDeleteUser}>
              Account löschen
            </NavigationDropdownMenuItem>
            <NavigationDropdownMenuItem onClick={this.handleLogout}>
              Abmelden
            </NavigationDropdownMenuItem>
          </NavigationDropdownMenu>
        </ul>
      ) : (
        <ul className="nav navbar-toolbar navbar-right">
          <Link
            className="btn btn-default btn-block "
            to="/login"
            target="_self"
          >
            Anmelden
          </Link>
        </ul>
      );

    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar__brand">
            <a href="https://www.psychologischenumerologie.eu/">
              <img src={logo} alt={logo} />
            </a>
          </div>
          <div className="collapse navbar-collapse navbar-collapse-toolbar">
            <ul className="nav navbar-toolbar navbar-right">{userContent}</ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavigationBar);
