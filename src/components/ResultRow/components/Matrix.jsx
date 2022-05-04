import React from "react";
import styled from "styled-components";

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
  /* @media (max-width: 1167px) {
    height: 114px;
    width: 114px;
    font-size: 14px;
  } */
`;

const MatrixCell = styled.td`
  /* if in highlighted state => adapting background color */
  background-color: ${props =>
    props.highlighted ? props.theme.matrixRed : ""};

  /* setting fixed width of cell */
  width: 75px;
  height: 75px;

  /* setting border on every cell */
  border: solid ${props => props.theme.matrixBorderGrey} 1px;

  font-size: 24px;
  color: #323232;
  font-weight: 400;
  line-height: 36px;
  font-style: normal;
  text-align: center;

  /* on mobile => making cells smaller*/
  /* @media (max-width: 1167px) {
    height: 38px;
    width: 38px;

    font-size: 14px;
  } */
`;

const MatrixContainer = styled.div`
  /* defining border around matrix*/
  border: solid ${props => props.theme.matrixBorderGrey} 1px;
  border-radius: 0;

  /* setting width of container = size of matrix + 1px for border on every side*/
  width: 227px;
  height: 227px;

  /* setting margin of container to center in container*/
  margin: 0 auto 30px 0;

  /* on mobile => making container same size as smaller matrix */
  @media (max-width: 993px) {
    /* height: 116px; */
    /* width: 116px; */

    margin: 0 auto 30px;
  }
`;

const Matrix = ({ result, text, blurred, name, numberId }) => {
  const matrixDimensions = result.dimensions;
  const highlightedIndices = result.highlighted;

  return (
    <>
      <MatrixContainer>
        <MatrixTable>
          <tbody>
            {[...Array(matrixDimensions.rows)].map((rowItem, rowIndex) => (
              <tr key={name + numberId + rowIndex + result.values[rowIndex]}>
                {[...Array(matrixDimensions.cols)].map((colItem, colIndex) => {
                  const currentIndex =
                    rowIndex * matrixDimensions.cols + colIndex;
                  const highlighted = highlightedIndices[currentIndex];

                  const resultValue = result.values[currentIndex] || "";

                  return (
                    <MatrixCell
                      highlighted={highlighted}
                      key={name + currentIndex}
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
      <p
        className={`result-row__matrixtext ${
          blurred ? "result-row__text--blur" : ""
        }`}
      >
        {text}
      </p>
    </>
  );
};

export default Matrix;
