import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ResultTableCompareRow from './ResultTableCompareRow';
import '../styles/ResultTableCompare.css';

/**
 * table capable of rendering calculation and number results
 * returned from the server
 */
class ResultTableCompare extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    dataCompare: PropTypes.object.isRequired,
    dataKey: PropTypes.string.isRequired,
    handleTextDetailClick: PropTypes.func.isRequired,
  };

  handleTextDetailClick = (index) => {
    this.props.handleTextDetailClick(this.props.dataKey, index);
  };

  /**
   * renders headings of the compare table
   */
  renderCompareHeadings() {
    if (this.props.data.numbers.length < 1) {
      return null;
    }

    // getting compare headers => the ones relevant to display for compare
    const { compareIndices } = this.props.data.numbers[0];

    // filtering given headers
    const filteredHeaderData = this.props.data.headings.filter((item, index) =>
      compareIndices.includes(index));

    const filteredHeaderCompareData = this.props.dataCompare.headings.filter((item, index) => compareIndices.includes(index));
    filteredHeaderCompareData.shift();

    const headers = filteredHeaderData.concat(filteredHeaderCompareData);

    // rendering headers
    return (
      <thead>
        <tr>
          {headers.map((heading, index) => (
            <th
              className={index !== 0 ? 'ResultTable--centered' : null}
              key={`${heading} ${index}` || this.props.data.name + index}
            >
              {heading}
            </th>
          ))}
          <th />
        </tr>
      </thead>
    );
  }

  /**
   * default render method rendering content objects based on their type
   */
  render() {
    // determining number of columns if compare
    const firstRowItem = this.props.data.numbers[0];
    const numberOfValueColumns = firstRowItem.compareIndices
      ? firstRowItem.compareIndices.length - 1
      : null;

    return [
      <table
        key={`ResultTable ${this.props.data.name}`}
        className="ResultTable table table-striped ResultTable--non-selectable ResultTable--non-printable"
      >
        {firstRowItem.type === 'customRow' && (
          <colgroup>
            <col className="tableRow__customCompareNameGroup" />
            <col
              span={numberOfValueColumns}
              className="tableRow__customCompareResultGroup"
            />
            <col
              span={numberOfValueColumns}
              className="tableRow__customCompareResultGroup"
            />
            <col className="tableRow__customCompareActionGroup" />
          </colgroup>
        )}
        {this.props.data.headings && this.renderCompareHeadings()}
        <tbody>
          {this.props.data.numbers.map((item, index) => (
            <ResultTableCompareRow
              key={`ResultTableCompareRow ${item.numberId}`}
              item={item}
              compareItem={this.props.dataCompare.numbers[index]}
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

export default ResultTableCompare;
