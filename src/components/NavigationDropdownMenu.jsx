import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/NavigationDropdownMenu.css';
import DropdownButton from 'react-bootstrap/DropdownButton';

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
      <DropdownButton
        alignRight
        className="dropdownItem"
        title=""
        variant={'info'}
        onClick={this.handleDropdownItemClick}
        onBlur={this.handleBlur}
      >
        {this.props.children}
      </DropdownButton>
    );
  }
}

export default NavigationDropdownMenu;
