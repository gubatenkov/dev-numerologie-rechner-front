import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faCog,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';

import '../styles/NavigationBar.css';
import logo from '../images/logo.png';

import { deleteUserAuthData } from '../utils/AuthUtils';

const NavbarContainer = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: 130px;
`;

const IconButton = styled.button`
  background-color: #f3f9fa;
  width: 36px;
  height: 36px;

  padding: 6px;

  border-radius: 6px;
  border-style: none;

  color: #01b2d4;
`;

const Logo = styled.img`
  height: 86px;
  margin-top: 22px;
`;

const ActionGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 32px;
  margin-left: 32px;
  margin-right: 32px;

  button {
    margin-right: 16px;
  }
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  background-color: gray;
  border-radius: 50%;
`;

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
   * renders the navbar with brand, user name as dropdown and avatar
   */
  render() {
    return (
      <NavbarContainer>
        <ActionGroup>
          <IconButton>
            <FontAwesomeIcon icon={faArrowLeft} />
          </IconButton>
        </ActionGroup>

        <a href="https://www.psychologischenumerologie.eu/" target="_blank" rel="noopener noreferrer">
          <Logo src={logo} alt={logo} />
        </a>

        <ActionGroup>
          <IconButton>
            <FontAwesomeIcon icon={faCog} />
          </IconButton>
          <IconButton>
            <FontAwesomeIcon icon={faShoppingCart} />
          </IconButton>
          <UserAvatar />
        </ActionGroup>
      </NavbarContainer>
    );
  }
}

export default withRouter(NavigationBar);
