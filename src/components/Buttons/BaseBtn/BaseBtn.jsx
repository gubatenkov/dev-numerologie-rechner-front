import React from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import "./index.scss";

const Btn = ({ children, link = false, href, loading, ...restProps }) => {
  if (loading) {
    return (
      <button {...restProps} disabled>
        <Spinner animation="border" role="status" variant="light" />
      </button>
    );
  } else if (link) {
    return (
      <Link to={href} {...restProps}>
        {children}
      </Link>
    );
  }
  return <button {...restProps}>{children}</button>;
};

export default Btn;
