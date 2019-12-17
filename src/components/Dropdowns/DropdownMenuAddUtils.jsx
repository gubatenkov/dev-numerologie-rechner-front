import React from 'react';
import { ReactComponent as IconAdd } from '../../images/icon_add.svg';
import { ReactComponent as IconPdf } from '../../images/icon_pdf.svg';
import { ReactComponent as IconArrowDownBlue } from '../../images/icon_arrow_down-24px_blue.svg';
import { ReactComponent as IconMore } from '../../images/icon_more.svg';
import { Button } from 'react-bootstrap';

const addToggleStyle = {
  cursor: 'pointer',
};
const pdfToggleStyle = {
  cursor: 'pointer',
};
export const AddToggleIcon = <IconAdd style={addToggleStyle} />;

export const ActionToggleIcon = <IconMore />;

export const PdfToggleIcon = (
  <Button variant="default" block>
    <div className="inline-row">
      <IconPdf />
      <IconArrowDownBlue />
    </div>
  </Button>
);
