import React, { useEffect } from "react";

import "./index.scss";

const Popup = ({ children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return <div className="popup">{children}</div>;
};

export default Popup;
