import React from "react";

import "./index.scss";

const SwitchBtn = ({ onChange }) => {
  return <input className="switchbtn" type="checkbox" onChange={onChange} />;
};

export default SwitchBtn;
