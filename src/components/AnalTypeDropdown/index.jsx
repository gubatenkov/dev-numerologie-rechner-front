import React from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "./index.scss";

import useFormContext from "../../utils/useFormContext";

const AnalTypeDropdown = () => {
  const { t } = useTranslation();
  const {
    analType,
    setPersonalType,
    setCoupleType,
    setChildType
  } = useFormContext();

  return (
    <Dropdown className="analystype-dropdown">
      <Dropdown.Toggle
        className="analystype-dropdown__btn"
        id="AnalysTypeDropdown"
      >
        {t(analType)}
      </Dropdown.Toggle>

      <Dropdown.Menu className="analystype-dropdown__menu">
        <Dropdown.Item
          className="analystype-dropdown__item"
          onClick={setPersonalType}
        >
          {t("ANAL_PERSONALITY_TEXT")}
        </Dropdown.Item>
        <Dropdown.Item
          className="analystype-dropdown__item"
          onClick={setCoupleType}
        >
          {t("ANAL_COUPLE_TEXT")}
        </Dropdown.Item>
        <Dropdown.Item
          className="analystype-dropdown__item"
          onClick={setChildType}
        >
          {t("ANAL_CHILD_TEXT")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AnalTypeDropdown;
