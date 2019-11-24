import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TitleBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 58px;
`;

const TitleBarItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleHeading = styled.h1`
  color: #323232;
  font-family: Roboto;
  font-size: 48px;
  font-weight: 500;
  line-height: 58px;
  text-align: center;
`;

const TitleSubHeading = styled.h2`
  color: #323232;
  font-family: Roboto;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
`;

/**
 * title bar on top of screen featuring a page title showing the user
 * names and dob of the currently displayed analysis
 */
const TitleBar = (props) => (
  <TitleBarContainer>
    <TitleBarItem>
      <TitleHeading>{props.primaryHeading}</TitleHeading>
      <TitleSubHeading>{props.primarySubheading}</TitleSubHeading>
    </TitleBarItem>
    <TitleBarItem>
      <TitleHeading>{props.secondaryHeading}</TitleHeading>
      <TitleSubHeading>{props.secondarySubHeading}</TitleSubHeading>
      {(props.secondaryHeading || props.secondarySubHeading) && <div>x</div>}
    </TitleBarItem>
  </TitleBarContainer>
);

TitleBar.propTypes = {
  primaryHeading: PropTypes.string.isRequired,
  primarySubheading: PropTypes.string,
  secondaryHeading: PropTypes.string,
  secondarySubHeading: PropTypes.string,
  onRemoveSecondary: PropTypes.func,
};

export default TitleBar;
