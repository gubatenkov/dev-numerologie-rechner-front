import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";

// styling related
import styled from "styled-components";

import Avatar from "react-avatar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Spinner from "react-bootstrap/Spinner";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import iconCartPrimary from "../images/icon_cart_primary.svg";
import iconSettingsPrimary from "../images/icon_settings_primary.svg";
import { saveUserSettingsMutation } from "../graphql/Mutations";
import { userSettingsQuery } from "../graphql/Queries";
import Popover, {
  PopoverTextContent,
  PopoverTextItem,
  PopoverSettingsContent,
  PopoverSettingsSection,
  SwitchSettingItem
} from "./Popover";
import IconButton from "./Buttons/IconButton";
import TextButton from "./Buttons/TextButton";

// images
import logo from "../images/logo.png";

// importing threshold to switch to mobile optimized layout
import { MOBILE_RESOLUTION_THRESHOLD } from "../utils/Constants";

// auth utils
import { deleteUserAuthData, getUserAuthData } from "../utils/AuthUtils";

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

// resizing button for bar use
const NavBarIconButton = styled(IconButton)`
  width: 36px;
  height: 36px;
`;

// styling icon button for left element (icon is passed externally)
const LeftIconButton = styled(NavBarIconButton)`
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
const SettingsIconButton = styled(NavBarIconButton)`
  /* positioning at start of area for element to the right */
  grid-column-start: 5;
`;

// styling shopping cart icon button to the right (shown if user is logged in)
const CartIconButton = styled(NavBarIconButton)`
  /* positioning at center of area for elements to the right */
  grid-column-start: 6;
`;

// styling button element that is displayed to the right if user not logged in
const RightActionButton = styled(TextButton)`
  /* right action spans across all of are for elements to the right */
  grid-column-start: 5;
  grid-column-end: 7;

  padding: 5px 12px 5px 12px;

  /* reducing standard height ob text button*/
  height: 40px;
  font-size: 16px;
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

  padding: 4px 12px 4px 12px;

  /* reducing standard height of text button */
  height: 38px;
`;

// spinner when loading
const NavbarSpinner = styled(Spinner)`
  /* spinner is placed to the right */
  grid-column-start: 4;

  /* centering spinner */
  justify-self: center;
