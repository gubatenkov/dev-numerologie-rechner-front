import React from 'react';
import PropTypes from 'prop-types'; 
import { Button } from 'react-bootstrap';

import '../styles/NavigationDropdownMenuItem.css';

/**
 * wrapper component for dropdown items
 */
const NavigationDropdownMenuItem = props => (
  <Button
    variant="link"
    onClick={props.onClick}
    className="NavigationDropdownMenuItem dropdown-item"
    role="link"
  >
    {props.children}
  </Button>
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
