import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";

import styled from "styled-components";
import { useTranslation } from "react-i18next";
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

import logo from "../images/logo.png";

import { MOBILE_RESOLUTION_THRESHOLD } from "../utils/Constants";

import { getUserAuthData } from "../utils/AuthUtils";
import { useBuyModal } from "../contexts/BuyModalContext";
import { useUser } from "../contexts/UserContext";

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

const NavBarIconButton = styled(IconButton)`
  width: 36px;
  height: 36px;
`;

// styling icon button for left element (icon is passed externally)
const LeftIconButton = styled(NavBarIconButton)`
  /* positioning at start of the navbar (first element to the left)*/
  grid-column-start: 3;

  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    grid-column-start: 1;
    margin-top: 60px;
  }
`;

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

const SettingsIconButton = styled(NavBarIconButton)`
  /* positioning at start of area for element to the right */
  grid-column-start: 5;
`;

const CartIconButton = styled(NavBarIconButton)`
  /* positioning at center of area for elements to the right */
  grid-column-start: 6;
`;

const RightActionButton = styled(TextButton)`
  /* right action spans across all of are for elements to the right */
  grid-column-start: 5;
  grid-column-end: 7;

  padding: 5px 12px 5px 12px;

  /* reducing standard height ob text button*/
  height: 40px;
  font-size: 16px;
`;

const UserAvatar = styled(Avatar)`
  /* last element to the right */
  grid-column-start: 7;

  /* making sure it does not exceed cell size, 
  overriding as external library styling */
  width: 36px !important;
  height: 36px !important;
`;

const SegmentContainer = styled(ButtonGroup)`
  /* making sure it spreads out in container */
  width: 100%;

  /* we want both items to take 50% of the horizontal space in the container. 
  Therefore setting space around here and applying flex-grow: 1 to buttons*/
  justify-content: space-around;
`;

const SegmentButton = styled(TextButton)`
  /* making sure button grows to equal share with other children */
  flex-grow: 1;

  padding: 4px 12px 4px 12px;

  /* reducing standard height of text button */
  height: 38px;
`;

const NavbarSpinner = styled(Spinner)`
  /* spinner is placed to the right */
  grid-column-start: 4;

  /* centering spinner */
  justify-self: center;
`;

const NavigationBar = props => {
  const [userSettings, setUserSettings] = useState({
    resultConfiguration: null,
    showBookRecommendations: false,
    showBookReferences: false,
    showCategoryExplanations: false,
    showNumberMeaningExplanations: false,
    showNumberCalculationExplanations: false
  });
  const { t } = useTranslation();
  const { setIsOpen } = useBuyModal();
  const User = useUser();
  const [componentInitialized, setComponentInitialized] = useState(false);

  const [saveUserSettings] = useMutation(saveUserSettingsMutation);

  const { loading, data, error } = useQuery(userSettingsQuery, {
    fetchPolicy: "network-only",
    onCompleted: data => {
      if (error) {
        return;
      }

      const { currentUser } = data;

      if (currentUser) {
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

        setComponentInitialized(true);
      }
    }
  });

  useEffect(() => {
    if (!loading && data && componentInitialized) {
      const { currentUser } = data;

      const settingsChanged = !Object.entries(userSettings).every(
        ([settingKey, settingValue]) => currentUser[settingKey] === settingValue
      );

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

  if (loading) {
    return (
      <NavbarContainer>
        <NavbarSpinner animation="border" role="status" variant="dark" />
      </NavbarContainer>
    );
  }

  const loggedIn =
    data &&
    data.currentUser &&
    data.currentUser.email &&
    getUserAuthData().token;

  const handleLogout = () => {
    User.logoutUser();
    props.history.push("/login");
  };

  const settingsPopup = (
    <Popover>
      <PopoverSettingsContent>
        <PopoverSettingsSection title={t("USER_SETTINGS.ORDER")}>
          <SegmentContainer>
            <SegmentButton
              primary={userSettings.resultConfiguration === "starter"}
              title={t("USER_SETTINGS.STANDARD")}
              onClick={() =>
                setUserSettings({
                  ...userSettings,
                  resultConfiguration: "starter"
                })
              }
            />
            <SegmentButton
              primary={userSettings.resultConfiguration === "levels"}
              title={t("USER_SETTINGS.ADVANCED")}
              onClick={() =>
                setUserSettings({
                  ...userSettings,
                  resultConfiguration: "levels"
                })
              }
            />
          </SegmentContainer>
          <SwitchSettingItem
            title={t("USER_SETTINGS.PAGE_TO_LOOK_UP")}
            onChange={newValue =>
              setUserSettings({ ...userSettings, showBookReferences: newValue })
            }
            checked={/* userSettings.showBookReferences */ false}
            disabled={true}
          />
          <SwitchSettingItem
            title={t("USER_SETTINGS.BOOK_REF")}
            onChange={newValue =>
              setUserSettings({
                ...userSettings,
                showBookRecommendations: newValue
              })
            }
            checked={userSettings.showBookRecommendations}
          />

          <SwitchSettingItem
            title={t("USER_SETTINGS.EXPLANATIONS")}
            onChange={newValue =>
              setUserSettings({
                ...userSettings,
                showCategoryExplanations: newValue
              })
            }
            checked={userSettings.showCategoryExplanations}
          />
          <SwitchSettingItem
            title={t("USER_SETTINGS.NUMBER_DESCRIPTIONS")}
            onChange={newValue =>
              setUserSettings({
                ...userSettings,
                showNumberMeaningExplanations: newValue
              })
            }
            checked={userSettings.showNumberMeaningExplanations}
          />

          <SwitchSettingItem
            title={t("USER_SETTINGS.NUMBER_CALCULATION")}
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
          {t("MY_ANALYSIS")}
        </PopoverTextItem>
        <PopoverTextItem onClick={() => props.history.push("/userProfile")}>
          {t("MY_PROFILE")}
        </PopoverTextItem>
        <PopoverTextItem onClick={handleLogout}>{t("LOG_OUT")}</PopoverTextItem>
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

      <LogoContainer href={t("HOMEPAGE")} target="_blank">
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
          onClick={() => setIsOpen(true)}
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
          title={props.register ? t("REGISTER") : t("SIGN_IN")}
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
  })
};

export default withRouter(NavigationBar);
