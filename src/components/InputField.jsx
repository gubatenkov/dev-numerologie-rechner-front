import React from "react";
import PropTypes from "prop-types";

const InputField = ({
  icon,
  type,
  fieldName,
  message,
  onChange,
  autoComplete,
  register,
  ...restProps
}) => {
  return (
    <div className="form-group">
      <div className="input-group input-group-icon">
        {icon && (
          <span className="input-group-addon">
            <span className={`icon ${icon}`} aria-hidden="true" />
          </span>
        )}
        <input
          type={type}
          className="form-control"
          placeholder={fieldName}
          onChange={onChange}
          autoComplete={autoComplete}
          {...restProps}
          {...register()}
        />
      </div>
      {message?.length && (
        <p
          className="err-message"
          style={{ color: "red", fontSize: "13px", margin: "5px 0 0" }}
        >
          {message}
        </p>
      )}
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
