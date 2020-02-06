import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NavigationDropdownMenu from "./NavigationDropdownMenu";
import NavigationDropdownMenuItem from "./NavigationDropdownMenuItem";
import {
  ActionToggleIcon,
  PdfToggleIcon
} from "./Dropdowns/DropdownMenuAddUtils";
import shortPdfIcon from "../images/icon_openBookPremium_primary.svg";
import longPdfIcon from "../images/icon_textLong.svg";
import iconDelete from "../images/icon_delete.svg";

export const SHORT_TYPE = "persoenlichkeit_kurz";
export const LONG_TYPE = "persoenlichkeit_lang";

const LeftDiv = styled.div`
  display: flex;
  .akb-life-number-display {
    margin-right: 12px;
  }
`;
const RightDiv = styled.div`
  display: flex;
  align-items: center;
`;

const LifeNumberDisplay = ({ nr }, children) => (
  <div className="akb-life-number-display">{nr}</div>
);

const AnalysisListEntry = ({
  analysis,
  onShortPdfClicked,
  onBuyShortPdfClicked,
  onLongPdfClicked,
  onBuyLongPdfClicked,
  onAnalysisDelete
}) => {
  const lifeNumbers = analysis.personalAnalysisResults
    .filter(result => result.lz)
    .map(result => result.lz.result.value);
  // assuming that if i have multiple entries they are the same - only display the first:
  const lifeNumber = lifeNumbers[0];

  return (
    <div className="akb-list-entry">
      <LeftDiv>
        <LifeNumberDisplay nr={lifeNumber} />
        <Link className="akb-link" to={`/resultPersonal/${analysis.id}`}>
          {analysis.name}
        </Link>
      </LeftDiv>
      <RightDiv>
        <NavigationDropdownMenu
          key="GeneratePdfMenu"
          customToggle={PdfToggleIcon}
        >
          {/* Short Pdfs */}
          {analysis.usedCreditTypes.includes(SHORT_TYPE) ? (
            <NavigationDropdownMenuItem onClick={onShortPdfClicked}>
              <img src={shortPdfIcon} alt="" /> Kurzes PDF
            </NavigationDropdownMenuItem>
          ) : (
            <NavigationDropdownMenuItem onClick={onBuyShortPdfClicked}>
              <img src={shortPdfIcon} alt="" /> Kurzes PDF kaufen
            </NavigationDropdownMenuItem>
          )}
          {/* Long Pdfs */}
          {analysis.usedCreditTypes.includes(LONG_TYPE) ? (
            <NavigationDropdownMenuItem onClick={onLongPdfClicked}>
              <img src={longPdfIcon} alt="" /> Langes PDF
            </NavigationDropdownMenuItem>
          ) : (
            <NavigationDropdownMenuItem onClick={onBuyLongPdfClicked}>
              <img src={longPdfIcon} alt="" /> Langes PDF kaufen
            </NavigationDropdownMenuItem>
          )}
        </NavigationDropdownMenu>

        <NavigationDropdownMenu
          key="ActionMenu"
          customToggle={ActionToggleIcon}
        >
          <NavigationDropdownMenuItem onClick={onAnalysisDelete}>
            <img src={iconDelete} alt="" /> Löschen
          </NavigationDropdownMenuItem>
        </NavigationDropdownMenu>
      </RightDiv>
    </div>
  );
};

export default AnalysisListEntry;
