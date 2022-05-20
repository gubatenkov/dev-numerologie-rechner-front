import React, { useState } from "react";

import "./index.scss";

import ButtonImg from "../Buttons/ButtonImg";
import SwitchBtn from "../Buttons/SwitchBtn";

import img from "../../images/plusGrey.svg";

const Topbar = ({ onCrossClick, onToggleChange }) => {
  const [isON, setIsON] = useState(false);
  const textLeftClasses = !isON
    ? "topbar__left-text topbar__left-text--on"
    : "topbar__left-text";
  const textRightClasses = isON
    ? "topbar__left-text topbar__left-text--on"
    : "topbar__left-text";

  const handleChange = () => {
    setIsON(!isON);
    onToggleChange();
  };

  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar-inner">
          <div className="topbar__left">
            <p className={textLeftClasses}>For Beginners</p>
            <SwitchBtn onChange={handleChange} />
            <p className={textRightClasses}>For Professionals</p>
          </div>
          <div className="topbar__right">
            <ButtonImg
              className="topbar__right-btn"
              imgPath={img}
              onClick={onCrossClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
