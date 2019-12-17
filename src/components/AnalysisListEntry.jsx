import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavigationDropdownMenu from './NavigationDropdownMenu';
import NavigationDropdownMenuItem from './NavigationDropdownMenuItem';
import {
  ActionToggleIcon,
  PdfToggleIcon,
} from './Dropdowns/DropdownMenuAddUtils';
import shortPdfIcon from '../images/icon_openBookPremium_primary.svg';
import longPdfIcon from '../images/icon_textLong.svg';

const LeftDiv = styled.div`
  display: flex;
  .akb-life-number-display {
    margin-right: 12px;
  }
`;
const RightDiv = styled.div`
  display: flex;
`;

const LifeNumberDisplay = ({ nr }, children) => (
  <div className="akb-life-number-display">{nr}</div>
);

const AnalysisListEntry = ({ analyis }) => {
  const lifeNumbers = analyis.personalAnalysisResults
    .filter(result => result.lz)
    .map(result => result.lz.result.value);
  // assuming that if i have multiple entries they are the same - only display the first:
  const lifeNumber = lifeNumbers[0];

  return (
    <div className="akb-list-entry">
      <LeftDiv>
        <LifeNumberDisplay nr={lifeNumber} />
        <Link className="akb-link" to={`/resultPersonal/${analyis.id}`}>
          {analyis.name}
        </Link>
      </LeftDiv>
      <RightDiv>
        <NavigationDropdownMenu
          key="GeneratePdfMenu"
          customToggle={PdfToggleIcon}
        >
          <NavigationDropdownMenuItem>
            <img src={shortPdfIcon} alt="" /> Kurzes PDF
          </NavigationDropdownMenuItem>
          <NavigationDropdownMenuItem>
            <img src={longPdfIcon} alt="" /> Langes PDF
          </NavigationDropdownMenuItem>
        </NavigationDropdownMenu>

        <NavigationDropdownMenu
          key="ActionMenu"
          customToggle={ActionToggleIcon}
        >
          <NavigationDropdownMenuItem>
            {/*<img src={shortPdfIcon} alt="" /> Umbenennen*/}
          </NavigationDropdownMenuItem>
          <NavigationDropdownMenuItem>
            {/*<img src={longPdfIcon} alt="" /> Löschen*/}
          </NavigationDropdownMenuItem>
        </NavigationDropdownMenu>
      </RightDiv>
    </div>
  );
};

export default AnalysisListEntry;
