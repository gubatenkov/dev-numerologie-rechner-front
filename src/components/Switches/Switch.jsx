import React from "react";
import TogglSwitch from "react-switch";
import { withTheme } from "styled-components";

const Switch = props => (
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
    disabled={props.disabled}
  />
);

export default withTheme(Switch);
