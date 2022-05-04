import React, { useState } from "react";

import "./index.scss";

import Typography from "../Typography";
import MenuList from "./components/MenuList";
import MenuItem from "./components/MenuItem";

const Aside = ({ items }) => {
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
        {name}
        {titles?.length && (
          <MenuList className="aside-menu__submenu">
            {titles.map(({ title }, idx) => (
              <MenuItem className="aside-menu__submenu-item" key={idx}>
                {title}
              </MenuItem>
            ))}
          </MenuList>
        )}
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
          Contents
        </Typography>
        <hr className="aside-border" />
        <MenuList className="aside-menu">{render()}</MenuList>
      </div>
      <button className="aside-btn blue-btn">
        <span>Download analysis</span>
      </button>
    </aside>
  );
};

export default Aside;
