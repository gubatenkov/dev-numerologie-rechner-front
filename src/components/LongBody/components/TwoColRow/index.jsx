import React from "react";

import "./index.scss";

const TwoColRow = ({ left, right, heading }) => {
  // prevent to render empty strings
  if (typeof right === "string" && !right?.trim()?.length) return null;

  return (
    <div className="twocol">
      <div className="twocol__col">
        <div className="twocol__col-text">{left}</div>
      </div>
      <div className="twocol__col">
        {heading.length > 0 && (
          <h2 className="twocol__col-heading">{heading}</h2>
        )}
        <div
          className="twocol__col-content"
          dangerouslySetInnerHTML={{ __html: right }}
        ></div>
      </div>
    </div>
  );
};

export default TwoColRow;
