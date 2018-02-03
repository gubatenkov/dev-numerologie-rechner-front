import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

    // setting initial state
    this.state = {
      isOpen: false,
    };
  }

  /**
   * handles clicks on the dropdown item itself and hides/shows menu
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
          <a className="nav-link dropdown-toggle" role="button">
            {this.props.name}
          </a>
          <div className="dropdown-menu dropdown-menu-bullet" role="menu">
            {this.props.children}
          </div>
        </li>
      </div>
    );
  }
}

export default NavigationDropdownMenu;
