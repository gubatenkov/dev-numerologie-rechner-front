import React from "react";
import PropTypes from "prop-types";

import "../styles/NavigationDropdownMenuItem.css";
import Dropdown from "react-bootstrap/Dropdown";

const NavigationDropdownMenuItem = props => (
  <Dropdown.Item variant="link" onClick={props.onClick} role="link">
    {props.children}
  </Dropdown.Item>
);

NavigationDropdownMenuItem.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node
};

NavigationDropdownMenuItem.defaultProps = {
  onClick: () => {},
  children: null
};
export default NavigationDropdownMenuItem;
