import React from 'react';
import styled from 'styled-components';

// styling plain button object according to theme
const StyledButton = styled.button`
  /* fixed height and width, use extensions to force to block level*/
  height: 48px;
  min-width: 120px;

  border-radius: 6px;
  border-style: none;

  padding: 10px 20px 10px 20px;

  /* styling background color and text color baesd on props and therefore type of button*/
  background-color: ${(props) => (props.primary ? props.theme.primary : props.theme.primaryLight)};
  color: ${(props) => (props.primary ? props.theme.white : props.theme.primary)};

  font-family: ${(props) => props.theme.fontFamily};
  font-size: 18px;
  font-weight: 500;
  line-height: 30px;
  text-align: center;

  /* preventing blue border around buttons when clicked */
  :focus {
    outline: 0;
  }
`;

const StyledIcon = styled.img`
  margin-right: 12px;
  padding-bottom: 2px;
`;

// text button in the theme style
const TextButton = (props) => (
  <StyledButton
    className={props.className}
    primary={props.primary}
    onClick={props.onClick}
  >
    {props.icon && <StyledIcon src={props.icon} alt={props.icon} />}
    {props.title}
  </StyledButton>
);

export default TextButton;
