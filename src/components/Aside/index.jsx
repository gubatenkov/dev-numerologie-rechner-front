import React, { useState } from "react";
import { Spinner } from "react-bootstrap";

import "./index.scss";

import Typography from "../Typography";
import MenuList from "./components/MenuList";
import MenuItem from "./components/MenuItem";
import { useUser } from "../../contexts/UserContext";

const Aside = ({ items, onDownloadClick, isDownloadable }) => {
  const User = useUser();
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

  const getDownloadBtn = () => {
    if (!User?.user) {
      return (
        <button className="aside-btn blue-btn" disabled={true}>
          <span>Login to Download</span>
        </button>
      );
    } else {
      return isDownloadable ? (
        <button
          className="aside-btn blue-btn"
          onClick={onDownloadClick}
          disabled={!isDownloadable}
        >
          <span>Download analysis</span>
        </button>
      ) : (
        <button
          className="aside-btn blue-btn  no-img"
          onClick={onDownloadClick}
          disabled={!isDownloadable}
        >
          <Spinner animation="border" role="status" variant="light" />
        </button>
      );
    }
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
      {getDownloadBtn()}
    </aside>
  );
};

export default Aside;