`;

/**
 * the navigation bar for the application on top
 */
const NavigationBar = props => {
  // defining state as user settings
  const [userSettings, setUserSettings] = useState({
    resultConfiguration: null,
    showBookRecommendations: false,
    showBookReferences: false,
    showCategoryExplanations: false,
    showNumberMeaningExplanations: false,
    showNumberCalculationExplanations: false
  });

  // state flag indicating if the state of this component has already been properly initialized by server call
  const [componentInitialized, setComponentInitialized] = useState(false);

  // defining mutation used to update user settings on backend
  const [saveUserSettings] = useMutation(saveUserSettingsMutation);

  // defining query loading user data and setting state upon completion
  // setting fetch policy to prevent caching issues
  const { loading, data, error } = useQuery(userSettingsQuery, {
    fetchPolicy: "network-only",
    onCompleted: data => {
      if (error) {
        return;
      }

      // extractin user result data
      const { currentUser } = data;

      if (!currentUser) {
        props.history.push("/login");
      } else {
        // setting initial state of the component based on result
        setUserSettings({
          ...userSettings,
          resultConfiguration: currentUser.resultConfiguration,
          showBookRecommendations: currentUser.showBookRecommendations,
          showBookReferences: currentUser.showBookReferences,
          showCategoryExplanations: currentUser.showCategoryExplanations,
          showNumberMeaningExplanations:
            currentUser.showNumberMeaningExplanations,
          showNumberCalculationExplanations:
            currentUser.showNumberCalculationExplanations
        });

        // setting initialized flag to indicate properly initialized state
        setComponentInitialized(true);
      }
    }
  });

  // defining effect that calls server whenever settings change
  useEffect(() => {
    // only applying change to server if not loadign, data is present and flag for proper initialization has been set
    if (!loading && data && componentInitialized) {
      // extracting user data from prop
      const { currentUser } = data;

      // checking if any of the values changed
      const settingsChanged = !Object.entries(userSettings).every(
        ([settingKey, settingValue]) => currentUser[settingKey] === settingValue
      );

      // if settings changed => calling server to apply change
      if (settingsChanged) {
        setTimeout(async () => {
          await saveUserSettings({
            variables: userSettings
          });

          window.location.reload();
        });
      }
    }
  }, [userSettings, loading, data, saveUserSettings, componentInitialized]);

  // returning loading indicator if data is still loading
  if (loading) {
    return (
      <NavbarContainer>
        <NavbarSpinner animation="border" role="status" variant="dark" />
      </NavbarContainer>
    );
  }

  // checking if user is logged in in two ways
  // a) query returned user information b) we have a token stored locally.
  // if a) but not b), we have inconsistent state
  const loggedIn =
    data &&
    data.currentUser &&
    data.currentUser.email &&
    getUserAuthData().token;

  // handles a logout of the user
  const handleLogout = () => {
    // deleting auth credentials stored in local storage
    deleteUserAuthData();

    // redirecting user to login page
    props.history.push("/login");
  };

  // defining popover for settings button
  const settingsPopup = (
    <Popover>
      <PopoverSettingsContent>
        <PopoverSettingsSection title="Reihenfolge der Zahlen – Übersicht und Tour">
          <SegmentContainer>
            <SegmentButton
              primary={userSettings.resultConfiguration === "starter"}
              title={"Standard"}
              onClick={() =>
                setUserSettings({
                  ...userSettings,
                  resultConfiguration: "starter"
                })
              }
            />
            <SegmentButton
              primary={userSettings.resultConfiguration === "levels"}
              title={"Fortgeschritten"}
              onClick={() =>
                setUserSettings({
                  ...userSettings,
                  resultConfiguration: "levels"
                })
              }
            />
          </SegmentContainer>
          <SwitchSettingItem
            title="Seitenzahl zum Nachschlagen – Übersicht"
            onChange={newValue =>
              setUserSettings({ ...userSettings, showBookReferences: newValue })
            }
            checked={/* userSettings.showBookReferences */ false}
            disabled={true}
          />
          <SwitchSettingItem
            title="Buchreferenz mit Seitenzahl – Tour"
            onChange={newValue =>
              setUserSettings({
                ...userSettings,
                showBookRecommendations: newValue
              })
            }
            checked={userSettings.showBookRecommendations}
          />

          <SwitchSettingItem
            title="Erklärungen zu Ebenen / Abschnitten"
            onChange={newValue =>
              setUserSettings({
                ...userSettings,
                showCategoryExplanations: newValue
              })
            }
            checked={userSettings.showCategoryExplanations}
          />
          <SwitchSettingItem
            title="Erklärungen zu Bedeutung der Zahlen"
            onChange={newValue =>
              setUserSettings({
                ...userSettings,
                showNumberMeaningExplanations: newValue
              })
            }
            checked={userSettings.showNumberMeaningExplanations}
          />

          <SwitchSettingItem
            title="Erklärungen zur Zahlenberechnung"
            onChange={newValue =>
              setUserSettings({
                ...userSettings,
                showNumberCalculationExplanations: newValue
              })
            }
            checked={userSettings.showNumberCalculationExplanations}
          />
        </PopoverSettingsSection>
      </PopoverSettingsContent>
    </Popover>
  );

  // defining popover for avatar
  const avatarPopup = (
    <Popover>
      <PopoverTextContent>
        <PopoverTextItem onClick={() => props.history.push("/userHome")}>
          Meine Analysen
        </PopoverTextItem>
        <PopoverTextItem onClick={() => props.history.push("/userProfile")}>
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
          imageIcon={props.leftButtonIcon}
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
          <SettingsIconButton imageIcon={iconSettingsPrimary} />
        </OverlayTrigger>
      )}
      {loggedIn && (
        <CartIconButton
          imageIcon={iconCartPrimary}
          onClick={() => {
            props.onCartClicked
              ? props.onCartClicked()
              : window.open(
                  "https://www.bios-shop.eu/produkt-kategorie/numerologische-analysen/",
                  "_blank"
                );
          }}
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
            email={data.currentUser.email}
            name={data.currentUser.email}
            round={true}
          />
        </OverlayTrigger>
      )}

      {!loggedIn && (
        <RightActionButton
          title={props.register ? "Registrieren" : "Anmelden"}
          onClick={
            props.register
              ? () => props.history.push("/register")
              : () => props.history.push("/login")
          }
        />
      )}
    </NavbarContainer>
  );
};

// defining proptypes
NavigationBar.propTypes = {
  leftButtonIcon: PropTypes.string,
  leftButtonOnClick: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  onCartClicked: PropTypes.func
};

export default withRouter(NavigationBar);
