import React from "react";

import "./index.scss";

const Input = ({
  className = "",
  label = "",
  placeholder = "",
  register = () => {},
  ...restProps
}) => {
  const inputName = `input-${Math.floor(Math.random() * 1000)}`;

  return (
    <div className="input-group">
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
    </div>
  );
};

export default Input;
