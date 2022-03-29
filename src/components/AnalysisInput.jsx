import * as yup from "yup";
import moment from "moment";
import PropTypes from "prop-types";
import queryString from "querystring";
import ToastNotifications from "cogo-toast";
import { useTranslation } from "react-i18next";
import React, { useCallback, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
// import {  Controller } from "react-hook-form";

import "../styles/InputForm.css";
import "../styles/AnalysisInput.css";

import Panel from "./Panel";
import InputField from "./InputField";

// import FormBase from "./Forms/FormBase";
// import { useUser } from "../contexts/UserContext";
import useValidators from "../utils/useValidators";
import logoTransparentWhite from "../images/logo_weiss_trans.png";

// defining model for validation
const inputSchemaPersonal = yup.object({
  firstNames: yup
    .string()
    .trim()
    .required(),
  lastName: yup
    .string()
    .trim()
    .required()
});
const inputSchemaPersonalCompare = yup.object({
  firstNames: yup
    .string()
    .trim()
    .required(),
  lastName: yup
    .string()
    .trim()
    .required(),
  firstNamesCompare: yup
    .string()
    .trim()
    .required(),
  lastNameCompare: yup
    .string()
    .trim()
    .required()
});

const AnalysisInput = props => {
  const { t } = useTranslation();
  const [isAltNameReq, setIsAltNameReq] = useState(false);
  const [isAltSurnameReq, setIsAltSurnameReq] = useState(false);

  const [comfortNameFieldsShown, setComfortNameFieldsShown] = useState(false);
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(false);
  const {
    // control,
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const {
    analNameValidator,
    dateValidator,
    altNameValidator,
    altLastnameValidator
  } = useValidators();
  const formState = watch();

  useEffect(() => {
    const { altName, altLastname } = formState;
    if (altName) setIsAltSurnameReq(true);
    else setIsAltSurnameReq(false);
    if (altLastname) setIsAltNameReq(true);
    else setIsAltNameReq(false);
  }, [formState]);

  useEffect(() => {
    document.body.style.backgroundColor = "#00b3d4";
    const querString = props.location.search.replace("?", "");
    const values = queryString.parse(querString);
    const firstNameParam = values.firstNames;
    const lastNameParam = values.lastNames;
    const dateOfBirthParam = values.dateOfBirth;

    if (
      firstNameParam != null &&
      lastNameParam != null &&
      dateOfBirthParam != null
    ) {
      startAnalysis(firstNameParam, lastNameParam, dateOfBirthParam);
    }

    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const validateInput = async (
    firstNames,
    lastNames,
    firstNamesComfort,
    lastNameComfort,
    dateOfBirth
  ) => {
    let valid;
    if (firstNamesComfort || lastNameComfort) {
      valid = await inputSchemaPersonalCompare.isValid({
        firstNames: firstNames,
        lastName: lastNames,
        firstNamesCompare: firstNamesComfort,
        lastNameCompare: lastNameComfort
      });
    } else {
      valid = await inputSchemaPersonal.isValid({
        firstNames: firstNames,
        lastName: lastNames
      });
    }

    if (!valid) {
      ToastNotifications.error(t("TOAST.FIRST_AND_LASTNAME_REQUIRED"), {
        position: "top-right"
      });
      return false;
    }

    // validating dateOfBirth
    const date = moment(dateOfBirth, "DD.MM.YYYY", true);
    if (!date.isValid()) {
      ToastNotifications.error(t("TOAST.DATE_FORMAT_REQUIRED"), {
        position: "top-right"
      });
      return false;
    }

    return true;
  };

  const startAnalysis = async (
    firstNames,
    lastNames,
    firstNamesComfort,
    lastNameComfort,
    dateOfBirth
  ) => {
    if (
      !(await validateInput(
        firstNames,
        lastNames,
        firstNamesComfort,
        lastNameComfort,
        dateOfBirth
      ))
    ) {
      return;
    }
    const names = [firstNames];
    const surnames = [lastNames];
    if (firstNamesComfort && lastNameComfort) {
      names.push(firstNamesComfort);
      surnames.push(lastNameComfort);
    }
    const firstNamesEncoded = encodeURIComponent(names);
    const lastNamesEncoded = encodeURIComponent(surnames);
    const dateOfBirthEncoded = encodeURIComponent(dateOfBirth);
    // navigating to results
    props.history.push(
      `/resultPersonal/${firstNamesEncoded}/${lastNamesEncoded}/${dateOfBirthEncoded}`
    );
  };

  const onSubmit = data => {
    const { name, lastname, altName, altLastname, date } = data;
    const formatedDate = moment(date).format("DD.MM.YYYY");
    startAnalysis(name, lastname, altName, altLastname, formatedDate);
  };

  const callback = useCallback(() => {
    const checkSubmitState = () => {
      const { altName, altLastname, date, name, lastname } = formState;
      if (name && lastname && date && !isAltNameReq && !isAltSurnameReq) {
        setIsSubmitBtnDisabled(false);
      } else if (
        name &&
        lastname &&
        date &&
        isAltNameReq &&
        altName &&
        isAltSurnameReq &&
        altLastname
      ) {
        setIsSubmitBtnDisabled(false);
      } else {
        setIsSubmitBtnDisabled(true);
      }
    };
    checkSubmitState();
  }, [formState, isAltNameReq, isAltSurnameReq]);

  useEffect(() => {
    callback();
  }, [callback, formState]);

  return (
    <div className="page-register-v3 layout-full">
      <div className="page vertical-align">
        <div className="page-content">
          <div className="text-center">
            <a href={t("HOMEPAGE")}>
              <img
                className="brand-img logo"
                height="250"
                src={logoTransparentWhite}
                alt="logo"
              />
            </a>
          </div>
          <div className="row justify-content-md-center">
            <form className="col-lg-4" onSubmit={handleSubmit(onSubmit)}>
              <Panel title={t("NUM_ANALYSIS")}>
                <h6>{t("FAV_NAME")}</h6>
                <InputField
                  icon="wb-user"
                  fieldName={t("FIRSTNAME")}
                  register={() => register("name", analNameValidator)}
                  message={errors.name?.message}
                />
                <InputField
                  icon="wb-user"
                  fieldName={t("LASTNAME")}
                  register={() => register("lastname", analNameValidator)}
                  message={errors.lastname?.message}
                />
                <InputField
                  icon="wb-calendar"
                  fieldName={t("BIRTH_DATE")}
                  register={() => register("date", dateValidator)}
                  message={errors.date?.message}
                />
                {comfortNameFieldsShown && (
                  <div>
                    <h6>{t("BIRTHNAME_ALT_NAME")}</h6>
                    <InputField
                      icon="wb-user"
                      fieldName={t("FIRSTNAME")}
                      register={() => register("altName", altNameValidator)}
                      message={errors.altName?.message}
                    />
                    <InputField
                      icon="wb-user"
                      fieldName={t("LASTNAME")}
                      register={() =>
                        register("altLastname", altLastnameValidator)
                      }
                      message={errors.altLastname?.message}
                    />
                  </div>
                )}
                <div
                  role="link"
                  onClick={() =>
                    setComfortNameFieldsShown(!comfortNameFieldsShown)
                  }
                >
                  <h6 className="linkText">
                    {comfortNameFieldsShown
                      ? t("HIDE_COMPARE_NAME")
                      : t("SHOW_COMPARE_NAME")}
                  </h6>
                </div>
                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                  disabled={isSubmitBtnDisabled}
                >
                  {t("START")}
                </button>
                <div className="InputForm__options">
                  <Link to="/userHome">
                    <h6>{t("SIGN_IN")}</h6>
                  </Link>
                  <Link to="/register">
                    <h6>{t("REGISTER")}</h6>
                  </Link>
                </div>
              </Panel>
            </form>
            {/* <FormBase
              id="novalidatedform"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
              noValidate
            >
              <FormBase.Title>{t("NUM_ANALYSIS")}</FormBase.Title>
              <FormBase.Divider />
              <FormBase.Input
                name="name"
                type="text"
                label={t("FAV_NAME")}
                form="novalidatedform"
                placeholder={t("FIRSTNAME")}
                register={() => register("name", analNameValidator)}
                message={errors.name?.message}
              />
              <div
                className="form-group-wrap"
                style={{ display: "flex", gap: "25px" }}
              >
                <FormBase.Input
                  type="text"
                  name="lastname"
                  placeholder={t("LASTNAME")}
                  register={() => register("lastname", analNameValidator)}
                  message={errors.lastname?.message}
                />
                // Datepicker input wrapped with react-hook-from controller
                <Controller
                  control={control}
                  name="date"
                  rules={dateValidator}
                  render={({ field: { value, onChange, ref, name } }) => (
                    <FormBase.DateInput
                      style={{ marginLeft: "auto", maxWidth: "150px" }}
                      selected={value}
                      dateFormat="dd.MM.yyyy"
                      placeholderText={t("BIRTH_DATE")}
                      onChange={date => onChange(date)}
                      inputRef={elem => {
                        elem && ref(elem.input);
                      }}
                      name={name}
                      message={errors.date?.message}
                    />
                  )}
                />
              </div>
              <div
                className="form-group-wrap"
                style={{ display: "flex", gap: "25px" }}
              >
                <FormBase.Input
                  type="text"
                  autoComplete="off"
                  // placeholder={t("OPTIONAL")}
                  label={t("BIRTHNAME_ALT")}
                  register={() => register("altName", altNameValidator)}
                  message={errors.altName?.message}
                  borderRequired={isAltNameReq && !formState.altName.length}
                />
                <FormBase.Input
                  type="text"
                  autoComplete="off"
                  label={t("NAME_ALT")}
                  // placeholder={t("OPTIONAL")}
                  register={() => register("altLastname", altLastnameValidator)}
                  message={errors.altLastname?.message}
                  borderRequired={
                    isAltSurnameReq && !formState.altLastname.length
                  }
                />
              </div>

              <FormBase.Btn type="submit" disabled={isSubmitBtnDisabled}>
                {t("START")}
              </FormBase.Btn>
              <FormBase.Divider />

               // show links only for unauthorized users 
              {!User?.user && (
                <>
                  <FormBase.Text>{t("LOGIN_TO_SAVE_ANALYS")}</FormBase.Text>
                  <FormBase.Text>
                    <Link to="/login">{t("SIGN_IN")}</Link> oder{" "}
                    <Link to="/register">{t("REGISTER")}</Link>
                  </FormBase.Text>
                </>
              )}
            </FormBase> */}
          </div>
        </div>
      </div>
    </div>
  );
};

AnalysisInput.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(AnalysisInput);
