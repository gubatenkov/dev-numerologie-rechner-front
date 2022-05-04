/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";

import "./index.scss";

import useHover from "../../utils/hooks/useHover";

const LangDrop = () => {
  const [ref, isHovered] = useHover();
  const [lang, setLang] = useState("EN");

  return (
    <div className="lang-drop" ref={ref}>
      <span className="lang-drop__lang">{lang}</span>
      <ul
        className="lang-drop__menu"
        style={{ visibility: isHovered ? "visible" : "hidden" }}
      >
        <li
          className={`lang-drop__item ${lang === "EN" && "active"}`}
          onClick={() => setLang("EN")}
        >
          EN
        </li>
        <li
          className={`lang-drop__item ${lang === "DE" && "active"}`}
          onClick={() => setLang("DE")}
        >
          DE
        </li>
        <li
          className={`lang-drop__item ${lang === "IT" && "active"}`}
          onClick={() => setLang("IT")}
        >
          IT
        </li>
      </ul>
    </div>
  );
};

export default LangDrop;
