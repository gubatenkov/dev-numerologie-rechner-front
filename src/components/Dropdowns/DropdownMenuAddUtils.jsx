import React from "react";
import { ReactComponent as IconAdd } from "../../images/icon_add.svg";
import { ReactComponent as IconArrowDownBlue } from "../../images/icon_arrow_down-24px_blue.svg";
import { ReactComponent as IconMore } from "../../images/icon_more.svg";
import styled from "styled-components";
import iconPdf from "../../images/icon_pdf.svg";
import shortPdfIcon from "../../images/icon_openBookPremium_primary.svg";
import longPdfIcon from "../../images/icon_textLong.svg";

const addToggleStyle = {
  cursor: "pointer"
};
export const AddToggleIcon = <IconAdd style={addToggleStyle} />;

const actionToggleStyle = {
  cursor: "pointer"
};

const PdfToggleParent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 40px;
  background-color: #f3f9fa;
  border-radius: 6px;
  cursor: pointer;

  img {
    margin-right: 6px;
  }
`;

export const ActionToggleIcon = (
  <div style={actionToggleStyle}>
    <IconMore />
  </div>
);

const getImage = (hasLong, hasShort) => {
  if (hasLong) {
    return longPdfIcon;
  }

  if (hasShort) {
    return shortPdfIcon;
  }

  return iconPdf;
};

export const PdfToggleIcon = ({ hasLong, hasShort }) => {
  const image = getImage(hasLong, hasShort);

  return (
    <PdfToggleParent>
      <img src={image} alt="PDF" width="21px" height="24px" />
      <IconArrowDownBlue />
    </PdfToggleParent>
  );
};
