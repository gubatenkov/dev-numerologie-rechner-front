import React from "react";

import "./index.scss";

const Burger = ({ isActive, onClick, ...restProps }) => {
  return (
    <button
      className={`burger ${isActive ? "active" : ""}`}
      onClick={onClick}
      {...restProps}
    >
      <span className="burger-line"></span>
    </button>
  );
};

export default Burger;
