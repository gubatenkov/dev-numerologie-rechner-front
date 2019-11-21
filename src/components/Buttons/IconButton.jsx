import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const StyledButton = styled.button`
  /* Icon buttons are square */
  width: 36px;
  height: 36px;
  padding: 6px;

  border-radius: 6px;
  border-style: none;

  /* getting proper colors from base theme */
  background-color: ${(props) => props.theme.primaryLight};
  color: ${(props) => props.theme.primary};

  /* preventing blue border around buttons when clicked */
  :focus {
    outline: 0;
  }
`;

/**
 * Button that wraps a FA icon
 */
const IconButton = (props) => (
  <StyledButton onClick={props.onClick}>
    <FontAwesomeIcon icon={props.icon || faArrowLeft} />
  </StyledButton>
);

export default IconButton;
