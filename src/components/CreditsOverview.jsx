import React from "react";
import { LONG_TYPE, SHORT_TYPE } from "./AnalysisListEntry";
import { useTranslation } from "react-i18next";
import "../styles/CreditsOverview.scss";

const CreditsOverview = props => {
  const { t } = useTranslation();
  let shortCredits = props.credits
    .filter(credit => credit.type === SHORT_TYPE)
    .map(result => result.total)[0];
  let longCredits = props.credits
    .filter(credit => credit.type === LONG_TYPE)
    .map(result => result.total)[0];
  return (
    <div className="akb-credits-overview-div">
      <h1>Guthaben</h1>
      <div className="akb-credits-div">
        <div className="akb-credits-box">
          <h3>{t("PERSONAL_SHORT_VERSION_PDF")}</h3>
          <div className="akb-credits-wrapper">
            <div>{shortCredits ? shortCredits : 0}</div>
          </div>
        </div>
        <div className="akb-credits-box">
          <h3>{t("PERSONAL_LONG_VERSION_PDF")}</h3>
          <div className="akb-credits-wrapper">
            <div>{longCredits ? longCredits : 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditsOverview;
