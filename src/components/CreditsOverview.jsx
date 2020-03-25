import React from "react";
import { LONG_TYPE, SHORT_TYPE } from "./AnalysisListEntry";
import "../styles/CreditsOverview.scss";

const CreditsOverview = props => {
  // const smallVersionCredits = props.credits.
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
          <h3>Persönlichkeit PDF Kurzversion</h3>
          <div className="akb-credits-wrapper">
            <div>{shortCredits ? shortCredits : 0}</div>
          </div>
        </div>
        <div className="akb-credits-box">
          <h3>Persönlichkeit PDF Langversion</h3>
          <div className="akb-credits-wrapper">
            <div>{longCredits ? longCredits : 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditsOverview;