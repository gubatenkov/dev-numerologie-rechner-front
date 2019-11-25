import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ResultTableRow from './ResultTableRow';

// result table root element
const ResultTableStyled = styled.table`
  /* styling basic table properties*/
  table-layout: fixed;
  border-collapse: separate;

  border-spacing: 0 8px;

  width: 100%;

  /* making sure the user cannot select any values in table*/
  user-select: none;

  /* making sure the results are not displayed when attempting to print*/
  @media print {
    display: none;
  }
`;

// watermark shown when user tries to print results
const ResultWatermark = styled.h3`
  /* watermark is not shown on web */
  display: none;

  /* watermark is shown when printing */
  @media print {
    display: block;
  }
`;

const TableCaption = styled.caption`
  caption-side: top;
  text-transform: uppercase;
  margin-left: 24px;
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.black};
`;

/**
 * table capable of rendering calculation and number results
 * returned from the server
 */
const ResultTable = (props) => {
  /**
   * handles clicks on action button in rows and forwards to parent
   * @param {String} numberId the id of the number/row that the action was performed in
   */
  const handleTextDetailClick = (numberId) => {
    props.handleTextDetailClick(props.sectionId, numberId);
  };

  return [
    <ResultTableStyled key={`ResultTable ${props.name}`}>
      {props.showTitle && <TableCaption>{props.name}</TableCaption>}
      <tbody>
        {props.numbers.map((item, index) => (
          <ResultTableRow
            key={`ResultTableRow ${item.numberId}`}
            item={item}
            compareItem={props.compareNumbers && props.compareNumbers[index]}
            rowIndex={index}
            onTextDetailClick={handleTextDetailClick}
          />
        ))}
      </tbody>
    </ResultTableStyled>,
    <ResultWatermark key="watermark">
      Bitte kaufen Sie ein PDF Paket um ein PDF der Analyse zu generieren.
    </ResultWatermark>,
  ];
};

// setting proptypes on component
ResultTable.propTypes = {
  name: PropTypes.string,
  numbers: PropTypes.array.isRequired,
  headings: PropTypes.array,
  showTitle: PropTypes.bool,
  sectionId: PropTypes.string.isRequired,
  handleTextDetailClick: PropTypes.func.isRequired,
};

export default ResultTable;
