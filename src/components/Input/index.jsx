import React from "react";

import "./index.scss";

const Input = ({
  className = "",
  label = "",
  placeholder = "",
  message = "",
  register = () => {},
  ...restProps
}) => {
  const inputName = `input-${Math.floor(Math.random() * 1000)}`;

  return (
    <div className={`input-group ${message.length > 0 ? "error" : ""}`}>
      <label className="input-group__label" htmlFor={inputName}>
        {label}
      </label>
      <input
        id={inputName}
        className={`input-group__input ${className}`}
        type="text"
        {...restProps}
        placeholder={placeholder}
        {...register()}
      />
      {message.length > 0 && <p className="input-group__message">{message}</p>}
    </div>
  );
};
export default Input;
