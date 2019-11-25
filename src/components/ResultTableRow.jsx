import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { faLock, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import IconButton from './Buttons/IconButton';

import { MOBILE_RESOLUTION_THRESHOLD } from '../utils/Constants';

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

  > td:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  > td:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  > td {
    background-color: ${(props) => props.theme.white};
  }
`;

const NameColumn = styled.td`
  width: 35%;
  text-align: left;
  padding-left: 24px;

  ${ResultTableRowStyled}:hover & {
    border-left: solid ${(props) => props.theme.primary} 1px;
    border-top: solid ${(props) => props.theme.primary} 1px;
    border-bottom: solid ${(props) => props.theme.primary} 1px;
  }

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
  }
`;

const ResultColumn = styled.td`
  width: ${(props) => (props.compare ? '25%' : '50%')};
  text-align: center;

  ${ResultTableRowStyled}:hover & {
    border-top: solid ${(props) => props.theme.primary} 1px;
    border-bottom: solid ${(props) => props.theme.primary} 1px;
  }
`;

const ActionColumn = styled.td`
  width: 15%;
  text-align: right;
  padding-right: 12px;

  ${ResultTableRowStyled}:hover & {
    border-right: solid ${(props) => props.theme.primary} 1px;
    border-top: solid ${(props) => props.theme.primary} 1px;
    border-bottom: solid ${(props) => props.theme.primary} 1px;
  }
`;

const MatrixTable = styled.table`
  text-align: center;
  height: 225px;
  width: 225px;

  border-collapse: collapse;
  border-style: hidden;

  td {
    /* border: solid ${(props) => props.theme.lighterGrey} 1px;*/
    width: 75px;
    height: 75px;

    border: solid ${(props) => props.theme.matrixBorderGrey} 1px;
  }
  
  tr:first-child td:first-child {
    border-top-left-radius: 8px;
  }

  tr:first-child td:last-child {
    border-top-right-radius: 8px;
  }

  tr:last-child td:first-child {
    border-bottom-left-radius: 8px;
  }

  tr:last-child td:last-child {
    border-bottom-right-radius: 8px;
  }
`;

const MatrixCell = styled.td`
  background-color: ${(props) => (props.highlighted ? props.theme.matrixRed : '')};
`;

const RowIconButton = styled(IconButton)`
  height: 40px;
  width: 40px;
`;

const MatrixContainer = styled.div`
  border: solid ${(props) => props.theme.matrixBorderGrey} 1px;
  border-radius: 8px;

  width: 227px;
  height: 227px;
  margin: 12px auto 12px auto;
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

    // extracting highlighted indices
    const highlightedIndices = resultItem.result.highlighted;

    // rendering and returning matrix
    return (
      <MatrixContainer>
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
                  const highlighted = highlightedIndices[currentIndex];

                  // extracting result value or placeholder
                  const resultValue = resultItem.result.values[currentIndex] || '';

                  // returning cell for element
                  return (
                    <MatrixCell
                      highlighted={highlighted}
                      key={resultItem.name + currentIndex}
                    >
                      {resultValue.length > 3
                        ? `${resultValue.substr(0, 3)}...`
                        : resultValue}
                    </MatrixCell>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </MatrixTable>
      </MatrixContainer>
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
      <ResultColumn compare={compareContentColumn}>
        {contentColumn}
      </ResultColumn>
      {compareContentColumn && (
        <ResultColumn compare={compareContentColumn}>
          {compareContentColumn}
        </ResultColumn>
      )}
      <ActionColumn>
        <RowIconButton
          icon={rowIsLocked ? faLock : faBookOpen}
          inactive={rowIsLocked}
          onClick={() => props.onTextDetailClick(item.numberId)}
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
