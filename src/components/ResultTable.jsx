import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ResultTableRow from "./ResultTableRow";
import { shouldShowDuplicatedComparisonResult } from "../utils/ResultUtils";

const ResultTableStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;

  > div + div {
    margin-top: 8px;
  }

  /* making sure the user cannot select any values in table*/
  user-select: none;

  /* making sure the results are not displayed when attempting to print*/
  @media print {
    display: none;
  }
`;

const ResultWatermark = styled.h3`
  /* watermark is not shown on web */
  display: none;

  /* watermark is shown when printing */
  @media print {
    display: block;
  }
`;

const TableCaption = styled.div`
  caption-side: top;
  text-transform: uppercase;
  margin-left: 12px;
  margin-bottom: 4px;
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.black};
`;

const ResultTable = props => {
  const { t } = useTranslation();

  const handleTextDetailClick = numberId => {
    props.handleTextDetailClick(props.sectionId, numberId);
  };

  return (
    <>
      <ResultTableStyled key={`ResultTable ${props.name}`}>
        {props.showTitle && <TableCaption>{props.name}</TableCaption>}
        {props.numbers.map((item, index) => (
          <ResultTableRow
            key={`ResultTableRow ${item.numberId}`}
            item={item}
            compareItem={props.compareNumbers && props.compareNumbers[index]}
            notShowCompareItem={
              !shouldShowDuplicatedComparisonResult(item.numberId)
            }
            onTextDetailClick={handleTextDetailClick}
            accessLevel={props.accessLevel}
          />
        ))}
      </ResultTableStyled>
      {t("BUY_PACKAGE_TO_SEE_CONTENT")}
      <ResultWatermark key="watermark"></ResultWatermark>
    </>
  );
};

// setting proptypes on component
ResultTable.propTypes = {
  name: PropTypes.string,
  numbers: PropTypes.array.isRequired,
  headings: PropTypes.array,
  showTitle: PropTypes.bool,
  sectionId: PropTypes.string.isRequired,
  handleTextDetailClick: PropTypes.func.isRequired,
  accessLevel: PropTypes.string.isRequired
};

export default ResultTable;
