import React from "react";
import PropTypes from "prop-types";

import "../styles/Panel.css";

const Panel = props => {
  const panelBaseClass = `panel panel-bordered panel-default ${props.className}`;

  return (
    <div className={panelBaseClass} id={props.id}>
      <div className="panel-heading">
        {props.title && <h5 className="panel-title">{props.title}</h5>}
        {props.actions && <div className="panel-actions">{props.actions}</div>}
      </div>
      <div className="panel-body">{props.children}</div>
      {props.footer && <div className="panel-footer">{props.footer}</div>}
    </div>
  );
};

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.element,
  actions: PropTypes.arrayOf(PropTypes.element),
  className: PropTypes.string
};

Panel.defaultProps = {
  id: null,
  children: null,
  footer: null,
  actions: null,
  className: ""
};

export default Panel;
