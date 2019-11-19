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
    name: PropTypes.string,
    numbers: PropTypes.array.isRequired,
    headings: PropTypes.array,
    showTitle: PropTypes.bool,
    sectionId: PropTypes.string.isRequired,
    handleTextDetailClick: PropTypes.func.isRequired,
  };

  handleTextDetailClick = (numberId) => {
    this.props.handleTextDetailClick(this.props.sectionId, numberId);
  };

  /**
   * renders the heading of the table
   */
  renderHeadings() {
    // determining last header element to align properly
    const lastIndex = this.props.headings.length - 1;
    return (
      <thead>
        <tr>
          {this.props.headings.map((heading, index) => {
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
    return [
      <table
        key={`ResultTable ${this.props.name}`}
        className="ResultTable table table-striped ResultTable--non-selectable ResultTable--non-printable"
      >
        {this.props.showTitle && <caption>{this.props.name}</caption>}
        {this.props.headings && this.renderHeadings()}
        <tbody>
          {this.props.numbers.map((item, index) => (
            <ResultTableRow
              key={`ResultTableRow ${item.numberId}`}
              item={item}
              compareItem={this.props.compareNumbers[index]}
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
