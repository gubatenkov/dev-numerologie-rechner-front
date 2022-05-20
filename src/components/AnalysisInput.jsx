import moment from "moment";
import PropTypes from "prop-types";
import queryString from "querystring";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";

import "../styles/InputForm.css";
import "../styles/AnalysisInput.scss";

import Header from "./Header";
import Sidebar from "./SidebarD2";
import AnalBlock from "./AnalBlock";
import Promo from "./Sections/Promo";
import AnalForm from "./Forms/AnalForm";
import FooterHoriz from "./FooterHoriz";
import PopupBase from "./Popups/PopupBase";
import useAnalysis from "../utils/useAnalysis";
import { useUser } from "../contexts/UserContext";
import BoxWithCards from "./BoxWithCards/BoxWithCards";

const AnalysisInput = props => {
  const User = useUser();
  const { t } = useTranslation();
  const [startAnalysis] = useAnalysis();
  const [anals, setAnals] = useState(null);
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

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

  const openPopup = () => {
    setPopupVisibility(true);
  };

  const closePopup = () => {
    setPopupVisibility(false);
  };

  const onSubmit = data => {
    const { name, lastname, altname, altlastname, day, month, year } = data;
    const formatedDate = moment(`${year}-${month}-${day}`).format("DD.MM.YYYY");
    startAnalysis(name, lastname, altname, altlastname, formatedDate);
  };

  return (
    <>
      <div className="anal-input page-register-v3 layout-full">
        <Header
          user={User?.user}
          plusBtn={openPopup}
          isSidebarVisible={isSidebarVisible}
          onOpen={() => setSidebarVisible(true)}
          onClose={() => setSidebarVisible(false)}
        />
        <Promo className="promo__desktop-hidden" />
        <Sidebar
          isVisible={isSidebarVisible}
          openPopup={() => setPopupVisibility(true)}
        />
        <section className="anal">
          <div className="container">
            <div className="anal-inner">
              <h1 className="anal-title">{t("ANAL_TITLE_TEXT")}</h1>
              <div className="anal-form__wrapper">
                <AnalForm onSubmit={onSubmit} />
              </div>
            </div>
            {User?.user?.analyses?.length > 0 && (
              <AnalBlock text={t("PREVANALS_BLOCK_TEXT")} anals={anals} />
            )}
          </div>
        </section>
        {/* <Results /> */}
        <Promo className="promo__mobile-hidden" />
        <FooterHoriz />
        {isPopupVisible && (
          <PopupBase
            name="Pricing"
            title="Read all texts of numerological analysis!"
            onClose={closePopup}
            children={<BoxWithCards />}
          />
        )}
      </div>
    </>
  );
};

AnalysisInput.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(AnalysisInput);
