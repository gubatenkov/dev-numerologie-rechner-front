import React, { useState } from "react";

const ResultsSection = ({ children, heading, idx, ...restProps }) => {
  const [isCollapsed, setCollapsed] = useState(true);

  return (
    <div
      className={`results-section ${isCollapsed ? "collapsed" : ""}`}
      id={`Section-${idx}`}
    >
      <div onClick={() => setCollapsed(!isCollapsed)}>
        <h3 className="results-section__heading">{heading}</h3>
      </div>
      {children}
    </div>
  );
};

export default ResultsSection;
