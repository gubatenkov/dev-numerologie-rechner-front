import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";

import "./index.scss";

import Input from "../../Input";
import BaseBtn from "../../Buttons/BaseBtn/BaseBtn";
import AnalTypeDropdown from "../../AnalTypeDropdown";
import { altNames } from "../../../utils/formStructure";
import useFormContext from "../../../utils/useFormContext";

const AnalForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onSubmit" });

  const [isAddBtnVisible, setAddBtnVisible] = useState(true);
  const { formGroups, analType } = useFormContext();
  const couple = analType === "ANAL_COUPLE_TEXT";

  // const onBlur = e => {
  //   let val = e.target.value;
  //   // add zero to day or month input if val < 10
  //   if (val < 10 && val > 0) {
  //     val = `0${val}`;
  //   }
  // };

  // const changeInput = (e, maxLen = 2) => {
  //   let val = e.target.value;
  //   let name = e.target.name;
  //   if (val.length > maxLen) {
  //     // cut input to maxLen
  //     e.target.value = val.slice(0, maxLen);
  //   } else if (name === "day" && (val > 31 || val < 1)) {
  //     e.target.value = "";
  //   } else if (name === "month" && (val > 12 || val < 1)) {
  //     e.target.value = "";
  //   }
  // };

  // show add btn only if it's not the couple type
  useEffect(() => {
    couple ? setAddBtnVisible(false) : setAddBtnVisible(true);
  }, [couple]);

  const handleCompareBtnClick = () => {
    setAddBtnVisible(false);
  };

  return (
    <form className="anal-form" onSubmit={handleSubmit(data => onSubmit(data))}>
      <div className="anal-form__inner">
        <AnalTypeDropdown />
        <div className="anal-form__group-wrap">
          {formGroups.map((group, idx) => {
            return (
              <div
                className={`anal-group anal-group__${group.groupName}`}
                key={idx}
              >
                {group.inputs.map((input, idx) => {
                  return (
                    <Input
                      className={input.className}
                      key={idx}
                      label={t(input.label)}
                      placeholder={input.placeholder}
                      message={errors[input.name] && " "}
                      register={() => register(input.name, input.validator)}
                    />
                  );
                })}
              </div>
            );
          })}
          <BaseBtn
            className={
              isAddBtnVisible
                ? "transparent-btn transparent-btn--plus anal-compare__btn"
                : "transparent-btn transparent-btn--plus anal-compare__btn opacity"
            }
            type="button"
            onClick={handleCompareBtnClick}
          >
            {t("ANAL_FORM_PLUSBTN_TEXT")}
          </BaseBtn>
        </div>
        <BaseBtn className="blue-btn anal-form__submit" type="submit">
          {t("ANAL_FORM_SUBMITBTN_TEXT")}
        </BaseBtn>
      </div>
      <div className="anal-form__comparenames">
        <div className="anal-form__comparenames--w280" />
        {!isAddBtnVisible && !couple && (
          <div className="anal-form__comparenames-names">
            {altNames.inputs.map((input, idx) => {
              return (
                <Input
                  className={input.className}
                  key={idx}
                  label={t(input.label)}
                  placeholder={input.placeholder}
                  message={errors[input.name] && " "}
                  register={() => register(input.name, input.validator)}
                />
              );
            })}
          </div>
        )}
        <div />
      </div>
      <BaseBtn
        className="blue-btn anal-form__submit anal-form__submit--mobile"
        type="submit"
      >
        {t("ANAL_FORM_SUBMITBTN_TEXT")}
      </BaseBtn>
    </form>
  );
};

export default AnalForm;
