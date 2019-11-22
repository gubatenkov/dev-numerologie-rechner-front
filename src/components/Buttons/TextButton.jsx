import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  height: 40px;
  width: 120px;

  border-radius: 6px;
  border-style: none;

  padding: 5px 12px 5px 12px;

  background-color: ${(props) => props.theme.primaryLight};
  color: ${(props) => props.theme.primary};

  font-family: ${(props) => props.theme.fontFamily};

  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  text-align: center;

  /* preventing blue border around buttons when clicked */
  :focus {
    outline: 0;
  }
`;

/**
 * Button that wraps a FA icon
 */
const TextButton = (props) => (
  <StyledButton onClick={props.onClick}>{props.title}</StyledButton>
);

export default TextButton;
