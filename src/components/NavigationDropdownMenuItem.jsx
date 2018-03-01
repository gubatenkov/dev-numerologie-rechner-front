import React from 'react';
import PropTypes from 'prop-types';

import '../styles/NavigationDropdownMenuItem.css';

/**
 * wrapper component for dropdown items in the navbar
 */
const NavigationDropdownMenuItem = props => (
  <a
    onClick={props.onClick}
    className="NavigationDropdownMenuItem dropdown-item"
    role="button"
  >
    {props.children}
  </a>
);

NavigationDropdownMenuItem.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

NavigationDropdownMenuItem.defaultProps = {
  onClick: () => {},
  children: null,
};
export default NavigationDropdownMenuItem;
