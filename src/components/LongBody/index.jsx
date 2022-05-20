import React from "react";

import NumPill from "../NumPill";
import PopupNav from "./components/PopupNav";
import TwoColRow from "./components/TwoColRow";
import PlaceholderText from "./components/PlaceholderText";

import "./index.scss";

const PopupLong = ({
  section,
  prevName = "",
  nextName = "",
  isForProfessionals,
  onNavClick
}) => {
  const title = section?.sectionName ?? "Title available in full version";
  const sectionElements =
    section?.sectionElements?.filter(el => el?.descriptionText?.length) ?? [];

  const checkLeft = (description, number) => {
    if (typeof description === "string" && description?.trim()?.length) {
      return description;
    }
    return <NumPill numbers={[Number(number)]} />;
  };

  const setContent = () => {
    if (sectionElements?.length) {
      return sectionElements.map((el, i) => {
        const heading = el?.numberDescription?.calculationDescription ?? "";

        return (
          <TwoColRow
            key={i}
            left={checkLeft(el.numberDescription.description, el.result.value)}
            right={el.descriptionText}
            heading={!isForProfessionals ? heading : ""}
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
            className="popupnav__nav--bb popupnav__nav--hidden"
            prevName={prevName}
            nextName={nextName}
            onNavClick={onNavClick}
          />
          <div className="popuplong__content">{setContent()}</div>
          {sectionElements.length > 0 && (
            <PopupNav
              className="popupnav__nav--bt"
              prevName={prevName}
              centerName={title}
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
