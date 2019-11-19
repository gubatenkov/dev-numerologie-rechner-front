import React from 'react';

/**
 * Bar component offering actions (like saving an analysis or
 * adding a name to compare) to the user. This component is a wrapper
 * for child items passed by another component (usually buttons)
 */
const ActionBar = (props) => <div>{props.children}</div>;

export default ActionBar;
