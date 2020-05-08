import React from "react";
import PropTypes from "prop-types";

const InputField = props => {
  return (
    <div className="form-group">
      <div className="input-group input-group-icon">
        {props.icon && (
          <span className="input-group-addon">
            <span className={`icon ${props.icon}`} aria-hidden="true" />
          </span>
        )}
        <input
          type={props.type}
          className="form-control"
          placeholder={props.fieldName}
          onChange={props.onChange}
          autoComplete={props.autoComplete}
        />
      </div>
    </div>
  );
};

InputField.propTypes = {
  icon: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  type: PropTypes.string
};

InputField.defaultProps = {
  icon: null,
  onChange: () => {},
  type: "text"
};

export default InputField;
