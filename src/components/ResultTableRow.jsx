import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Overlay, Tooltip } from "react-bootstrap";
import { isMobile } from "react-device-detect";

// importing all icons used as actions in the row
import bookIcon from "../images/icon_openBook_primary.svg";
import bookShortIcon from "../images/icon_textShort.svg";
import bookLongLongIcon from "../images/icon_textLong.svg";
import lockIcon from "../images/icon_lock.svg";

import IconButton from "./Buttons/IconButton";

// identifiers for results
import {
  TYPE_ID_NUMBER,
  TYPE_ID_LIST,
  TYPE_ID_MATRIX
} from "../utils/Constants";

// mapping from access level to used icon in row
const ACCESS_LEVEL_ICON_MAPPING = {
  ACCESS_LEVEL_GUEST: bookIcon,
  ACCESS_LEVEL_USER: bookIcon,
  ACCESS_LEVEL_PAID_SHORT: bookShortIcon,
  ACCESS_LEVEL_PAID_LONG: bookLongLongIcon
};

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
  background-color: ${props =>
    props.highlighted ? props.theme.highlightedRow : props.theme.white};
  box-shadow: 0 0 8px 0 rgba(50, 50, 50, 0.08);
  border-radius: 8px;
  /* defining padding: if the cell is highlighted, we have a border around (4px). Therefore we need to adapt
  left and right padding for row to be aligned with others*/
  padding: ${props =>
    `15px ${props.highlighted ? "8px" : "12px"} 15px ${
      props.highlighted ? "8px" : "12px"
    }`};
  border: ${props =>
    props.highlighted ? `solid ${props.theme.white} 4px` : "none"};

  /* text styling */
  font-family: ${props => props.theme.fontFamily};
  color: ${props => props.theme.darkGrey};
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
`;

// Column holding the whole content of the row (=name + all values)
const ContentColumn = styled.div`
  /* flex row that takes all remaining space (except action at right). 
  This container is used to wrap results on low resolutions*/
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  @media (max-width: 945px) {
    flex-direction: column;
  }
  flex-basis: 100%;
  /* vertically centering all items */
  align-items: center;

  /* this container should wrap so result content items can flow onto the next line */
  flex-wrap: wrap;
`;

// element holding the name of the result
const NameColumn = styled.div`
  @media (max-width: 945px) {
    width: 100%;
  }
  width: 220px;
`;

/* container holding all results (might be multiple ones). This container is needed as we
don't want results to be wrapped independently = results on different rows */
const ResultContainer = styled.div`
  /* container is row in itself of all results */
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  /* allowing results to wrap on smallest devices*/
  flex-wrap: wrap;
`;

const NumberResultContainer = styled.div`
  width: ${props => (props.matrix ? "100%" : "220px")};
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

// element holding the result value (matrix, list or number)
const ResultColumn = styled.div`
  /* centering horizontally */

  text-align: ${props =>
    !props.hasCompare ? "center" : props.left ? "right" : "left"};
  width: ${props => (props.matrix ? "" : "110px")};
  /* results take up equal space in container*/

  /* padding results to make sure that two elements next to each other can be distinguished */
  margin-left: ${props => (props.left ? "0" : "12")}px;
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
  @media (max-width: 1167px) {
    height: 114px;
    width: 114px;
    font-size: 14px;
  }
`;

// cell of the matrix table
const MatrixCell = styled.td`
  /* if in highlighted state => adapting background color */
  background-color: ${props =>
    props.highlighted ? props.theme.matrixRed : ""};

  /* setting fixed width of cell */
  width: 75px;
  height: 75px;

  /* setting border on every cell */
  border: solid ${props => props.theme.matrixBorderGrey} 1px;

  /* on mobile => making cells smaller*/
  @media (max-width: 1167px) {
    height: 38px;
    width: 38px;
  }
`;

// container around matrix used to draw rounded border
const MatrixContainer = styled.div`
  /* defining border around matrix*/
  border: solid ${props => props.theme.matrixBorderGrey} 1px;
  border-radius: 8px;

  /* setting width of container = size of matrix + 1px for border on every side*/
  width: 227px;
  height: 227px;

  /* setting margin of container to center in container*/
  margin: 12px auto 12px auto;

  /* on mobile => making container same size as smaller matrix */
  @media (max-width: 1167px) {
    height: 116px;
    width: 116px;
  }
`;

// custom icon button with different size
const RowIconButton = styled(IconButton)`
  height: 40px;
  width: 40px;

  ${props => (props.yellow ? `background-color: ${props.theme.yellow}` : "")};

  /* as we use non-square icons with a badge, we need to adjust this here...not nice! */
  img {
    padding-bottom: ${props => (props.badge ? "4px" : "0px")};
  }
`;

