import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/AnalysisTableRow.css';

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
    return (
      <tr key={this.props.analysis.id}>
        <td className="AnalysisTableRow--analysisNameCell">
          {this.props.analysis.name}
        </td>
        <td className="AnalysisTableRow--analysisTypeCell">Analyse</td>
        <td className="AnalysisTableRow--analysisActionCell">
          {' '}
          <button
            className="btn btn-primary btn-outline btn-sm"
            onClick={() => {
              this.props.showHandler(this.props.analysis);
            }}
          >
            Anzeigen
          </button>
          <button
            className="btn btn-danger btn-outline btn-sm"
            onClick={() => {
              this.props.deleteHandler(this.props.analysis.id);
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
