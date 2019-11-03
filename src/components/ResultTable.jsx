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
    dataKey: PropTypes.string.isRequired,
    handleTextDetailClick: PropTypes.func.isRequired,
  };

  handleTextDetailClick = (index) => {
    this.props.handleTextDetailClick(this.props.dataKey, index);
  };

  /**
   * renders the heading of the table
   */
  renderHeadings() {
    // determining last header element to align properly
    const lastIndex = this.props.data.headings.length - 1;
    return (
      <thead>
        <tr>
          {this.props.data.headings.map((heading, index) => {
            // setting style based on index
            let headingStyleClass = '';
            if (index === 0) {
              headingStyleClass += 'tableRow__name';
            } else if (index === lastIndex) {
              headingStyleClass += 'tableRow__text';
            }

            return (
              <th
                key={heading || this.props.data.name + index}
                className={headingStyleClass}
              >
                {heading}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }

  /**
   * default render method rendering content objects based on their type
   */
  render() {
    console.log('Result Table Render');
    console.log(this.props);
    return [
      <table
        key={`ResultTable ${this.props.data.name}`}
        className="ResultTable table table-striped ResultTable--non-selectable ResultTable--non-printable"
      >
        {this.props.data.headings && this.renderHeadings()}
        <tbody>
          {this.props.data.numbers.map((item, index) => (
            <ResultTableRow
              key={`ResultTableRow ${item.numberId}`}
              item={item}
              rowIndex={index}
              onTextDetailClick={this.handleTextDetailClick}
            />
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
