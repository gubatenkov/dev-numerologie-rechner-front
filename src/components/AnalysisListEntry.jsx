import React, { useState, useEffect } from "react";
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
  onAnalysisDelete,
  credits
}) => {
  const [hasLong, setHasLong] = useState(
    analysis.usedCreditTypes.includes(LONG_TYPE)
  );
  const [hasShort, setHasShort] = useState(
    analysis.usedCreditTypes.includes(SHORT_TYPE)
  );

  useEffect(() => {
    setHasLong(analysis.usedCreditTypes.includes(LONG_TYPE));
    setHasShort(analysis.usedCreditTypes.includes(SHORT_TYPE));
  }, [analysis]);

  const hasUnusedCredits = type => {
    const creditType = credits.find(credit => credit.type === type);

    if (!creditType) {
      return false;
    }

    return creditType.total > 0;
  };

  const hasUnusedShortCredits = () => {
    return hasUnusedCredits("persoenlichkeit_kurz");
  };

  const hasUnusedLongCredits = () => {
    return hasUnusedCredits("persoenlichkeit_lang");
  };

  const lifeNumbers = analysis.personalAnalysisResults
    .filter(result => result.lz)
    .map(result => result.lz.result.value);
  // assuming that if i have multiple entries they are the same - only display the first:
  const lifeNumber = lifeNumbers[0];

  const toggle = <PdfToggleIcon hasLong={hasLong} hasShort={hasShort} />;

  return (
    <div className="akb-list-entry">
      <LeftDiv>
        <LifeNumberDisplay nr={lifeNumber} />
        <Link className="akb-link" to={`/resultPersonal/${analysis.id}`}>
          {analysis.name}
        </Link>
      </LeftDiv>
      <RightDiv>
        <NavigationDropdownMenu key="GeneratePdfMenu" customToggle={toggle}>
          {/* Short Pdfs */}
          {hasShort ? (
            <NavigationDropdownMenuItem onClick={onShortPdfClicked}>
              <img src={shortPdfIcon} alt="" /> Kurzes PDF herunterladen
            </NavigationDropdownMenuItem>
          ) : (
            <NavigationDropdownMenuItem onClick={onBuyShortPdfClicked}>
              <img src={shortPdfIcon} alt="" />{" "}
              {hasUnusedShortCredits()
                ? "Kurzes PDF - Credit einlösen"
                : "Kurzes PDF kaufen"}
            </NavigationDropdownMenuItem>
          )}
          {/* Long Pdfs */}
          {hasLong ? (
            <NavigationDropdownMenuItem onClick={onLongPdfClicked}>
              <img src={longPdfIcon} alt="" /> Langes PDF herunterladen
            </NavigationDropdownMenuItem>
          ) : (
            <NavigationDropdownMenuItem onClick={onBuyLongPdfClicked}>
              <img src={longPdfIcon} alt="" />{" "}
              {hasUnusedLongCredits()
                ? "Langes PDF - Credit einlösen"
                : "Langes PDF kaufen"}
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
