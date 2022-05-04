import React, { useState } from "react";
import { useForm } from "react-hook-form";

import "./index.scss";

import Input from "../../Input";
import BaseBtn from "../../Buttons/BaseBtn/BaseBtn";
import AnalTypeDropdown from "../../AnalTypeDropdown";
import useValidators from "../../../utils/useValidators";

const AnalForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onSubmit" });
  const {
    analNameValidator,
    yearValidator,
    altNameValidator,
    altLastnameValidator
  } = useValidators();
  const [comfortNameFieldsShown, setComfortNamesFieldsShown] = useState(false);

  const onBlur = e => {
    let val = e.target.value;
    // add zero to day or month input if val < 10
    if (val < 10 && val > 0) {
      val = `0${val}`;
    }
  };

  const changeInput = (e, maxLen = 2) => {
    let val = e.target.value;
    let name = e.target.name;
    if (val.length > maxLen) {
      // cut input to maxLen
      e.target.value = val.slice(0, maxLen);
    } else if (name === "day" && (val > 31 || val < 1)) {
      e.target.value = "";
    } else if (name === "month" && (val > 12 || val < 1)) {
      e.target.value = "";
    }
  };

  return (
    <form className="anal-form" onSubmit={handleSubmit(data => onSubmit(data))}>
      <div className="anal-form-row">
        <AnalTypeDropdown defaultValue="Personality analysis" />

        <div className="anal-group anal-group__names">
          <Input
            className="anal-group__input"
            label="First name"
            placeholder="John"
            register={() => register("name", analNameValidator)}
            message={errors.name && " "}
          />
          <Input
            className="anal-group__input"
            label="Last name"
            placeholder="Johnson"
            register={() => register("lastname", analNameValidator)}
            message={errors.lastname && errors.lastname.message}
          />

          <BaseBtn
            className="transparent-btn transparent-btn--plus anal-compare__btn"
            onClick={() => setComfortNamesFieldsShown(!comfortNameFieldsShown)}
            type="button"
          >
            Name Comparison
          </BaseBtn>
        </div>

        <div className="anal-group anal-group__date">
          <Input
            className="anal-group__input number"
            placeholder="19"
            register={() =>
              register("day", {
                required: {
                  value: true,
                  message: "Field required"
                },
                onBlur
              })
            }
            type="number"
            onInput={e => changeInput(e, 2)}
            // message={errors.day && errors.day.message}
          />
          <Input
            className="anal-group__input month"
            placeholder="05"
            register={() =>
              register("month", {
                required: { value: true, message: "Field required" },
                onBlur
              })
            }
            type="number"
            onInput={e => changeInput(e, 2)}
            // message={errors.month && errors.month.message}
          />
          <Input
            className="anal-group__input year"
            placeholder="1995"
            register={() => register("year", yearValidator)}
            type="number"
            onInput={e => changeInput(e, 4)}
            // onBlur={onBlurYear}
            message={errors.year && errors.year.message}
          />
        </div>
      </div>

      {comfortNameFieldsShown && (
        <div className="anal-form-row">
          <div />
          <div className="anal-group anal-group__altnames">
            <Input
              className="anal-group__input"
              label="Altfirst name"
              placeholder="John"
              register={() => register("altname", altNameValidator)}
              message={errors.altname && errors.altname.message}
            />
            <Input
              className="anal-group__input"
              label="Altlast name"
              placeholder="Johnson"
              register={() => register("altlastname", altLastnameValidator)}
              message={errors.altlastname && errors.altlastname.message}
            />
          </div>
          <div />
        </div>
      )}
      <BaseBtn className="blue-btn anal-form__submit" type="submit">
        Analysis
      </BaseBtn>
    </form>
  );
};

export default AnalForm;
