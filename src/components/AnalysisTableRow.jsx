import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import BuyButton from "./AnalysisBuyButton";

import "../styles/AnalysisTableRow.css";

const SHORT_TYPE = "persoenlichkeit_kurz";
const LONG_TYPE = "persoenlichkeit_lang";

const AnalysisTableRow = props => {
  const { t } = useTranslation();

  const { analysis } = props;
  return (
    <tr key={analysis.id}>
      <td className="AnalysisTableRow--analysisNameCell">{analysis.name}</td>
      <td className="AnalysisTableRow--analysisTypeCell">{t("ANALYSIS")}</td>
      <td
        colSpan={2}
        align="right"
        className="AnalysisTableRow--analysisActionCell"
      >
        <button
          className="btn btn-primary btn-outline btn-sm"
          onClick={() => {
            props.showHandler(analysis);
          }}
        >
          {t("ANALYSIS")}
        </button>
        <BuyButton
          type={SHORT_TYPE}
          usedTypes={analysis.usedCreditTypes}
          typeMessage={t("SHORT_PDF")}
          onBuy={type => {
            if (analysis.usedCreditTypes.includes(type)) {
              props.onPdfDownload();
            } else {
              props.onUseCredit(type);
            }
          }}
        />
        <BuyButton
          type={LONG_TYPE}
          usedTypes={analysis.usedCreditTypes}
          typeMessage={t("LONG_PDF")}
          onBuy={type => {
            if (analysis.usedCreditTypes.includes(type)) {
              props.onPdfDownload(true);
            } else {
              props.onUseCredit(type);
            }
          }}
        />
        <button
          className="btn btn-danger btn-outline btn-sm"
          disabled={!!analysis.usedCreditType}
          onClick={() => {
            if (!analysis.usedCreditType) {
              props.deleteHandler(analysis.id);
            }
          }}
        >
          {t("DELETE")}
        </button>
      </td>
    </tr>
  );
};

AnalysisTableRow.propTypes = {
  analysis: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  showHandler: PropTypes.func,
  deleteHandler: PropTypes.func
};

AnalysisTableRow.defaultProps = {
  showHandler: () => {},
  deleteHandler: () => {}
};

export default AnalysisTableRow;
