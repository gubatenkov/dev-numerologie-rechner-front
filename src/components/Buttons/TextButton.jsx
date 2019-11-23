import React from 'react';
import styled from 'styled-components';

// styling plain button object according to theme
const StyledButton = styled.button`
  /* fixed height and width, use extensions to force to block level*/
  height: 40px;
  width: 120px;
  
  border-radius: 6px;
  border-style: none;

  padding: 5px 12px 5px 12px;

  /* styling background color and text color baesd on props and therefore type of button*/
  background-color: ${(props) => (props.primary ? props.theme.primary : props.theme.primaryLight)};
  color: ${(props) => (props.primary ? props.theme.white : props.theme.primary)};

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

// text button in the theme style
const TextButton = (props) => (
    <StyledButton className={props.className} primary={props.primary} onClick={props.onClick}>
      {props.title}
    </StyledButton>
);

export default TextButton;
