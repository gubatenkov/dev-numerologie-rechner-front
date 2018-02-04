import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ResultTableRow from './ResultTableRow';
import '../styles/ResultTable.css';

/**
 * table capable of rendering calculation and number results
 * returned from the server
 */
class ResultTable extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  /**
   * renders the heading of the table
   */
  renderHeadings() {
    return (
      <thead>
        <tr>
          {this.props.data.headings.map((heading, index) => (
            <th key={heading || this.props.data.name + index}>{heading}</th>
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
      <table
        key={`ResultTable ${this.props.data.name}`}
        className="table table-striped ResultTable--non-selectable ResultTable--non-printable"
      >
        {this.props.data.headings &&
          this.renderHeadings(this.props.data.headings)}
        <tbody>
          {this.props.data.numbers.map(item => (
            <ResultTableRow key={`ResultTableRow ${item.id}`} item={item} />
          ))}
        </tbody>
      </table>,
      <h3 className="ResultTable--printWatermark" key="watermark">
        Die Resultate können nur mit Druckpaket ausgedruckt werden.
      </h3>,
    ];
  }
}

export default ResultTable;
