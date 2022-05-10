import React, { useEffect } from "react";

import "./index.scss";

import ButtonImg from "../Buttons/ButtonImg";
import crossImg from "../../images/rotatedCross.svg";

const PopupBase = ({ name, title, onClose, children = "" }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="popup-base">
      <div className="popup-base__inner">
        <header className="popup-base__header">
          <p className="popup-base__name">{name}</p>
          <ButtonImg
            className="popup-base__close"
            imgPath={crossImg}
            onClick={onClose}
          />
        </header>
        <article className="popup-base__body">
          <p className="popup-base__title">{title}</p>
          <div className="popup-base__content">{children}</div>
        </article>
      </div>
    </div>
  );
};

export default PopupBase;
