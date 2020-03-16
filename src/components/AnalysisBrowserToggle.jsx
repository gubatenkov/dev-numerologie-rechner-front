import React from "react";

import iconArrowUp from "../images/icon_arrow_up-24px.svg";
import iconArrowDown from "../images/icon_arrow_down-24px.svg";

const AnalysisBrowserToggle = ({
  children,
  eventKey,
  canExpand,
  isCollapsed,
  onClick
}) => {
  const handleOnClick = () => {
    onClick();
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
      {canExpand && !isCollapsed && <img src={iconArrowDown} alt="Up" />}
      {isCollapsed && <img src={iconArrowUp} alt="Down" />}
    </div>
  );
};

export default AnalysisBrowserToggle;
