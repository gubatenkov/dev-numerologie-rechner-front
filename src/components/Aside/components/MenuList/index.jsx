import React from "react";

const MenuList = ({ children, ...restProps }) => {
  return <ul {...restProps}>{children}</ul>;
};

export default MenuList;
