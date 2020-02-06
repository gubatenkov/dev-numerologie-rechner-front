import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// styling plain button to match appearance of theme
const StyledButton = styled.button`
  /* Icon buttons are square */
  width: 48px;
  height: 48px;

  border-radius: 6px;
  border-style: none;
  position: relative;

  /* getting proper colors from base theme, inverted means on dark background*/
  background-color: ${props =>
    props.inactive
      ? props.theme.lightestGrey
      : props.primary
      ? props.theme.primary
      : props.inverted
      ? props.theme.white
      : props.theme.primaryLight};
  color: ${props =>
    props.inactive ? props.theme.darkGrey2 : props.theme.primary};

  /* setting shadow if inverted*/
  box-shadow: ${props =>
    props.inverted ? "0 0 8px 0 rgba(50,50,50,0.08)" : "none"};

  /* setting font size as this will determine size of icon */
  font-size: 18px;

  /* preventing blue border around buttons when clicked */
  :focus {
    outline: 0;
  }
`;

const IconImage = styled.img``;

// plain button that wraps a FA icon
// passed icon props need to be FA icons (imported!)
const IconButton = props => (
  <StyledButton
    className={props.className}
    onClick={props.onClick}
    inverted={props.inverted}
    inactive={props.inactive}
    primary={props.primary}
  >
    {props.faIcon && <FontAwesomeIcon icon={props.faIcon} />}
    {!props.faIcon && props.imageIcon && (
      <IconImage src={props.imageIcon} alt={props.imageIcon} />
    )}
  </StyledButton>
);

IconButton.propTypes = {
  onClick: PropTypes.func,
  inverted: PropTypes.bool,
  inactive: PropTypes.bool,
  primary: PropTypes.bool,
  faIcon: PropTypes.object,
  imageIcon: PropTypes.string
};

export default IconButton;
