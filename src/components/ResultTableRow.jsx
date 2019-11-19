import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/ResultTableRow.css';

// identifiers for row types
export const ROW_TYPE_ID_CUSTOM = 'customRow';

// identifiers for results
export const TYPE_ID_NUMBER = 'number';
export const TYPE_ID_LIST = 'list';
export const TYPE_ID_MATRIX = 'matrix';

/**
 * row rendering a single row item of an analysis result
 */
class ResultTableRow extends Component {
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
                resultItem.name
                + resultItem.numberId
                + rowIndex
                + resultItem.result.values[rowIndex]
              }
            >
              {[...Array(matrixDimensions.cols)].map((colItem, colIndex) => {
                // determining current index composed of cols and rows
                const currentIndex = rowIndex * matrixDimensions.cols + colIndex;

                // checking if index is highlighted
                const highlighted = resultItem.result.highlighted.indexOf(currentIndex) > -1;

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
    return resultItem.result.list.map((item) => ` ${item}`);
  }

  /**
   * renders the cells of a custom item
   */
  renderCustomRow(rowItem, compareRowItem) {
    // determining if the current row is unlocked
    const locked = rowItem.values[rowItem.descriptionTextIndex].length === 0;

    // rendering name, value and action columns
    return (
      <tr
        key={rowItem.numberId}
        id={rowItem.numberId}
        className={rowItem.highlighted ? 'tableRow--highlighted' : ''}
      >
        <td className="table--bold tableRow__name">
          {rowItem.values[rowItem.nameIndex]}
        </td>
        <td className="table--bold">{rowItem.values[rowItem.valueIndex]}</td>
        {compareRowItem && (
          <td className="table--bold">
            {compareRowItem.values[compareRowItem.valueIndex]}
          </td>
        )}
        <td>
          <button
            onClick={() => !locked && this.props.onTextDetailClick(rowItem.numberId)
            }
          >
            {locked ? 'Locked' : 'Play'}
          </button>
        </td>
      </tr>
    );
  }

  /**
   * renders a default cell
   */
  renderDefaultRow(rowItem, compareRowItem) {
    // rendering content based on number type
    let contentColumn;
    let compareContentColumn;
    if (rowItem.result.type === TYPE_ID_NUMBER) {
      contentColumn = rowItem.result.value;
      compareContentColumn = compareRowItem && compareRowItem.result.value;
    } else if (rowItem.result.type === TYPE_ID_LIST) {
      contentColumn = this.renderResultList(rowItem);
      compareContentColumn = compareRowItem && this.renderResultList(compareRowItem);
    } else if (rowItem.result.type === TYPE_ID_MATRIX) {
      contentColumn = this.renderResultMatrix(rowItem);
      compareContentColumn = compareRowItem && this.renderResultMatrix(compareRowItem);
    }

    // determining if the current row is unlocked
    const locked = rowItem.descriptionText.length === 0;

    // returning standard row
    return (
      <tr
        key={rowItem.numberId}
        id={rowItem.numberId}
        className={rowItem.highlighted ? 'tableRow--highlighted' : ''}
      >
        <td className="table--bold tableRow__name">{rowItem.name}</td>
        <td className="table--bold">{contentColumn}</td>
        {compareContentColumn && (
          <td className="table--bold">{compareContentColumn}</td>
        )}
        <td>
          <button
            onClick={() => !locked && this.props.onTextDetailClick(rowItem.numberId)
            }
          >
            {locked ? 'Locked' : 'Play'}
          </button>
        </td>
      </tr>
    );
  }

  render() {
    // getting item and compare item from passed props
    const { item, compareItem } = this.props;

    // render custom or default row based on type
    if (item.type === ROW_TYPE_ID_CUSTOM) {
      return this.renderCustomRow(item, compareItem);
    }
    return this.renderDefaultRow(item, compareItem);
  }
}

// propTypes
ResultTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  onTextDetailClick: PropTypes.func.isRequired,
  rowIndex: PropTypes.number.isRequired,
};

export default ResultTableRow;
