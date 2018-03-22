import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/ResultTableRow.css';

// identifiers for row types
const ROW_TYPE_ID_CUSTOM = 'customRow';

// identifiers for results
const TYPE_ID_NUMBER = 'number';
const TYPE_ID_LIST = 'list';
const TYPE_ID_MATRIX = 'matrix';

// chars in description preview
const LENGTH_DESCRIPITON_PREVIEW = 50;

/**
 * row rendering a single row item of an analysis result
 */
class ResultTableRow extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onTextDetailClick: PropTypes.func.isRequired,
    rowIndex: PropTypes.number.isRequired,
  };

  /**
   * returns the row representation of the text passed by the server
   */
  getTextRepresentation(rowText) {
    let rowTextRepresentation = null;
    if (rowText && rowText && rowText.length > 0) {
      // removing html tags for preview
      rowTextRepresentation = rowText.replace(/<(.|\n)*?>/g, '');
      rowTextRepresentation = [
        `${rowTextRepresentation.substring(
          0,
          LENGTH_DESCRIPITON_PREVIEW,
        )}...  `,
        <a role="link" key="readIndicator" onClick={this.handleMoreClick}>
          Lesen
        </a>,
      ];
    }
    return rowTextRepresentation;
  }

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
                resultItem.id +
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
   * renders the cells of a custom item
   */
  renderCustomRow(rowItem) {
    // determining last element to align properly
    const lastIndex = rowItem.values.length - 1;
    return (
      <tr
        key={rowItem.id}
        className={rowItem.highlighted ? 'tableRow--highlighted' : ''}
      >
        {rowItem.values.map((value, index) => {
          // defining style of cell
          let cellStyle = '';
          let cellValue = value;
          if (index === lastIndex) {
            cellStyle += 'tableRow__text';
            cellValue = this.getTextRepresentation(value);
          }
          if (index === 0) {
            cellStyle += 'tableRow__name';
          }
          return (
            <td className={cellStyle} key={rowItem.id + index + cellValue}>
              {cellValue}
            </td>
          );
        })}
      </tr>
    );
  }

  /**
   * renders a default cell
   */
  renderDefaultRow(rowItem) {
    // rendering content based on number type
    let contentColumn;
    if (rowItem.result.type === TYPE_ID_NUMBER) {
      contentColumn = rowItem.result.value;
    } else if (rowItem.result.type === TYPE_ID_LIST) {
      contentColumn = this.renderResultList(rowItem);
    } else if (rowItem.result.type === TYPE_ID_MATRIX) {
      contentColumn = this.renderResultMatrix(rowItem);
    }

    return (
      <tr
        key={rowItem.id}
        className={rowItem.highlighted ? 'tableRow--highlighted' : ''}
      >
        <td className="table--bold tableRow__name">{rowItem.name}</td>
        <td className="tableRow__id ">{rowItem.id}</td>
        <td className="table--bold">{contentColumn}</td>
        <td className="tableRow__text">
          {this.getTextRepresentation(rowItem.descriptionText)}
        </td>
      </tr>
    );
  }

  render() {
    // getting item from passed props
    const { item } = this.props;

    // render custom or default row based on type
    if (item.type === ROW_TYPE_ID_CUSTOM) {
      return this.renderCustomRow(item);
    }
    return this.renderDefaultRow(item);
  }
}

export default ResultTableRow;
