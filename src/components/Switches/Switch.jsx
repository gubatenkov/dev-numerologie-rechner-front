import React from 'react';
import TogglSwitch from 'react-switch';
import { withTheme } from 'styled-components';

// on/off toggl switch customized according to theme
const Switch = (props) => (
  <TogglSwitch
    onChange={props.onChange}
    checked={props.checked}
    offColor={props.theme.lightGrey}
    onColor={props.theme.primary}
    checkedIcon={false}
    uncheckedIcon={false}
    handleDiameter={24}
    height={32}
    width={48}
  />
);

export default withTheme(Switch);
