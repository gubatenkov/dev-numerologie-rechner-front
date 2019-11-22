import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import * as compose from 'lodash.flowright';
import { graphql, withApollo } from 'react-apollo';

import styled from 'styled-components';

import { faCog, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'react-avatar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { saveUserSettingsMutation } from '../graphql/Mutations';
import { userSettingsQuery } from '../graphql/Queries';

import IconButton from './Buttons/IconButton';
import TextButton from './Buttons/TextButton';
import Switch from './Switches/Switch';
import logo from '../images/logo.png';
import { deleteUserAuthData } from '../utils/AuthUtils';

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

const UserAvatar = styled(Avatar)`
  grid-column-start: 7;
  width: 36px !important;
  height: 36px !important;
`;

const RightActionButton = styled(TextButton)`
  grid-column-start: 5;
  grid-column-end: 7;
`;

const NavbarPopover = styled(Popover)`
  border-radius: 8px !important;
  background-color: #ffffff !important;
  box-shadow: 0 0 8px 0 rgba(50, 50, 50, 0.08) !important;
  border: 1px solid rgba(204, 213, 219, 0.5) !important;

  max-width: 600px !important;
  width: auto !important;
`;

const PopoverTextContent = styled(NavbarPopover.Content)`
  /* vertical flex column */
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;

  margin: 25px 32px 25px 32px !important;

  /*resetting boostrap padding*/
  padding: 0 !important;

  /*the space between any children in the content should be 14px*/
  * + * {
    margin-top: 14px !important;
  }
`;

const PopoverTextItem = styled.a`
  color: ${props => props.theme.darkGrey} !important;
  font-family: ${props => props.theme.fontFamily} !important;
  font-size: 18px !important;
  line-height: 30px !important;

  cursor: pointer;

  :hover {
    text-decoration: none;
  }
`;

const PopoverSettingsContent = styled(NavbarPopover.Content)`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;

  width: 400px !important;
  margin: 24px;

  /*resetting boostrap padding*/
  padding: 0 !important;
`;

const SwitchSettingItem = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const PopoverSettingsSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;

  /*resetting boostrap padding*/
  padding: 0 !important;
  width: 100%;

  /* space between items */
  > div + div {
    margin-top: 32px;
  }
`;

const PopoverSettingsHeader = styled.h2`
  color: ${props => props.theme.darkGrey} !important;
  font-family: ${props => props.theme.fontFamily} !important;
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;

  margin-bottom: 8px;
`;

const SwitchSettingTitle = styled.div`
  color: ${props => props.theme.darkGrey};
  font-family: ${props => props.theme.fontFamily};
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
`;

const SegmentContainer = styled(ButtonGroup)`
  width: 100%;
  justify-content: space-around;
`;

const SegmentButton = styled(TextButton)`
  flex-grow: 1;
`;
/**
 * the navigation bar for the application on top
 */
const NavigationBar = props => {
  // extracting prop value
  const { currentUser, loading } = props.data;

  // defining state and initializing with current user values
  const [resultConfiguration, setResultConfiguration] = useState(
    currentUser.resultConfiguration,
  );
  const [showBookRecommendations, setShowBookRecommendations] = useState(
    currentUser.showBookRecommendations,
  );
  const [showBookReferences, setShowBookReferences] = useState(
    currentUser.showBookReferences,
  );
  const [showCategoryExplanations, setShowCategoryExplanations] = useState(
    currentUser.showCategoryExplanations,
  );
  const [
    showNumberMeaningExplanations,
    setShowNumberMeaningExplanations,
  ] = useState(currentUser.showNumberMeaningExplanations);
  const [
    showNumberCalculationExplanations,
    setShowNumberCalculationExplanations,
  ] = useState(currentUser.showNumberCalculationExplanations);

  // checking if user is logged in
  // TODO auth utils check if token is stored locally
  const loggedIn = props.data.currentUser && props.data.currentUser.email;

  // handles a logout of the user
  const handleLogout = () => {
    // deleting auth credentials stored in local storage
    deleteUserAuthData();

    // redirecting user to login page
    props.history.push('/login');
  };

  // defining effect that calls server whenever settings change
  const { saveUserSettings } = props;
  useEffect(() => {
    // triggering mutation to change values on server
    saveUserSettings({
      variables: {
        resultConfiguration,
        showBookRecommendations,
        showBookReferences,
        showCategoryExplanations,
        showNumberMeaningExplanations,
        showNumberCalculationExplanations,
      },
    });
  }, [
    resultConfiguration,
    showBookRecommendations,
    showBookReferences,
    showCategoryExplanations,
    showNumberMeaningExplanations,
    showNumberCalculationExplanations,
    saveUserSettings,
  ]);

  // defining popover for settings button
  const settingsPopup = (
    <NavbarPopover>
      <PopoverSettingsContent>
        <PopoverSettingsSection>
          <PopoverSettingsHeader>Übersicht und Tour</PopoverSettingsHeader>
          <SegmentContainer>
            <SegmentButton
              primary={resultConfiguration === 'starter'}
              title={'Einfach'}
              onClick={() => setResultConfiguration('starter')}
            />
            <SegmentButton
              primary={resultConfiguration === 'levels'}
              title={'Fortgeschritten'}
              onClick={() => setResultConfiguration('levels')}
            />
          </SegmentContainer>
          <SwitchSettingItem>
            <SwitchSettingTitle>Buchempfehlungen</SwitchSettingTitle>
            <Switch
              onChange={() =>
                setShowBookRecommendations(!showBookRecommendations)
              }
              checked={showBookRecommendations}
            />
          </SwitchSettingItem>
          <SwitchSettingItem>
            <SwitchSettingTitle>Buchreferenzen</SwitchSettingTitle>
            <Switch
              onChange={() => setShowBookReferences(!showBookReferences)}
              checked={showBookReferences}
            />
          </SwitchSettingItem>
          <SwitchSettingItem>
            <SwitchSettingTitle>Erklärungen zu Kategorien</SwitchSettingTitle>
            <Switch
              onChange={() =>
                setShowCategoryExplanations(!showCategoryExplanations)
              }
              checked={showCategoryExplanations}
            />
          </SwitchSettingItem>
          <SwitchSettingItem>
            <SwitchSettingTitle>Erklärungen zu Zahlen</SwitchSettingTitle>
            <Switch
              onChange={() =>
                setShowNumberMeaningExplanations(!showNumberMeaningExplanations)
              }
              checked={showNumberMeaningExplanations}
            />
          </SwitchSettingItem>
          <SwitchSettingItem>
            <SwitchSettingTitle>
              Erklärungen zur Zahlenberechnung
            </SwitchSettingTitle>
            <Switch
              onChange={() =>
                setShowNumberCalculationExplanations(
                  !showNumberCalculationExplanations,
                )
              }
              checked={showNumberCalculationExplanations}
            />
          </SwitchSettingItem>
        </PopoverSettingsSection>
      </PopoverSettingsContent>
    </NavbarPopover>
  );

  // defining popover for avatar
  const avatarPopup = (
    <NavbarPopover>
      <PopoverTextContent>
        <PopoverTextItem href="www.google.com" target="_blank">
          Meine Analysen
        </PopoverTextItem>
        <PopoverTextItem onClick={() => props.history.push('/userHome')}>
          Mein Profil
        </PopoverTextItem>
        <PopoverTextItem onClick={handleLogout}>Abmelden</PopoverTextItem>
      </PopoverTextContent>
    </NavbarPopover>
  );

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
      >
        <Logo src={logo} alt={logo} />
      </LogoContainer>

      {loggedIn && (
        <OverlayTrigger
          trigger="click"
          key="settings_popover"
          placement="bottom"
          overlay={settingsPopup}
          rootClose
        >
          <SettingsIconButton icon={faCog} />
        </OverlayTrigger>
      )}
      {loggedIn && (
        <CartIconButton
          icon={faShoppingCart}
          onClick={() => window.open('https://www.bios-shop.eu/', '_blank')}
        />
      )}
      {loggedIn && (
        <OverlayTrigger
          trigger="click"
          key="avatar_popover"
          placement="bottom"
          overlay={avatarPopup}
          rootClose
        >
          <UserAvatar
            email={currentUser.email}
            name={currentUser.email}
            round={true}
          />
        </OverlayTrigger>
      )}

      {!loggedIn && (
        <RightActionButton
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
