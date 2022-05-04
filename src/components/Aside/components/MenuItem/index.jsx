import React from "react";

const MenuItem = ({ children, ...restProps }) => {
  return <li {...restProps}>{children}</li>;
};

export default MenuItem;
