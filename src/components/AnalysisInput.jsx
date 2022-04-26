import * as yup from "yup";
import moment from "moment";
import PropTypes from "prop-types";
import queryString from "querystring";
import ToastNotifications from "cogo-toast";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
// import {  Controller } from "react-hook-form";

import "../styles/InputForm.css";
import "../styles/AnalysisInput.scss";

// import Panel from "./Panel";
// import InputField from "./InputField";

// import FormBase from "./Forms/FormBase";
// import { useUser } from "../contexts/UserContext";
import useValidators from "../utils/useValidators";
// import logoTransparentWhite from "../images/logo_weiss_trans.png";
// import DropdownDateSelect from "./DropdownDateSelect";
import Header from "./Header";
import Typography from "./Typography";
import AnalTypeDropdown from "./AnalTypeDropdown";
import Input from "./Input";
import BaseBtn from "./Buttons/BaseBtn/BaseBtn";
import FooterHoriz from "./FooterHoriz";

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
  // const [isAltNameReq, setIsAltNameReq] = useState(false);
  // const [isAltSurnameReq, setIsAltSurnameReq] = useState(false);
  const [comfortNameFieldsShown, setComfortNamesFieldsShown] = useState(false);
  // const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(false);
  const {
    // control,
    register,
    handleSubmit,
    // watch,
    formState: { errors }
  } = useForm({ mode: "all" });
  const {
    analNameValidator,
    yearValidator,
    altNameValidator,
    altLastnameValidator
  } = useValidators();
  // const formState = watch();

  // useEffect(() => {
  //   const { altname, altlastname } = formState;
  //   if (altname) setIsAltSurnameReq(true);
  //   else setIsAltSurnameReq(false);
  //   if (altlastname) setIsAltNameReq(true);
  //   else setIsAltNameReq(false);
  // }, [formState]);

  useEffect(() => {
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

  // const callback = useCallback(() => {
  //   const checkSubmitState = () => {
  //     const { altname, altlastname, name, lastname } = formState;
  //     if (
  //       name &&
  //       lastname &&
  //       formState.day &&
  //       formState.month &&
  //       formState.year &&
  //       !isAltNameReq &&
  //       !isAltSurnameReq
  //     ) {
  //       setIsSubmitBtnDisabled(false);
  //     } else if (
  //       name &&
  //       lastname &&
  //       formState.day &&
  //       formState.month &&
  //       formState.year &&
  //       isAltNameReq &&
  //       altname &&
  //       isAltSurnameReq &&
  //       altlastname
  //     ) {
  //       setIsSubmitBtnDisabled(false);
  //     } else {
  //       setIsSubmitBtnDisabled(true);
  //     }
  //   };
  //   checkSubmitState();
  // }, [formState, isAltNameReq, isAltSurnameReq]);

  // useEffect(() => {
  //   callback();
  // }, [callback, formState]);

  const onBlur = e => {
    // add zero to day or month input if val < 10
    if (e.target.value < 10 && e.target.value > 0) {
      e.target.value = `0${e.target.value}`;
    }
  };

  const changeInput = (e, maxLen = 2) => {
    if (e.target.value.length > maxLen) {
      // cut input to maxLen
      e.target.value = e.target.value.slice(0, maxLen);
    } else if (
      e.target.name === "day" &&
      (e.target.value > 31 || e.target.value < 1)
    ) {
      e.target.value = "";
    } else if (
      e.target.name === "month" &&
      (e.target.value > 12 || e.target.value < 1)
    ) {
      e.target.value = "";
    }
  };

  const onSubmit = data => {
    const { name, lastname, altname, altlastname, day, month, year } = data;
    const formatedDate = moment(`${year}-${month}-${day}`).format("DD.MM.YYYY");
    startAnalysis(name, lastname, altname, altlastname, formatedDate);
  };

  return (
    <div className="page-register-v3 layout-full">
      <section className="anal">
        <Header />
        <div className="container">
          <div className="anal-inner">
            <Typography as="h1" fs="46px" fw="900" color="#fff" lh="69px">
              Numerology Calculator
            </Typography>

            <form
              className="anal-form"
              onSubmit={handleSubmit(data => onSubmit(data))}
            >
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
                    className="transparent-btn transparent-btn--plus"
                    onClick={() =>
                      setComfortNamesFieldsShown(!comfortNameFieldsShown)
                    }
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

                <BaseBtn className="blue-btn" type="submit">
                  Analysis
                </BaseBtn>
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
                      register={() =>
                        register("altlastname", altLastnameValidator)
                      }
                      message={errors.altlastname && errors.altlastname.message}
                    />
                  </div>
                  <div />
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
      <section className="promo">
        <div className="container">
          <div className="promo-topcorners">
            <div className="promo-inner">
              <div className="promo__left">
                <Typography
                  as="h2"
                  color="#313236"
                  lh="69px"
                  fs="46px"
                  fw="900"
                  capitalize
                >
                  Get to know yourself with psychomerological analysis
                </Typography>
              </div>
              <div className="promo__right">
                <Typography as="p" color="#323232" lh="25px" fs="18px" fw="400">
                  Activate all texts of the <strong>extended</strong> version of
                  the numeroscope of your current calculation for online reading
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterHoriz />
      {/*<div className="page vertical-align">
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
            <form
              className="col-lg-4"
              onSubmit={handleSubmit(data => onSubmit(data, date))}
            >
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
                 <Controller
                  control={control}
                  name="date"
                  rules={dateValidator}
                  render={({ field: { value, onChange, ref, name } }) => (
                    <FormBase.DateInput
                      style={{
                        marginLeft: "auto"
                      }}
                      selected={value}
                      dateFormat="dd.MM.yyyy"
                      placeholderText={t("BIRTH_DATE")}
                      onChange={date => onChange(date)}
                      inputRef={elem => {
                        elem && ref(elem.input);
                      }}
                      name={name}
                      message={errors.date?.message}
                      autoComplete="off"
                    />
                  )}
                /> 
                 <DropdownDateSelect date={date} setDate={setDate} />
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
            <FormBase
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
            </FormBase> 
          </div>
        </div>
      </div> */}
    </div>
  );
};

AnalysisInput.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(AnalysisInput);
