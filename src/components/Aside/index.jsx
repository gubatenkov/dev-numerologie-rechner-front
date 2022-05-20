import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import "./index.scss";

import Typography from "../Typography";
import MenuList from "./components/MenuList";
import MenuItem from "./components/MenuItem";

const Aside = ({ items, downloadBtn }) => {
  const { t } = useTranslation();
  const [isActive, setActive] = useState(0);

  const render = () => {
    return items.map(({ name, titles }, idx) => (
      <MenuItem
        className={
          idx === isActive
            ? "aside-menu__item aside-menu__item--active"
            : "aside-menu__item"
        }
        key={idx}
        onClick={() => setActive(idx)}
      >
        <a href={`#Section-${idx + 1}`} ref={React.createRef()}>
          {name}
          {titles?.length && (
            <MenuList className="aside-menu__submenu">
              {titles.map(({ title }, idx) => {
                title = title.split("=")[0];
                return (
                  <MenuItem className="aside-menu__submenu-item" key={idx}>
                    {title}
                  </MenuItem>
                );
              })}
            </MenuList>
          )}
        </a>
      </MenuItem>
    ));
  };

  return (
    <aside className="aside">
      <div className="aside-inner">
        <Typography
          className="aside-heading"
          as="p"
          fs="18px"
          fw="500"
          lh="30px"
          color="#323232"
        >
          {t("ASIDE_HEADING_TEXT")}
        </Typography>
        <hr className="aside-border" />
        <MenuList className="aside-menu">{render()}</MenuList>
      </div>
      {downloadBtn()}
    </aside>
  );
};

export default Aside;
