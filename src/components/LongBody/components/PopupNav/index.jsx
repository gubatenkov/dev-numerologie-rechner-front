import React from "react";

import "./index.scss";

const PopupNav = ({ className = "", prevName, nextName, onNavClick }) => {
  return (
    <div className={`popupnav__nav ${className}`}>
      <button
        className={
          !prevName?.length
            ? "popupnav__nav-btn popupnav__nav-btn--left popupnav__nav-btn--disabled"
            : "popupnav__nav-btn popupnav__nav-btn--left"
        }
        onClick={() => onNavClick("prev")}
      >
        {prevName}
      </button>
      <button
        className={
          !nextName?.length
            ? "popupnav__nav-btn popupnav__nav-btn--right popupnav__nav-btn--disabled"
            : "popupnav__nav-btn popupnav__nav-btn--right"
        }
        onClick={() => onNavClick("next")}
      >
        {nextName}
      </button>
    </div>
  );
};

export default PopupNav;
