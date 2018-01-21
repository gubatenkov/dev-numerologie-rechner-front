import React from 'react';

/**
 * wrapper component for dropdown items in the navbar
 */
const NavigationDropdownMenuItem = props => (
	<a onClick={props.onClick} className="dropdown-item">{props.children}</a>
);

export default NavigationDropdownMenuItem;
