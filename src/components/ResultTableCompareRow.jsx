import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/ResultTableRow.css';
import '../styles/ResultTableCompareRow.css';

import {
  ROW_TYPE_ID_CUSTOM,
  TYPE_ID_NUMBER,
  TYPE_ID_LIST,
  TYPE_ID_MATRIX,
} from './ResultTableRow';

/**
 * row rendering a single row item of an analysis result
 */
class ResultTableCompareRow extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    compareItem: PropTypes.object.isRequired,
    onTextDetailClick: PropTypes.func.isRequired,
    rowIndex: PropTypes.number.isRequired,
  };

  /**
   * handles clicks on the more link of the description text
   */
  handleMoreClick = () => {
    this.props.onTextDetailClick(this.props.rowIndex);
  };

  /**
   * renders a result matrix as content of the table
   * @param {} item the item of type 'matrix'
   */
  renderResultMatrix(resultItem) {
    // extracting dimensions
    const matrixDimensions = resultItem.result.dimensions;

    // rendering and returning matrix
    return (
      <table className="table table-bordered tableRow__matrix">
        <tbody>
          {[...Array(matrixDimensions.rows)].map((rowItem, rowIndex) => (
            <tr
              key={
                resultItem.name +
                resultItem.numberId +
                rowIndex +
                resultItem.result.values[rowIndex]
              }
            >
              {[...Array(matrixDimensions.cols)].map((colItem, colIndex) => {
                // determining current index composed of cols and rows
                const currentIndex =
                  rowIndex * matrixDimensions.cols + colIndex;

                // checking if index is highlighted
                const highlighted =
                  resultItem.result.highlighted.indexOf(currentIndex) > -1;

                // returning cell for element
                return (
                  <td
                    key={resultItem.name + currentIndex}
                    className={highlighted ? ' ResultTable--highlighted' : ''}
                  >
                    <div className="content">
                      {resultItem.result.values[currentIndex]
                        ? resultItem.result.values[currentIndex]
                        : '-'}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  /**
   * renders a readable represetnation of the list result item type
   * @param {*} resultItem the received result item of type list
   */
  renderResultList(resultItem) {
    return resultItem.result.list.map(item => ` ${item}`);
  }

  /**
   * renders the custom compare row
   */
  renderCustomRowCompare(rowItem, compareItem) {
    // getting compare indices
    const { compareIndices } = rowItem;

    // removing name and description from values
    const rowValuesItem = rowItem.values.filter((item, index) =>
      compareIndices.includes(index));

    const rowValueCompare = compareItem.values.filter((item, index) =>
      compareIndices.includes(index));
    rowValueCompare.shift();

    // concatinating values for both
    const rowValues = rowValuesItem.concat(rowValueCompare);

    return (
      <tr key={rowItem.numberId} className="">
        {rowValues.map((value, index) => {
          // defining style of cell
          let cellStyle = 'tableRow__customCompareEntry';
          if (index === 0) {
            cellStyle += 'table--bold';
          }
          return (
            <td className={cellStyle} key={rowItem.numberId + index + value}>
              {value}
            </td>
          );
        })}
        <td className="tableRow__detailsCompare"> Details </td>
      </tr>
    );
  }

  /**
   * renders a default cell
   */
  renderDefaultRowCompare(rowItem, compareItem) {
    // rendering content based on number type
    let contentColumn;
    if (rowItem.result.type === TYPE_ID_NUMBER) {
      contentColumn = rowItem.result.value;
    } else if (rowItem.result.type === TYPE_ID_LIST) {
      contentColumn = this.renderResultList(rowItem);
    } else if (rowItem.result.type === TYPE_ID_MATRIX) {
      contentColumn = this.renderResultMatrix(rowItem);
    }

    // getting compare item data
    let contentColumnCompare;
    if (compareItem.result.type === TYPE_ID_NUMBER) {
      contentColumnCompare = compareItem.result.value;
    } else if (compareItem.result.type === TYPE_ID_LIST) {
      contentColumnCompare = this.renderResultList(compareItem);
    } else if (compareItem.result.type === TYPE_ID_MATRIX) {
      contentColumnCompare = this.renderResultMatrix(compareItem);
    }

    return (
      <tr
        key={compareItem.numberId}
        className={compareItem.highlighted ? 'tableRow--highlighted' : ''}
      >
        <td className="table--bold tableRow__nameCompare">
          {rowItem.numberId}
        </td>
        <td className="table--bold tableRow__comparevalue">{contentColumn}</td>
        <td className="table--bold tableRow__comparevalue">
          {contentColumnCompare}
        </td>
        <td className="tableRow__detailsCompare"> Details </td>
      </tr>
    );
  }

  render() {
    // getting item from passed props
    const { item, compareItem } = this.props;

    // render custom or default row based on type
    if (item.type === ROW_TYPE_ID_CUSTOM) {
      return this.renderCustomRowCompare(item, compareItem);
    }
    return this.renderDefaultRowCompare(item, compareItem);
  }
}

export default ResultTableCompareRow;
