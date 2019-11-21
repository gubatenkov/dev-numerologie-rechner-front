import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/ResultTableRow.css';

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

  render() {
    // getting item and compare item from passed props
    const { item, compareItem } = this.props;

    // rendering content for result and compare column based on number type
    let contentColumn;
    let compareContentColumn;
    if (item.result.type === TYPE_ID_NUMBER) {
      contentColumn = item.result.value;
      compareContentColumn = compareItem && compareItem.result.value;
    } else if (item.result.type === TYPE_ID_LIST) {
      contentColumn = this.renderResultList(item);
      compareContentColumn = compareItem && this.renderResultList(compareItem);
    } else if (item.result.type === TYPE_ID_MATRIX) {
      contentColumn = this.renderResultMatrix(item);
      compareContentColumn = compareItem && this.renderResultMatrix(compareItem);
    }

    // determining if the current row is unlocked
    const rowIsLocked = item.descriptionText.length === 0;

    // returning table row
    return (
      <tr
        key={item.numberId}
        id={item.numberId}
        className={item.highlighted ? 'tableRow--highlighted' : ''}
      >
        <td className="table--bold tableRow__name">{item.name}</td>
        <td className="table--bold">{contentColumn}</td>
        {compareContentColumn && (
          <td className="table--bold">{compareContentColumn}</td>
        )}
        <td>
          <button
            onClick={() => !rowIsLocked && this.props.onTextDetailClick(item.numberId)
            }
          >
            {rowIsLocked ? 'Locked' : 'Read'}
          </button>
        </td>
      </tr>
    );
  }
}

// propTypes
ResultTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  onTextDetailClick: PropTypes.func.isRequired,
  rowIndex: PropTypes.number.isRequired,
};

export default ResultTableRow;
