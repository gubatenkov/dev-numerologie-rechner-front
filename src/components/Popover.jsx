import BoostrapPopover from 'react-bootstrap/Popover';
import styled from 'styled-components';

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
  color: ${(props) => props.theme.darkGrey} !important;
  font-family: ${(props) => props.theme.fontFamily} !important;
  font-size: 18px !important;
  line-height: 30px !important;

  /* ensuring pointer style cursor hover on all items even if no href is set (e.g. when using onClick)*/
  cursor: pointer;

  /* removing underline hover effect on links */
  :hover {
    text-decoration: none;
  }
`;

export const PopoverSettingsContent = styled(Popover.Content)`
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

export const PopoverSettingsSection = styled.div`
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

export const PopoverSettingsHeader = styled.h2`
  color: ${(props) => props.theme.darkGrey} !important;
  font-family: ${(props) => props.theme.fontFamily} !important;
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;

  margin-bottom: 8px;
`;
export default Popover;
