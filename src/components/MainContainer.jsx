import React from "react";
import PropTypes from "prop-types";

const MainContainer = props => {
  return <div className="main-container">{props.children}</div>;
};

MainContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainContainer;
