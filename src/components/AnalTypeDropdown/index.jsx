import React from "react";
import { Dropdown } from "react-bootstrap";

import "./index.scss";

const AnalTypeDropdown = ({ defaultValue = "Default value" }) => {
  return (
    <Dropdown className="analystype-dropdown">
      <Dropdown.Toggle
        className="analystype-dropdown__btn"
        id="AnalysTypeDropdown"
      >
        {defaultValue}
      </Dropdown.Toggle>

      <Dropdown.Menu className="analystype-dropdown__menu">
        <Dropdown.Item className="analystype-dropdown__item">
          Personality analysis
        </Dropdown.Item>
        <Dropdown.Item className="analystype-dropdown__item">
          Couple analysis
        </Dropdown.Item>
        <Dropdown.Item className="analystype-dropdown__item">
          Child analysis
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AnalTypeDropdown;
