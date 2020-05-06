import React from "react";

import "../styles/AdArea.css";

const AdArea = props => {
  return (
    <div className={props.horizontal ? "AdArea--horizontal" : "AdArea"}>
      {props.children}
    </div>
  );
};

export default AdArea;
