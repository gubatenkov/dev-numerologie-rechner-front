import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import * as compose from 'lodash.flowright';
import { graphql, withApollo } from 'react-apollo';

import styled from 'styled-components';

import { faCog, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'react-avatar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Popover, {
  PopoverTextContent,
  PopoverTextItem,
  PopoverSettingsContent,
  PopoverSettingsSection,
  PopoverSettingsHeader,
} from './Popover';

import { saveUserSettingsMutation } from '../graphql/Mutations';
import { userSettingsQuery } from '../graphql/Queries';

import IconButton from './Buttons/IconButton';
import TextButton from './Buttons/TextButton';
import Switch from './Switches/Switch';
import logo from '../images/logo.png';
import { deleteUserAuthData } from '../utils/AuthUtils';

// container component of navbar
const NavbarContainer = styled.nav`
  /* fixed bar height*/
  height: 130px;

  /* layout of navbar is a grid of: 3 slots for items to the left, 
  3 slots for items to the right and one true center logo*/
  display: grid;
  grid-template-columns: repeat(3, 36px) auto repeat(3, 36px);

  /* 16px gap between all items in grid (horizontally)*/
  grid-column-gap: 16px;

  /* margin top, left and right*/
  margin: 32px 32px 0 32px;
`;

// styling icon button for left element (icon is passed externally)
const LeftIconButton = styled(IconButton)`
  /* positioning at start of the navbar (first element to the left)*/
  grid-column-start: 1;
`;

// styling logo container => center
const LogoContainer = styled.a`
  /* positioning in the (true) center */
  grid-column-start: 4;

  /* centering content in container*/
  justify-self: center;

  /* setting maximum height of images in container*/
  img {
    max-height: 86px;
  }
`;

// styling setting icon button to the right (shown if user is logged in)
const SettingsIconButton = styled(IconButton)`
  /* positioning at start of area for element to the right */
  grid-column-start: 5;
`;

// styling shopping cart icon button to the right (shown if user is logged in)
const CartIconButton = styled(IconButton)`
  /* positioning at center of area for elements to the right */
  grid-column-start: 6;
`;

// styling button element that is displayed to the right if user not logged in
const RightActionButton = styled(TextButton)`
  /* right action spans across all of are for elements to the right */
  grid-column-start: 5;
  grid-column-end: 7;
`;

// user avatar image (based on avatar library)
const UserAvatar = styled(Avatar)`
  /* last element to the right */
  grid-column-start: 7;

  /* making sure it does not exceed cell size, 
  overriding as external library styling */
  width: 36px !important;
  height: 36px !important;
`;

const SwitchSettingItem = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SwitchSettingTitle = styled.div`
  color: ${(props) => props.theme.darkGrey};
  font-family: ${(props) => props.theme.fontFamily};
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
const NavigationBar = (props) => {
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
    <Popover>
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
              onChange={() => setShowBookRecommendations(!showBookRecommendations)
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
              onChange={() => setShowCategoryExplanations(!showCategoryExplanations)
              }
              checked={showCategoryExplanations}
            />
          </SwitchSettingItem>
          <SwitchSettingItem>
            <SwitchSettingTitle>Erklärungen zu Zahlen</SwitchSettingTitle>
            <Switch
              onChange={() => setShowNumberMeaningExplanations(!showNumberMeaningExplanations)
              }
              checked={showNumberMeaningExplanations}
            />
          </SwitchSettingItem>
          <SwitchSettingItem>
            <SwitchSettingTitle>
              Erklärungen zur Zahlenberechnung
            </SwitchSettingTitle>
            <Switch
              onChange={() => setShowNumberCalculationExplanations(
                !showNumberCalculationExplanations,
              )
              }
              checked={showNumberCalculationExplanations}
            />
          </SwitchSettingItem>
        </PopoverSettingsSection>
      </PopoverSettingsContent>
    </Popover>
  );

  // defining popover for avatar
  const avatarPopup = (
    <Popover>
      <PopoverTextContent>
        <PopoverTextItem href="www.google.com" target="_blank">
          Meine Analysen
        </PopoverTextItem>
        <PopoverTextItem onClick={() => props.history.push('/userHome')}>
          Mein Profil
        </PopoverTextItem>
        <PopoverTextItem onClick={handleLogout}>Abmelden</PopoverTextItem>
      </PopoverTextContent>
    </Popover>
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
        <img src={logo} alt={logo} />
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
