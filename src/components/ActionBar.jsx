import React from 'react';
import styled from 'styled-components';


const ActionBarContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 59px;
`;

/**
 * Bar component offering actions (like saving an analysis or
 * adding a name to compare) to the user. This component is a wrapper
 * for child items passed by another component (usually buttons)
 */
const ActionBar = (props) => <ActionBarContainer>{props.children}</ActionBarContainer>;

export default ActionBar;
