import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import _ from 'lodash';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MOBILE_RESOLUTION_THRESHOLD } from '../utils/Constants';

// container for all title elements
const TitleBarContainer = styled.div`
  /* one row container centered*/
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  /* margin to other layers*/
  margin-top: 20px;
  margin-bottom: 42px;

  /* gap between children */
  > * + * {
    margin-left: 95px;
  }

  /* reucing space between primary and secondary name on mobile*/
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    > * + * {
      margin-left: 10px;
    }
  }
`;

// an item in the title bar
const TitleBarItemContainer = styled.div`
  /* one column centered*/
  display: flex;
  flex-direction: column;
  align-items: center;

  /* setting border radius, only visible if removable */
  border-radius: 6px;

  /* removeable items have a X icon on top => therefore adjusting padding here. We need 
  this as text needs to be vertically on the same hight*/
  padding: ${(props) => (props.removeable ? '18px 18px 38px 18px' : '42px 18px 38px 18px')};

  /* adding hover effect to removable items */
  :hover {
    background-color: ${(props) => (props.removeable ? '#f8f8f8' : 'transparent')};
  }
`;

// Container for close icon
const CloseIconContainer = styled.div`
  /* one row that spans whole with where icon is aligned at the top end*/
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;

  /* setting a little margin to the name */
  margin-bottom: 2px;

  /* making sure cursor is default everywhere */
  cursor: default;
`;

// x icon on top
const CloseIcon = styled(FontAwesomeIcon)`
  /* default is transparent => only visible when hovering */
  color: transparent;

  width: 24px;
  height: 24px;

  /* if container is in hovered state => adapting x to dark color to be shown */
  ${TitleBarItemContainer}:hover & {
    color: ${(props) => props.theme.darkGrey};
  }
`;

// name in a title item
const TitleBarName = styled.div`
  color: ${(props) => props.theme.darkGrey};
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 48px;
  font-weight: 500;
  line-height: 58px;
  text-align: center;

  /* adapting margins */
  margin: 2px 8px 0px 8px;

  /* making sure cursor is default everywhere */
  cursor: default;

  /* mobile phones: reducing fotn sizes*/
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    font-size: ${(props) => (props.compare ? '24px' : '40px')};
    line-height: ${(props) => (props.compare ? '32px' : '50px')};
  }
`;

const TitleBarDate = styled.div`
  color: ${(props) => props.theme.darkGrey};
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 20px;
  line-height: 24px;
  text-align: center;

  /* making sure cursor is default everywhere */
  cursor: default;

  /* mobile phones: reducing fotn sizes*/
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    font-size: 18px;
    line-height: 30px;
  }
`;

// item of the tite bar containing of name and date of birth
const TitleBarItem = (props) => (
  <TitleBarItemContainer
    className={props.className}
    removeable={props.removeable}
    onClick={props.onClick}
  >
    <CloseIconContainer>
      {props.removeable && <CloseIcon icon={faTimes} />}
    </CloseIconContainer>
    <TitleBarName compare={props.compare}>
      {_.truncate(props.name, { legnth: 15 })}
    </TitleBarName>
    <TitleBarDate>{props.date}</TitleBarDate>
  </TitleBarItemContainer>
);

/**
 * title bar on top of screen featuring a page title showing the user
 * names and dob of the currently displayed analysis
 */
const TitleBar = (props) => (
  <TitleBarContainer>
    <TitleBarItem
      name={props.primaryName}
      date={props.primaryDate}
      compare={props.secondaryName}
    />
    {props.secondaryName && (
      <TitleBarItem
        name={props.secondaryName}
        date={props.secondaryDate}
        compare={props.secondaryName}
        removeable
        onClick={() => props.onRemoveSecondaryName()}
      />
    )}
  </TitleBarContainer>
);

TitleBar.propTypes = {
  primaryName: PropTypes.string.isRequired,
  primaryDate: PropTypes.string.isRequired,
  secondaryName: PropTypes.string,
  secondarySubHeading: PropTypes.string,
  onRemoveSecondaryName: PropTypes.func,
};

export default TitleBar;
