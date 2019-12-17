import React from 'react';
import { ReactComponent as IconAdd } from '../../images/icon_add.svg';
import { ReactComponent as IconArrowDownBlue } from '../../images/icon_arrow_down-24px_blue.svg';
import { ReactComponent as IconMore } from '../../images/icon_more.svg';
import styled from 'styled-components';
import iconPdf from '../../images/icon_pdf.svg';

const addToggleStyle = {
  cursor: 'pointer',
};
const pdfToggleStyle = {
  cursor: 'pointer',
};
export const AddToggleIcon = <IconAdd style={addToggleStyle} />;

const actionToggleStyle = {
  cursor: 'pointer'
};

const PdfToggleParent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 72px;
    height: 40px;
    background-color: #F3F9FA;
    border-radius: 6px;
    
    img{
      margin-right: 6px;
    }
`;

export const ActionToggleIcon = <div style={actionToggleStyle}><IconMore /></div>;

export const PdfToggleIcon = (
  <PdfToggleParent>
    <img src={iconPdf} alt="PDF" width="21px" height="24px" />
    <IconArrowDownBlue />
  </PdfToggleParent>
);
