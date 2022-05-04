import React from "react";
import Typography from "../Typography";

import "./index.scss";

const PillImg = ({
  text,
  children,
  switched = false,
  blur = false,
  onClick
}) => {
  if (switched) {
    return (
      <button
        className={`pill-img ${blur && "pill-img--blur"}`}
        onClick={onClick}
      >
        <Typography as="p" fs="14px" fw="700" lh="20px">
          {children}
        </Typography>
        {text && <span className="pill-img__icon">{text}</span>}
      </button>
    );
  }
  return (
    <button
      className={`pill-img ${blur && "pill-img--blur"}`}
      onClick={onClick}
    >
      {text && <span className="pill-img__icon">{text}</span>}
      <Typography as="p" fs="14px" fw="700" lh="20px">
        {children}
      </Typography>
    </button>
  );
};

export default PillImg;
