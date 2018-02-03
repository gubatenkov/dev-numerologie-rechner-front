import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ResultTableRow from './ResultTableRow';
import '../styles/ResultTable.css';

/**
 * table capable of rendering calculation and number results
 * returned from the server
 */
class ResultTable extends Component {
  /**
   * renders the heading of the table
   */
  renderHeadings() {
    return (
      <thead>
        <tr>
          {this.props.data.headings.map(heading => (
            <th key={heading}>{heading}</th>
          ))}
        </tr>
      </thead>
    );
  }

  /**
   * default render method rendering content objects based on their type
   */
  render() {
    return [
      <table className="table table-striped ResultTable--non-selectable ResultTable--non-printable">
        {this.props.data.headings &&
          this.renderHeadings(this.props.data.headings)}
        <tbody>
          {this.props.data.numbers.map(item => (
            <ResultTableRow key={item} item={item} />
          ))}
        </tbody>
      </table>,
      <h3 className="ResultTable--printWatermark">
        Die Resultate können nur mit Druckpaket ausgedruckt werden.
      </h3>,
    ];
  }
}

/**
 * proptypes
 */
ResultTable.propTypes = {
  data: PropTypes.isRequired,
};

export default ResultTable;
