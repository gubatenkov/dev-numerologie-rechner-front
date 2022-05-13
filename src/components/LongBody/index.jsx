import React from "react";

import NumPill from "../NumPill";
import PopupNav from "./components/PopupNav";
import TwoColRow from "./components/TwoColRow";
import PlaceholderText from "./components/PlaceholderText";

import "./index.scss";

const PopupLong = ({ section, prevName = "", nextName = "", onNavClick }) => {
  const title = section?.sectionName ?? "Title available in full version";
  const sectionElements =
    section?.sectionElements?.filter(el => el.descriptionText.length) ?? [];

  const checkLeft = left => {
    if (typeof left === "string" && left?.trim()?.length) {
      return left;
    } else {
      return <NumPill />;
    }
  };

  const setContent = () => {
    if (sectionElements?.length) {
      return sectionElements.map((el, i) => {
        console.log(el);
        return (
          <TwoColRow
            key={i}
            left={checkLeft(el.numberDescription.description)}
            right={el.descriptionText}
          />
        );
      });
    }
    return <PlaceholderText />;
  };

  return (
    <div className="popuplong">
      <div className="container">
        <div className="popuplong-inner">
          <h1 className="popuplong__title">{title}</h1>
          <PopupNav
            className="popupnav__nav--bb"
            prevName={prevName}
            nextName={nextName}
            onNavClick={onNavClick}
          />
          <div className="popuplong__content">{setContent()}</div>
          {sectionElements.length > 0 && (
            <PopupNav
              className="popupnav__nav--bt"
              prevName={prevName}
              nextName={nextName}
              onNavClick={onNavClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupLong;
