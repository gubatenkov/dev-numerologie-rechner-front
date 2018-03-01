import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/NavigationDropdownMenu.css';

/**
 * A Dropdown Menu in the navigation bar
 */
class NavigationDropdownMenu extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
    navbar: PropTypes.bool,
    direction: PropTypes.oneOf(['default', 'right']),
  };

  static defaultProps = {
    children: null,
    navbar: false,
    direction: 'default',
  };

  /**
   * default constructor
   */
  constructor(props) {
    // calling super constructor
    super(props);

    // setting initial state
    this.state = {
      isOpen: false,
    };
  }

  /**
   * handles clicks on the dropdown itself and hides/shows menu
   */
  handleDropdownItemClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  /**
   * renders nav dropdown item with title and children as menu items
   */
  render() {
    return (
      <div
        className="dropdownItem"
        onClick={this.handleDropdownItemClick}
        onBlur={this.handleBlur}
        role="button"
      >
        <li className={`nav-item dropdown${this.state.isOpen ? ' show' : ''}`}>
          <a
            className={`NavigationDropdownMenu__button ${
              this.props.navbar ? 'nav-link' : ''
            }`}
            role="button"
          >
            {this.props.name}
          </a>
          <div
            className={`dropdown-menu dropdown-menu-bullet ${
              this.props.direction === 'right' ? 'dropdown-menu-right' : ''
            }`}
            role="menu"
          >
            {this.props.children}
          </div>
        </li>
      </div>
    );
  }
}

export default NavigationDropdownMenu;
