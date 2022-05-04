import React from "react";

import "./index.scss";

const ButtonImg = ({ imgPath, className, ...restProps }) => {
  return (
    <button className={`button-img ${className}`} {...restProps}>
      <img className="button-img__img" src={imgPath} alt="icon" />
    </button>
  );
};

export default ButtonImg;
