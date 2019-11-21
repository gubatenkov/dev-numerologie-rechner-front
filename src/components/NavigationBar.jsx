import React from 'react';
import { withRouter } from 'react-router-dom';

import * as compose from 'lodash.flowright';
import { graphql, withApollo } from 'react-apollo';

import styled from 'styled-components';

import { faCog, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { currentUserBasicQuery } from '../graphql/Queries';

import IconButton from './Buttons/IconButton';
import logo from '../images/logo.png';

// container component styling navbar as grid
const NavbarContainer = styled.nav`
  height: 130px;

  display: grid;
  grid-template-columns: repeat(3, 36px) auto repeat(3, 36px);
  grid-column-gap: 16px;

  margin-left: 32px;
  margin-right: 32px;
  margin-top: 32px;
`;

// left button that is dynamically configured externally
const LeftIconButton = styled(IconButton)`
  grid-column-start: 1;
`;

// styling size of logo image
const Logo = styled.img`
  height: 86px;
`;

// styling logo container
const LogoContainer = styled.a`
  grid-column-start: 4;
  justify-self: center;
`;

const SettingsIconButton = styled(IconButton)`
  grid-column-start: 5;
`;

const CartIconButton = styled(IconButton)`
  grid-column-start: 6;
`;

const UserAvatar = styled.div`
  grid-column-start: 7;
  width: 36px;
  height: 36px;
  background-color: gray;
  border-radius: 50%;
`;

/**
 * the navigation bar for the application on top
 */

// TODO navbar mananges it's own state. Based on if the user is logged in or not, the right hand side is styled
// left icon and onClick can be configured
const NavigationBar = (props) => {
  console.log(props.data.loading);
  console.log(props.data.currentUser);
  return (
    <NavbarContainer>
      {props.leftButtonIcon && (
        <LeftIconButton
          icon={props.leftButtonIcon}
          onClick={props.leftButtonOnClick}
        />
      )}

      <LogoContainer
        href="https://www.psychologischenumerologie.eu/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Logo src={logo} alt={logo} />
      </LogoContainer>

      <SettingsIconButton
        icon={faCog}
        onClick={() => window.alert('Settings whrere are you?')}
      />
      <CartIconButton
        icon={faShoppingCart}
        onClick={() => window.alert('Cart where are you?')}
      />
      <UserAvatar />
    </NavbarContainer>
  );
};

export default compose(
  graphql(currentUserBasicQuery),
)(withApollo(withRouter(NavigationBar)));
