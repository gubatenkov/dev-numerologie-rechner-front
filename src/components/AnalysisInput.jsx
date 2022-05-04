import * as yup from "yup";
import moment from "moment";
import PropTypes from "prop-types";
import queryString from "querystring";

import React, { useEffect, useState } from "react";
import ToastNotifications from "cogo-toast";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "../styles/InputForm.css";
import "../styles/AnalysisInput.scss";

import Header from "./Header";
import AnalBlock from "./AnalBlock";
import Promo from "./Sections/Promo";
import AnalForm from "./Forms/AnalForm";
import FooterHoriz from "./FooterHoriz";
import { useUser } from "../contexts/UserContext";

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
  const User = useUser();
  const { t } = useTranslation();
  const [anals, setAnals] = useState(null);

  useEffect(() => {
    if (User.user && User.user.analyses) {
      setAnals(User.user.analyses);
    }
  }, [User.user]);

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

  const onSubmit = data => {
    const { name, lastname, altname, altlastname, day, month, year } = data;
    const formatedDate = moment(`${year}-${month}-${day}`).format("DD.MM.YYYY");
    startAnalysis(name, lastname, altname, altlastname, formatedDate);
  };

  return (
    <div className="page-register-v3 layout-full">
      <section className="anal">
        <Header user={User?.user} />

        <div className="container">
          <div className="anal-inner">
            <h1 className="anal-title">Numerology Calculator</h1>
            <div className="anal-form__wrapper">
              <AnalForm onSubmit={onSubmit} />
            </div>
          </div>
          {User?.user && <AnalBlock anals={anals} />}
        </div>
      </section>
      {/* <Results /> */}
      <Promo />
      <FooterHoriz />
    </div>
  );
};

AnalysisInput.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(AnalysisInput);
