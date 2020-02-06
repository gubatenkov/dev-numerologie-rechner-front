import React from "react";
import styled from "styled-components";

import BoostrapPopover from "react-bootstrap/Popover";
import Switch from "./Switches/Switch";
import { MOBILE_RESOLUTION_THRESHOLD } from "../utils/Constants";

// applying custom style to boostrap popover
const Popover = styled(BoostrapPopover)`
  /* adjusting border radius, overwriting boostrap */
  border-radius: 8px !important;

  /* ensuring white background in all situations, overwriting boostrap */
  background-color: #ffffff !important;

  /* applying custom shadow and border, overwriting boostrap */
  box-shadow: 0 0 8px 0 rgba(50, 50, 50, 0.08) !important;
  border: 1px solid rgba(204, 213, 219, 0.5) !important;

  /* standard boostrap popover has a maximum width of ~200px. Enlarging
  this and setting with to auto so content (child element) can define width.*/
  max-width: 600px !important;
  width: auto !important;
  transform: translate3d(5px, 68px, 0px);
`;

/* Defining and exporting different container components based on type of popover. So far there are two
a) Text => Use PopoverTextContent and PopoverTextItem
b) Settings => Use PopoverSettingsContent, PopoverSettingsSection and PopoverSettingsItem */

// content container for text based popovers
export const PopoverTextContent = styled(Popover.Content)`
  /* vertical flex column */
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  /* aligning top left */
  justify-content: flex-start;
  align-items: flex-start;

  /* content margins within popover */
  margin: 25px 32px 25px 32px !important;

  /*resetting boostrap padding*/
  padding: 0 !important;

  /* defining the space between any PopoverTextItems in children, note: only direct children*/
  > a + a {
    margin-top: 14px !important;
  }
`;

// item for text based popovers
export const PopoverTextItem = styled.a`
  /* setting basic styling of text item based on theme */
  color: ${props => props.theme.darkGrey} !important;
  font-family: ${props => props.theme.fontFamily} !important;
  font-size: 18px !important;
  line-height: 30px !important;

  /* ensuring pointer style cursor hover on all items even if no href is set (e.g. when using onClick)*/
  cursor: pointer;

  /* removing underline hover effect on links */
  :hover {
    text-decoration: none;
  }
`;

// content container for a settings popover
export const PopoverSettingsContent = styled(Popover.Content)`
  /* one column of sections*/
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  /* align top left */
  justify-content: flex-start;
  align-items: flex-start;

  /* setting fixed with of settings content */

  @media (min-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    width: 400px !important;
  }

  /* same margin on every edge */
  margin: 24px;

  /* overwriting boostrap padding */
  padding: 0 !important;
`;

// item for settings popover
const PopoverSettingsSectionContainer = styled.div`
  /* one column where all the items go*/
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  /* align top left */
  justify-content: flex-start;
  align-items: flex-start;

  /*overwriting boostrap padding*/
  padding: 0 !important;

  /* making sure sections fills whole container*/
  width: 100%;

  /* space between items in section*/
  > div + div {
    margin-top: 32px;
  }
`;

// header for settings section
const PopoverSettingsHeader = styled.h2`
  /* text styling */
  color: ${props => props.theme.darkGrey} !important;
  font-family: ${props => props.theme.fontFamily} !important;
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;

  /* margin between section header and first content item*/
  margin-bottom: 8px;
`;

// section containing of a container, title (title prop) and all children passed into it
export const PopoverSettingsSection = props => (
  <PopoverSettingsSectionContainer className={props.className}>
    {props.title && (
      <PopoverSettingsHeader>{props.title}</PopoverSettingsHeader>
    )}
    {props.children}
  </PopoverSettingsSectionContainer>
);

// container for the settings switch element
const SwitchSettingItemContainer = styled.div`
  /* flex row with items left and right*/
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

// title of the swtich item
const SwitchSettingTitle = styled.div`
  /* basic text styling */
  color: ${props =>
    props.disabled ? props.theme.lightGrey : props.theme.darkGrey};
  font-family: ${props => props.theme.fontFamily};
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
`;

// item containing of a title and switch for settings
export const SwitchSettingItem = props => (
  <SwitchSettingItemContainer className={props.className}>
    {props.title && (
      <SwitchSettingTitle disabled={props.disabled}>
        {props.title}
      </SwitchSettingTitle>
    )}
    <Switch
      onChange={props.onChange}
      checked={props.checked}
      disabled={props.disabled}
    />
  </SwitchSettingItemContainer>
);

export default Popover;
