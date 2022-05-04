import React, { useState } from "react";

const ResultsSection = ({ children, heading, ...restProps }) => {
  const [isCollapsed, setCollapsed] = useState(true);

  return (
    <div className={`results-section ${isCollapsed ? "collapsed" : ""}`}>
      <div onClick={() => setCollapsed(!isCollapsed)}>
        <h3 className="results-section__heading">{heading}</h3>
      </div>
      {children}
    </div>
  );
};

export default ResultsSection;
