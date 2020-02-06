import React, { useState } from "react";
import { useAccordionToggle } from "react-bootstrap";

import iconArrowUp from "../images/icon_arrow_up-24px.svg";
import iconArrowDown from "../images/icon_arrow_down-24px.svg";

const AnalysisBrowserToggle = ({ children, eventKey, canExpand }) => {
  const [isCollapsed, setCollapsed] = useState(false);
  const decoratedOnClick = useAccordionToggle(eventKey, () => {
    setCollapsed(!isCollapsed);
  });

  const handleOnClick = () => {
    if (canExpand) decoratedOnClick();
  };

  return (
    // TODO: BUG: When Accordion is closed by another one this doesnt work anymore
    <div
      onClick={handleOnClick}
      className={`analysis-browser-toggle ${
        canExpand ? "akb-clickable" : null
      }`}
    >
      <div className="text">{children}</div>
      {canExpand && !isCollapsed && <img src={iconArrowDown} alt="Down" />}
      {isCollapsed && <img src={iconArrowUp} alt="Up" />}
    </div>
  );
};

export default AnalysisBrowserToggle;
