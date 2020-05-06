import React from "react";
import PropTypes from "prop-types";

import "../../styles/Dialog.css";
import { useEffect } from "react";

const Dialog = props => {
  useEffect(() => {
    document.body.classList.toggle("noScroll", props.isOpen);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.body.classList.toggle("noScroll", props.isOpen);
  });

  if (props.isOpen === false) {
    return null;
  }

  return (
    <div
      className="modal fade show"
      role="dialog"
      tabIndex="-1"
      style={{ display: "block" }}
    >
      <div className="modal-dialog modal-center">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={props.onClose}>
              <span aria-hidden="true">×</span>
            </button>
            <h4 className="modal-title">{props.title}</h4>
          </div>
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default"
              data-dismiss="modal"
              onClick={props.onCancel ? props.onCancel : props.onClose}
            >
              {props.cancelTitle}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={props.onAction}
            >
              {props.actionTitle}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  isOpen: PropTypes.bool,
  onAction: PropTypes.func,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.string.isRequired,
  cancelTitle: PropTypes.string,
  actionTitle: PropTypes.string
};

Dialog.defaultProps = {
  isOpen: false,
  onAction: () => {},
  onCancel: null,
  onClose: () => {},
  cancelTitle: null,
  actionTitle: null
};

export default Dialog;
