import React from "react";

import "./index.scss";

const TwoColRow = ({ left, right }) => {
  // prevent to render empty strings
  if (typeof right === "string" && !right?.trim()?.length) return null;

  return (
    <div className="twocol">
      <div className="twocol__col">
        <div className="twocol__col-text">{left}</div>
      </div>
      <div
        className="twocol__col"
        dangerouslySetInnerHTML={{ __html: right }}
      />
    </div>
  );
};

export default TwoColRow;
