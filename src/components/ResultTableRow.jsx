import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { faLock, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import IconButton from './Buttons/IconButton';

// identifiers for results
export const TYPE_ID_NUMBER = 'number';
export const TYPE_ID_LIST = 'list';
export const TYPE_ID_MATRIX = 'matrix';

const ResultTableRowStyled = styled.tr`
  height: 60px;
  box-shadow: 0 0 8px 0 rgba(50, 50, 50, 0.08);

  color: ${(props) => props.theme.darkGrey};
  font-family: ${(props) => props.theme.fontFamily};

  font-size: 20px;
  font-weight: 500;
  line-height: 30px;

  td:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  td:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  
  td {
    background-color: ${(props) => props.theme.white};
  }
`;

const NameColumn = styled.td`
  width: 50%;
  text-align: left;
  padding-left: 24px;
`;

const ResultColumn = styled.td`
  width: 40%;
  text-align: left;
`;

const ActionColumn = styled.td`
  width: 10%;
  text-align: right;
  padding-right: 12px;
`;

const MatrixTable = styled.table`
  width: 20vh !important;
  height: 20vh !important;
  text-align: center;
  margin-bottom: 0 !important;
`;

const RowIconButton = styled(IconButton)`
  height: 40px;
  width: 40px;
`;

/**
 * row rendering a single row item of an analysis result
 */

const ResultTableRow = (props) => {
  // getting item and compare item from passed props
  const { item, compareItem } = props;

  /**
   * renders a result matrix as content of the table
   * @param item the item of type 'matrix'
   */
  const renderResultMatrix = (resultItem) => {
    // extracting dimensions
    const matrixDimensions = resultItem.result.dimensions;

    // rendering and returning matrix
    return (
      <MatrixTable>
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

                // returning cell for element
                return (
                  <td key={resultItem.name + currentIndex}>
                    <div>
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
      </MatrixTable>
    );
  };

  /**
   * renders a readable represetnation of the list result item type
   * @param resultItem the received result item of type list
   */
  const renderResultList = (resultItem) => resultItem.result.list.map((item) => ` ${item}`);

  // rendering content for result and compare column based on number type
  let contentColumn;
  let compareContentColumn;
  if (item.result.type === TYPE_ID_NUMBER) {
    contentColumn = item.result.value;
    compareContentColumn = compareItem && compareItem.result.value;
  } else if (item.result.type === TYPE_ID_LIST) {
    contentColumn = renderResultList(item);
    compareContentColumn = compareItem && renderResultList(compareItem);
  } else if (item.result.type === TYPE_ID_MATRIX) {
    contentColumn = renderResultMatrix(item);
    compareContentColumn = compareItem && renderResultMatrix(compareItem);
  }

  // determining if the current row is unlocked
  const rowIsLocked = item.descriptionText.length === 0;

  // returning table row
  return (
    <ResultTableRowStyled
      key={item.numberId}
      id={item.numberId}
      highlighted={item.highlighted}
    >
      <NameColumn>{item.name}</NameColumn>
      <ResultColumn>{contentColumn}</ResultColumn>
      {compareContentColumn && (
        <ResultColumn>{compareContentColumn}</ResultColumn>
      )}
      <ActionColumn>
        <RowIconButton
          icon={rowIsLocked ? faLock : faBookOpen}
          disabled={rowIsLocked}
          onClick={() => !rowIsLocked && props.onTextDetailClick(item.numberId)}
        />
      </ActionColumn>
    </ResultTableRowStyled>
  );
};

// propTypes
ResultTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  onTextDetailClick: PropTypes.func.isRequired,
  rowIndex: PropTypes.number.isRequired,
};

export default ResultTableRow;
