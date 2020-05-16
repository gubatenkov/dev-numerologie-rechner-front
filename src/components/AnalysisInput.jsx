import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import * as yup from "yup";
import moment from "moment";
import queryString from "querystring";
import { useTranslation } from "react-i18next";
import ToastNotifications from "cogo-toast";

import Panel from "./Panel";
import InputField from "./InputField";

import logoTransparentWhite from "../images/logo_weiss_trans.png";
import "../styles/AnalysisInput.css";
import "../styles/InputForm.css";

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

  const [firstNames, setFirstNames] = useState(null);
  const [lastNames, setLastNames] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [firstNamesComfort, setFirstNamesComfort] = useState(null);
  const [lastNameComfort, setLastNameComfort] = useState(null);

  const [comfortNameFieldsShown, setComfortNameFieldsShown] = useState(false);

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
      setFirstNames(firstNameParam);
      setLastNames(lastNameParam);
      setDateOfBirth(dateOfBirthParam);
      startAnalysis();
    }

    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const validateInput = async () => {
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

  const startAnalysis = async () => {
    if (!(await validateInput())) {
      return;
    }

    if (firstNamesComfort && lastNameComfort) {
      const firstNamesEncoded = encodeURIComponent([
        firstNames,
        firstNamesComfort
      ]);
      const lastNamesEncoded = encodeURIComponent([lastNames, lastNameComfort]);
      const dateOfBirthEncoded = encodeURIComponent(dateOfBirth);

      props.history.push(
        `/resultPersonal/${firstNamesEncoded}/${lastNamesEncoded}/${dateOfBirthEncoded}`
      );
    } else {
      const firstNamesEncoded = encodeURIComponent(firstNames);
      const lastNameEncoded = encodeURIComponent(lastNames);
      const dateOfBirthEncoded = encodeURIComponent(dateOfBirth);

      // navigating to results
      props.history.push(
        `/resultPersonal/${firstNamesEncoded}/${lastNameEncoded}/${dateOfBirthEncoded}`
      );
    }
  };

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
            <div className="col-lg-4">
              <Panel title={t("NUM_ANALYSIS")}>
                <h6>{t("FAV_NAME")}</h6>
                <InputField
                  icon="wb-user"
                  fieldName={t("FIRSTNAME")}
                  onChange={event => {
                    setFirstNames(event.target.value);
                  }}
                />
                <InputField
                  icon="wb-user"
                  fieldName={t("LASTNAME")}
                  onChange={event => {
                    setLastNames(event.target.value);
                  }}
                />
                <InputField
                  icon="wb-calendar"
                  fieldName={t("BIRTH_DATE")}
                  onChange={event => {
                    setDateOfBirth(event.target.value);
                  }}
                />
                {comfortNameFieldsShown && (
                  <div>
                    <h6>{t("BIRTHNAME_ALT_NAME")}</h6>
                    <InputField
                      icon="wb-user"
                      fieldName={t("FIRSTNAME")}
                      onChange={event => {
                        setFirstNamesComfort(event.target.value);
                      }}
                    />
                    <InputField
                      icon="wb-user"
                      fieldName={t("LASTNAME")}
                      onChange={event => {
                        setLastNameComfort(event.target.value);
                      }}
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
                  onClick={startAnalysis}
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
            </div>
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
