import React from "react";
import PropTypes from "prop-types";

import "../styles/NavigationDropdownMenu.css";
import { Dropdown } from "react-bootstrap";
import { ReactComponent as IconAdd } from "../images/icon_add.svg";

const CustomToggleFactory = child =>
  React.forwardRef(({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      {child}
    </div>
  ));

const NavigationDropdownMenu = props => {
  return (
    <Dropdown alignRight>
      <Dropdown.Toggle
        as={CustomToggleFactory(props.customToggle)}
        id="dropdown-custom-components"
      />
      <Dropdown.Menu>{props.children}</Dropdown.Menu>
    </Dropdown>
  );
};

NavigationDropdownMenu.propTypes = {
  children: PropTypes.node,
  customToggle: PropTypes.node
};

NavigationDropdownMenu.defaultProps = {
  children: null,
  customToggle: <IconAdd />
};

export default NavigationDropdownMenu;
