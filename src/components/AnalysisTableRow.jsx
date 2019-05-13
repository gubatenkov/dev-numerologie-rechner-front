import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import '../styles/AnalysisTableRow.css';

const LONG_TYPE = 'persoenlichkeit_lang';

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
          <Button variant="secondary" size="sm" disabled>
            <i className="fa fa-icon fa-shopping-cart" />
            {' '}
            Kurz PDF | <strong>Buy</strong>
          </Button>
          <Button
            variant={analysis.usedCreditType === LONG_TYPE ? 'success' : 'secondary'}
            size="sm"
            onClick={() => {
              if (analysis.usedCreditType === LONG_TYPE) {
                this.props.onPdfDownload();
              }
              else {
                this.props.onUseCredit('persoenlichkeit_lang');
              }
            }}
          >
            {
              analysis.usedCreditType === LONG_TYPE
                ? <i className="fa fa-icon fa-check-circle-o" />
                : <i className="fa fa-icon fa-shopping-cart" />
            }
            {' '}
            Lange PDF {
              analysis.usedCreditType === LONG_TYPE
                ? null
                : <Fragment> | <strong>Buy</strong></Fragment>
            }
          </Button>
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
