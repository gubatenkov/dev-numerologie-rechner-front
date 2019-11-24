import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import _ from 'lodash';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MOBILE_RESOLUTION_THRESHOLD } from '../utils/Constants';

const TitleBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  /* margin to other layers*/
  margin-top: 20px;
  margin-bottom: 58px;

  > * + * {
    margin-left: 95px;
  }
`;

const TitleBarItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  padding: ${(props) => (props.removeable ? '18px 18px 38px 18px' : '42px 18px 38px 18px')};

  :hover {
    background-color: ${(props) => (props.removeable ? '#f8f8f8' : 'transparent')};
  }
`;

const CloseButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 2px;

  cursor: default;
`;

const CloseIcon = styled(FontAwesomeIcon)`
  color: transparent;
  width: 24px;
  height: 24px;

  ${TitleBarItemContainer}:hover & {
    color: #323232;
  }
`;

const TitleBarName = styled.div`
  color: #323232;
  font-family: Roboto;
  font-size: 48px;
  font-weight: 500;
  line-height: 58px;
  text-align: center;
  margin-right: 2px 8px 0px 8px;

  cursor: default;

  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    font-size: 24px;
    line-height: 32px;
  }
`;

const TitleBarDate = styled.div`
  color: #323232;
  font-family: Roboto;
  font-size: 20px;
  line-height: 24px;
  text-align: center;

  cursor: default;

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
    <CloseButtonContainer>
      {props.removeable && <CloseIcon icon={faTimes} />}
    </CloseButtonContainer>
    <TitleBarName>{_.truncate(props.name, { legnth: 20 })}</TitleBarName>
    <TitleBarDate>{props.date}</TitleBarDate>
  </TitleBarItemContainer>
);

/**
 * title bar on top of screen featuring a page title showing the user
 * names and dob of the currently displayed analysis
 */
const TitleBar = (props) => (
  <TitleBarContainer>
    <TitleBarItem name={props.primaryName} date={props.primaryDate} />
    {props.secondaryName && (
      <TitleBarItem
        name={props.secondaryName}
        date={props.secondaryDate}
        removeable
        onClick={() => props.onRemoveCompareName()}
      />
    )}
  </TitleBarContainer>
);

TitleBar.propTypes = {
  primaryName: PropTypes.string.isRequired,
  primaryDate: PropTypes.string,
  secondaryName: PropTypes.string,
  secondarySubHeading: PropTypes.string,
  onRemoveSecondary: PropTypes.func,
};

export default TitleBar;
