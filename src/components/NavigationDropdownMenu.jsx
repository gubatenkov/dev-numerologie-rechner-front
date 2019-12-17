import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/NavigationDropdownMenu.css';
import { Dropdown } from 'react-bootstrap';
import { ReactComponent as IconAdd } from '../images/icon_add.svg';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <IconAdd />
  </div>
));

/**
 * A Dropdown Menu in the navigation bar
 */
class NavigationDropdownMenu extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  /**
   * default constructor
   */
  constructor(props) {
    // calling super constructor
    super(props);
  }

  /**
   * renders nav dropdown item with title and children as menu items
   */
  render() {
    return (
      <Dropdown alignRight onBlur={this.handleBlur}>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />
        <Dropdown.Menu>{this.props.children}</Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default NavigationDropdownMenu;
