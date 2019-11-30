import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner';

// styling loading indicator
const LoadingIndicatorContainer = styled.div`
  padding-top: 10em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  opacity: 0.7;
  z-index: 10000;
`;

// styling text
const LoadingIndicatorText = styled.h4`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 18px;
  margin-top: 20px;
  font-weight: 500;
`;

/**
 * spinner inidcating loading
 */
const LoadingIndicator = (props) => (
  <LoadingIndicatorContainer>
    <Spinner animation="border" role="status" variant="dark" />
    <LoadingIndicatorText className="LoadingIndicator__text">
      {props.text}
    </LoadingIndicatorText>
  </LoadingIndicatorContainer>
);

export default LoadingIndicator;
