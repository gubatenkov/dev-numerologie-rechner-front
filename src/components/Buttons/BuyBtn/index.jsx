import React from "react";

import "./index.scss";

const BuyBtn = ({ children, ...restProps }) => {
  return (
    <button className="buy-btn" {...restProps}>
      {children}
    </button>
  );
};

export default BuyBtn;