// const ResultColumStyled = styled(ResultColumn)`
//   display: "block";
// `;

/**
 * row rendering a single row item of an analysis result
 */
const ResultTableRow = props => {
  // getting item and compare item from passed props
  const { item, compareItem } = props;
  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef(null);

  /**
   * renders a result matrix as content of the table
   * @param item the item of type 'matrix'
   */
  const renderResultMatrix = resultItem => {
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
                  const highlighted = highlightedIndices[currentIndex];

                  // extracting result value or placeholder
                  const resultValue =
                    resultItem.result.values[currentIndex] || "";

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

  const renderPlaceholderResultMatrix = () => {
    return (
      <MatrixContainer>
        <MatrixTable>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%"
            }}
          >
            -
          </div>
        </MatrixTable>
      </MatrixContainer>
    );
  };

  /**
   * renders a readable represetnation of the list result item type
   * @param resultItem the received result item of type list
   */
  const renderResultList = resultItem =>
    resultItem.result.list.map(item => ` ${item}`);

  // rendering content for result and compare column based on number type
  let contentColumn;
  let compareContentColumn;
  let emptyResult = false;

  if (item.result.type === TYPE_ID_NUMBER) {
    contentColumn = item.result.value;
    compareContentColumn = compareItem && compareItem.result.value;
    emptyResult = !item.result.value;
  } else if (item.result.type === TYPE_ID_LIST) {
    contentColumn = renderResultList(item);
    compareContentColumn = compareItem && renderResultList(compareItem);
    emptyResult = item.result.list.length === 0;
  } else if (item.result.type === TYPE_ID_MATRIX) {
    contentColumn = renderResultMatrix(item);
    compareContentColumn = compareItem && renderResultMatrix(compareItem);
    emptyResult = item.result.values.length === 0;
  }

  if (compareItem && props.notShowCompareItem) {
    if (item.result.type === TYPE_ID_MATRIX) {
      compareContentColumn = renderPlaceholderResultMatrix();
    } else {
      compareContentColumn = "-";
    }
  }

  // determining if the current row is unlocked
  const rowIsLocked = item.descriptionText.length === 0;

  // getting icon for row based on user access level
  const rowIcon = ACCESS_LEVEL_ICON_MAPPING[props.accessLevel];

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
          <NumberResultContainer matrix={item.result.type === TYPE_ID_MATRIX}>
            <ResultColumn
              left
              hasCompare={compareContentColumn}
              matrix={item.result.type === TYPE_ID_MATRIX}
            >
              {contentColumn}
            </ResultColumn>
            {compareContentColumn && (
              <ResultColumn
                hasCompare={compareContentColumn}
                matrix={item.result.type === TYPE_ID_MATRIX}
                tabIndex={
                  compareContentColumn === "-" && isMobile ? "0" : undefined
                }
                compare={compareContentColumn}
                onClick={
                  isMobile ? () => setShowTooltip(!showTooltip) : undefined
                }
                onBlur={isMobile ? () => setShowTooltip(false) : undefined}
                onMouseEnter={
                  !isMobile ? () => setShowTooltip(true) : undefined
                }
                onMouseLeave={
                  !isMobile ? () => setShowTooltip(false) : undefined
                }
              >
                <div ref={target}>{compareContentColumn}</div>
                {compareContentColumn === "-" && (
                  <Overlay
                    target={target.current}
                    show={showTooltip}
                    placement="top"
                  >
                    {props => (
                      <Tooltip
                        id="overlay-example"
                        {...props}
                        show={props.show.toString()}
                      >
                        Gleich wie linke Zahl
                      </Tooltip>
                    )}
                  </Overlay>
                )}
              </ResultColumn>
            )}
          </NumberResultContainer>
        </ResultContainer>
      </ContentColumn>

      <ActionColumn>
        {!emptyResult && item.result.type !== TYPE_ID_MATRIX && (
          <RowIconButton
            imageIcon={rowIsLocked ? lockIcon : rowIcon}
            inactive={rowIsLocked}
            inverted={item.highlighted}
            primary={props.accessLevel === "ACCESS_LEVEL_PAID_SHORT"}
            badge={
              props.accessLevel === "ACCESS_LEVEL_PAID_SHORT" ||
              props.accessLevel === "ACCESS_LEVEL_PAID_LONG"
            }
            onClick={() => props.onTextDetailClick(item.numberId)}
          />
        )}
      </ActionColumn>
    </ResultTableRowStyled>
  );
};

// propTypes
ResultTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  onTextDetailClick: PropTypes.func.isRequired,
  accessLevel: PropTypes.string.isRequired
};

export default ResultTableRow;
