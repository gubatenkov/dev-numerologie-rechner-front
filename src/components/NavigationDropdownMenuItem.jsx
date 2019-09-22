import React from 'react';
import PropTypes from 'prop-types';

import '../styles/NavigationDropdownMenuItem.css';

/**
 * wrapper component for dropdown items
 */
const NavigationDropdownMenuItem = props => (
  <button
    onClick={props.onClick}
    className="NavigationDropdownMenuItem dropdown-item"
  >
    {props.children}
  </button>
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
