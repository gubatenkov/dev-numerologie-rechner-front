import React, { Component } from "react";
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

/**
 * A Dropdown Menu in the navigation bar
 */
class NavigationDropdownMenu extends Component {
  static propTypes = {
    children: PropTypes.node,
    customToggle: PropTypes.node
  };

  static defaultProps = {
    children: null,
    customToggle: <IconAdd />
  };

  /**
   * renders nav dropdown item with title and children as menu items
   */
  render() {
    return (
      <Dropdown alignRight onBlur={this.handleBlur}>
        <Dropdown.Toggle
          as={CustomToggleFactory(this.props.customToggle)}
          id="dropdown-custom-components"
        />
        <Dropdown.Menu>{this.props.children}</Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default NavigationDropdownMenu;
