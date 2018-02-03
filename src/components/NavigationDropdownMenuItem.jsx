import React from 'react';
import PropTypes from 'prop-types';

/**
 * wrapper component for dropdown items in the navbar
 */
const NavigationDropdownMenuItem = props => (
  <a
    onClick={props.onClick}
    className="dropdown-item"
    role="button"
    tabIndex={0}
  >
    {props.children}
  </a>
);

NavigationDropdownMenuItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

NavigationDropdownMenuItem.defaultProps = {
  children: null,
};
export default NavigationDropdownMenuItem;
