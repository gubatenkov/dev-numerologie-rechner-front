import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import IconButton from './Buttons/IconButton';

import { MOBILE_RESOLUTION_THRESHOLD } from '../utils/Constants';

// the container => body of the panel
const PanelContainer = styled.div`
  /* basic padding of content inside the container*/
  padding: 32px 24px 24px 24px;

  /* basic box styling*/
  border-radius: 8px;
  background-color: ${(props) => props.theme.lightestGrey};
  margin-bottom: 60px;
`;

// header component showing title and actions a the top
const PanelHeader = styled.div`
  /* configuring grid with 3 columns: left action (button), right action (button) amd cemter element with title */
  display: grid;
  grid-template-columns: 40px auto 40px;

  /* aligning items at the end (=bottom) so they align at the bottom*/
  align-items: end;
  margin-bottom: 32px;
  margin-right: 8px;
`;

// left action in the header
const LeftPanelAction = styled.div`
  /* positioning at the left */
  grid-column-start: 1;
`;

// right action in the header
const RightPanelAction = styled.div`
  /* positioning at the right*/
  grid-column-start: 3;

  /* hiding on mobile phones*/
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    display: none;
  }
`;

// the title displayed at the top center of the panel
const PanelTitle = styled.div`
  /* positioning at center of header*/
  grid-column-start: 2;

  /* making content of title centered within container */
  justify-self: center;

  /* styling text*/
  color: ${(props) => props.theme.darkGrey};
  font-family: ${(props) => props.theme.gontFamily};
  font-size: 40px;
  font-weight: 500;
  line-height: 50px;
  text-align: center;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    font-size: 32px;
    line-height: 42px;
  }
`;

const PanelTitleContainer = styled.div`
  overflow: hidden;
`;

// icon button used for left and right action
const PanelIconButton = styled(IconButton)`
  /* adapting from larger standard size*/
  width: 40px;
  height: 40px;
`;

// the body of the panel
const PanelBody = styled.div`
  > * + * {
    margin-top: 40px;
  }
`;

const ResultPanel = (props) => (
  <PanelContainer id={props.id}>
    <PanelHeader>
      <LeftPanelAction>
        {props.leftActionIcon && (
          <PanelIconButton
            icon={props.leftActionIcon}
            onClick={() => props.onLeftActionClick()}
            inverted
          />
        )}
      </LeftPanelAction>
      <PanelTitleContainer>
        <PanelTitle>{props.title}</PanelTitle>
      </PanelTitleContainer>
      <RightPanelAction>
        <PanelIconButton
          icon={props.rightActionIcon}
          onClick={() => props.onRightActionClick()}
          inverted
        />
      </RightPanelAction>
    </PanelHeader>
    <PanelBody>{props.children}</PanelBody>
  </PanelContainer>
);

ResultPanel.propTypes = {
  title: PropTypes.string.isRequired,
  leftActionIcon: PropTypes.object,
  onLeftActionClick: PropTypes.func,
  rightActionIcon: PropTypes.object,
  onRightActionClick: PropTypes.func,
};

export default ResultPanel;
