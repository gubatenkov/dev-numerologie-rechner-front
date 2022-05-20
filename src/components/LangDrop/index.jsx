/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";

import "./index.scss";

import useHover from "../../utils/hooks/useHover";
import { LANGUAGES } from "../../utils/Constants";
import useLangContext from "../../utils/useLangContext";

const LangDrop = ({ className, ...restProps }) => {
  const { lang: langId, setLang } = useLangContext();
  const [ref, isHovered] = useHover();

  const handleClick = langId => {
    setLang(langId);
  };

  const renderLangItems = () => {
    return LANGUAGES.map(({ id, code }) => {
      return (
        <li
          className={
            langId === id ? "lang-drop__item active" : "lang-drop__item"
          }
          key={id}
          onClick={() => handleClick(id)}
        >
          {code.slice(0, 2)}
        </li>
      );
    });
  };

  return (
    <div className={`lang-drop ${className}`} ref={ref}>
      <span className="lang-drop__lang">{langId.toUpperCase()}</span>
      <ul
        className="lang-drop__menu"
        style={{ visibility: isHovered ? "visible" : "hidden" }}
      >
        {renderLangItems()}
      </ul>
    </div>
  );
};

export default LangDrop;
