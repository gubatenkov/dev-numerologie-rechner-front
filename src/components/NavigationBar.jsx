import React from 'react';
import { withRouter } from 'react-router-dom';

import * as compose from 'lodash.flowright';
import { graphql, withApollo } from 'react-apollo';

import styled from 'styled-components';

import { faCog, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { userSettingsQuery } from '../graphql/Queries';
import { saveUserSettingsMutation } from '../graphql/Mutations';

import IconButton from './Buttons/IconButton';
import TextButton from './Buttons/TextButton';
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

const LoginButton = styled(TextButton)`
  grid-column-start: 5;
  grid-column-end: 7;
`;

/**
 * the navigation bar for the application on top
 */

// TODO navbar mananges it's own state. Based on if the user is logged in or not, the right hand side is styled
// left icon and onClick can be configured
const NavigationBar = (props) => {
  console.log(props.data.loading);
  console.log(props.data.currentUser);
  const loggedIn = props.data.currentUser && props.data.currentUser.email;

  props.saveUserSettings({variables: {
    resultConfiguration: 'levels', 
    showBookRecommendations: false,
    showBookReferences: false,
    showCategoryExplanations: false,
    showNumberMeaningExplanations: false,
    showNumberCalculationExplanations: false,
  }});

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

      {loggedIn && (
        <SettingsIconButton
          icon={faCog}
          onClick={() => window.alert('Settings whrere are you?')}
        />
      )}
      {loggedIn && (
        <CartIconButton
          icon={faShoppingCart}
          onClick={() => window.open('https://www.bios-shop.eu/', '_blank')}
        />
      )}
      {loggedIn && <UserAvatar />}
      {!loggedIn && (
        <LoginButton
          title={props.register ? 'Registrieren' : 'Anmelden'}
          onClick={
            props.register
              ? () => props.history.push('/register')
              : () => props.history.push('/login')
          }
        />
      )}
    </NavbarContainer>
  );
};

export default compose(
  graphql(userSettingsQuery),
  graphql(saveUserSettingsMutation, { name: 'saveUserSettings' }),
)(withApollo(withRouter(NavigationBar)));
