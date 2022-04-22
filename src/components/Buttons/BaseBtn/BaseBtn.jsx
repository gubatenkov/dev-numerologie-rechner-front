import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

const Btn = ({ children, link = false, href, ...restProps }) => {
  if (link) {
    return (
      <Link to={href} {...restProps}>
        {children}
      </Link>
    );
  }
  return <button {...restProps}>{children}</button>;
};

export default Btn;
