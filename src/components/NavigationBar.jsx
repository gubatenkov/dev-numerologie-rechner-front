import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

// graphql/apollo related
import * as compose from 'lodash.flowright';
import { graphql, withApollo } from 'react-apollo';

// styling related
import styled from 'styled-components';

// components
import { faCog, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'react-avatar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { userSettingsQuery } from '../graphql/Queries';
import { saveUserSettingsMutation } from '../graphql/Mutations';
import Popover, {
  PopoverTextContent,
  PopoverTextItem,
  PopoverSettingsContent,
  PopoverSettingsSection,
  SwitchSettingItem,
} from './Popover';
import IconButton from './Buttons/IconButton';
import TextButton from './Buttons/TextButton';
import logo from '../images/logo.png';

// importing threshold to switch to mobile optimized layout
import { MOBILE_RESOLUTION_THRESHOLD } from '../utils/Constants';

// auth utils
import { deleteUserAuthData, getUserAuthData } from '../utils/AuthUtils';

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

  /* mobile phones */
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    /* logo moves to after the left icon button */
    grid-column-start: 2;

    /* logo changes in size */
    img {
      max-height: 48px;
    }
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

// container for segmented button group
const SegmentContainer = styled(ButtonGroup)`
  /* making sure it spreads out in container */
  width: 100%;

  /* we want both items to take 50% of the horizontal space in the container. 
  Therefore setting space around here and applying flex-grow: 1 to buttons*/
  justify-content: space-around;
`;

// the text button in the segmented button group
const SegmentButton = styled(TextButton)`
  /* making sure button grows to equal share with other children */
  flex-grow: 1;
`;
/**
 * the navigation bar for the application on top
 */
const NavigationBar = (props) => {
  // extracting prop value
  const { currentUser } = props.data;

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

  // checking if user is logged in in two ways
  // a) query returned user information b) we have a token stored locally.
  // if a) but not b), we have inconsistent state
  const loggedIn = props.data.currentUser
    && props.data.currentUser.email
    && getUserAuthData().token;

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
        <PopoverSettingsSection title="Übersicht und Tour">
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
          <SwitchSettingItem
            title="Buchempfehlungen"
            onChange={() => setShowBookRecommendations(!showBookRecommendations)
            }
            checked={showBookRecommendations}
          />
          <SwitchSettingItem
            title="Buchreferenzen"
            onChange={() => setShowBookReferences(!showBookReferences)}
            checked={showBookReferences}
          />
          <SwitchSettingItem
            title="Erklärungen zu Kategorien"
            onChange={() => setShowCategoryExplanations(!showCategoryExplanations)
            }
            checked={showCategoryExplanations}
          />
          <SwitchSettingItem
            title="Erklärungen zu Zahlen"
            onChange={() => setShowNumberMeaningExplanations(!showNumberMeaningExplanations)
            }
            checked={showNumberMeaningExplanations}
          />

          <SwitchSettingItem
            title="Erklärungen zur Zahlenberechnung"
            onChange={() => setShowNumberCalculationExplanations(
              !showNumberCalculationExplanations,
            )
            }
            checked={showNumberCalculationExplanations}
          />
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
