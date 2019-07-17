import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BuyButton from './AnalysisBuyButton';

import '../styles/AnalysisTableRow.css';

const SHORT_TYPE = 'persoenlichkeit_kurz';
const LONG_TYPE  = 'persoenlichkeit_lang';

/**
 * table view rendering a group passed as props
 */
class AnalysisTableRow extends Component {
  static propTypes = {
    analysis: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    showHandler: PropTypes.func,
    deleteHandler: PropTypes.func,
  };

  static defaultProps = {
    showHandler: () => {},
    deleteHandler: () => {},
  };

  /**
   * default render -> renders the table row with analysis information
   */
  render() {
    const { analysis } = this.props;
    return (
      <tr key={analysis.id}>
        <td className="AnalysisTableRow--analysisNameCell">
          {analysis.name}
        </td>
        <td className="AnalysisTableRow--analysisTypeCell">Analyse</td>
        <td colSpan={2} align="right" className="AnalysisTableRow--analysisActionCell">
          {' '}
          <button
            className="btn btn-primary btn-outline btn-sm"
            onClick={() => {
              this.props.showHandler(analysis);
            }}
          >
            Anzeigen
          </button>
          <BuyButton
            type={SHORT_TYPE}
            usedTypes={analysis.usedCreditTypes}
            typeMessage="Kurz PDF"
            onBuy={(type) => {
              if (analysis.usedCreditTypes.includes(type)) {
                this.props.onPdfDownload();
              }
              else {
                this.props.onUseCredit(type);
              }
            }}
          />
          <BuyButton
            type={LONG_TYPE}
            usedTypes={analysis.usedCreditTypes}
            typeMessage="Lange PDF"
            onBuy={(type) => {
              if (analysis.usedCreditTypes.includes(type)) {
                this.props.onPdfDownload(true);
              }
              else {
                this.props.onUseCredit(type);
              }
            }}
          />
          <button
            className="btn btn-danger btn-outline btn-sm"
            disabled={!!analysis.usedCreditType}
            onClick={() => {
              if (!analysis.usedCreditType) {
                this.props.deleteHandler(analysis.id);
              }
            }}
          >
            Löschen
          </button>
        </td>
      </tr>
    );
  }
}

export default AnalysisTableRow;
