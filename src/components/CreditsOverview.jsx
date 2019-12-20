import React from 'react';
import { LONG_TYPE, SHORT_TYPE } from './AnalysisListEntry';
import '../styles/CreditsOverview.scss'

const CreditsOverview = props => {
  // const smallVersionCredits = props.credits.
  // result is always one entry
  let shortCredits = props.credits
    .filter(credit => credit.type === SHORT_TYPE)
    .map(result => result.total)[0];
  let longCredits = props.credits
    .filter(credit => credit.type === LONG_TYPE)
    .map(result => result.total)[0];
  console.log(props.credits);
  return (
    <div>
      <h1>Guthaben</h1>
      <div className="akb-credits-div">
        <div className="akb-credits-box">
          <h3>Pesrönlichkeit PDF Kurzversion</h3>
          <div>{shortCredits}</div>
        </div>
        <div className="akb-credits-box">
          <h3>Persönlichkeit PDF Langversion</h3>
          <div>{longCredits}</div>
        </div>
      </div>
    </div>
  );
};

export default CreditsOverview;
