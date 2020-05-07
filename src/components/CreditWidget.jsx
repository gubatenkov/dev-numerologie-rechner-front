import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Panel from "./Panel";
import Card from "./Card";

import "../styles/CreditWidget.css";

const CreditWidget = props => {
  const { t } = useTranslation();

  return (
    <Panel
      title="Guthaben"
      actions={[
        <a href="" key="addCredits" onClick={props.handleBuyCredits}>
          {t("BUY")}
        </a>
      ]}
    >
      <div className="card-columns creditCardColumns">
        {props.credits.map(credit => (
          <Card
            key={credit.type.name}
            title={credit.type.name}
            body={credit.value}
            description={credit.type.description}
          />
        ))}
      </div>
    </Panel>
  );
};

CreditWidget.propTypes = {
  credits: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      }).isRequired,
      value: PropTypes.number.isRequired
    })
  ).isRequired,
  handleBuyCredits: PropTypes.func.isRequired
};

export default CreditWidget;
