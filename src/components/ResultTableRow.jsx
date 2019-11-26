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

// the row in the results table
const ResultTableRowStyled = styled.div`
  /* flexbox row with action item to the right and content taking rest of width*/
  display: flex;
  flex-direction: row;
  align-items: center;

  /* children are the action tot the right and the rest of the content on the left*/
  justify-content: space-between;

  /* basic row box styling*/
  min-height: 60px;
  background-color: ${(props) => (props.highlighted ? props.theme.highlightedRow : props.theme.white)};
  box-shadow: 0 0 8px 0 rgba(50, 50, 50, 0.08);
  border-radius: 8px;
  padding: 15px 12px 15px 24px;
  border: ${(props) => (props.highlighted ? `solid ${props.theme.white} 4px` : 'none')};

  /* text styling */
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.darkGrey};
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;

  /* adding primary color border on hover*/
  :hover {
    border: solid ${(props) => props.theme.primary} 1px;
  }
`;

// Column holding the whole content of the row (=name + all values)
const ContentColumn = styled.div`
  /* flex row that takes all remaining space (except action at right). 
  This container is used to wrap results on low resolutions*/
  display: flex;
  flex-direction: row;
  flex-basis: 100%;
  /* vertically centering all items */
  align-items: center;

  /* this container should wrap so result content items can flow onto the next line */
  flex-wrap: wrap;
`;

// element holding the name of the result
const NameColumn = styled.div`
  /* 40% of the width */
  flex-basis: 40%;

  /* allow it to grow in case other elements flow to next row. E.g. 
  content results flow to next line: we want this to take up 100% of the width */
  flex-grow: 1;
`;

/* container holding all results (might be multiple ones). This container is needed as we
don't want results to be wrapped independently = results on different rows */
const ResultContainer = styled.div`
  /* 60% of width which is then split up between all results */
  flex-basis: 60%;

  /* allow container to grow */
  flex-grow: 1;

  /* container is row in itself of all results */
  display: flex;
  flex-direction: row;
  align-items: center;
  /* allowing results to wrap on smallest devices*/
  flex-wrap: wrap;
`;

// element holding the result value (matrix, list or number)
const ResultColumn = styled.div`
  /* centering horizontally */
  text-align: center;

  /* results take up equal space in container*/
  flex-grow: 1;

  /* padding results to make sure that two elements next to each other can be distinguished */
  padding: 5px;
`;

// element to the very right holidng action button
const ActionColumn = styled.div`
  /* vertically aligning button at start as supposed to stick at top of container */
  align-self: flex-start;
`;

// the result matrix table
const MatrixTable = styled.table`
  /* centering text in cells*/
  text-align: center;

  /* setting fixed size of table*/
  height: 225px;
  width: 225px;

  /* setting border collapse to not have separate borders for cells and table
  Note: we style rounded corners on outer table while having all inner borders as follows: 
  1) remove outer border of table
  2) wrap in container that mimics outer border*/
  border-collapse: collapse;

  /* hiding outer table borders */
  border-style: hidden;

  /* on mobile => making matrix and font size smaller*/
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    height: 114px;
    width: 114px;
    font-size: 14px;
  }
`;

// cell of the matrix table
const MatrixCell = styled.td`
  /* if in highlighted state => adapting background color */
  background-color: ${(props) => (props.highlighted ? props.theme.matrixRed : '')};

  /* setting fixed width of cell */
  width: 75px;
  height: 75px;

  /* setting border on every cell */
  border: solid ${(props) => props.theme.matrixBorderGrey} 1px;

  /* on mobile => making cells smaller*/
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    height: 38px;
    width: 38px;
  }
`;

// container around matrix used to draw rounded border
const MatrixContainer = styled.div`
  /* defining border around matrix*/
  border: solid ${(props) => props.theme.matrixBorderGrey} 1px;
  border-radius: 8px;

  /* setting width of container = size of matrix + 1px for border on every side*/
  width: 227px;
  height: 227px;

  /* setting margin of container to center in container*/
  margin: 12px auto 12px auto;

  /* on mobile => making container same size as smaller matrix */
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    height: 116px;
    width: 116px;
  }
`;

// custom icon button with different size
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
      <ContentColumn>
        <NameColumn compare={!!compareContentColumn}>{item.name}</NameColumn>
        <ResultContainer>
          <ResultColumn compare={!!compareContentColumn}>
            {contentColumn}
          </ResultColumn>
          {compareContentColumn && (
            <ResultColumn compare={compareContentColumn}>
              {compareContentColumn}
            </ResultColumn>
          )}
        </ResultContainer>
      </ContentColumn>

      <ActionColumn>
        <RowIconButton
          icon={rowIsLocked ? faLock : faBookOpen}
          inactive={rowIsLocked}
          inverted={item.highlighted}
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
};

export default ResultTableRow;
