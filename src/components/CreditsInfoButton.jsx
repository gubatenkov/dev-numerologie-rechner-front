import React from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Table from 'react-bootstrap/Table';

function normalizeCreitsData(raw) {
  const data = {
    personalShorts: 0,
    personalLongs: 0,
    partnerShorts: 0,
    partnerLongs: 0,
    total: 0,
  };
  raw.forEach(c => {
    data.total += c.total;
    switch (c.type) {
      case 'persoenlichkeit_kurz':
        data.personalShorts = c.total;
        break;
      case 'persoenlichkeit_lang':
        data.personalLongs = c.total;
        break;
      case 'partnerschaft_kurz':
        data.partnerShorts = c.total;
        break;
      case 'partnerschaftsnumeroskop_lang':
        data.partnerLongs = c.total;
        break;
      default:
        break;
    }
  });
  return data;
}

export default ({ credits: rawCredits }) => {
  const credits = normalizeCreitsData(rawCredits);
  return (
    <OverlayTrigger
      trigger="click"
      key="credits-popover"
      placement="bottom"
      overlay={
        <Popover
          id="credits-popover"
          title="Guthaben"
        >
          <Table>
            <thead>
              <tr>
                <th>Analyseart</th>
                <th>Kurz PDF</th>
                <th>Lang PDF</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Persönlichkeitsnumeroskop</td>
                <td>{credits.personalShorts}</td>
                <td>{credits.personalLongs}</td>
              </tr>
              {/* <tr>
                <td>Partnership</td>
                <td>{credits.partnerShorts}</td>
                <td>{credits.partnerLongs}</td>
              </tr> */}
            </tbody>
          </Table>
        </Popover>
      }
    >
      <Button
        variant="default"
      >
        Guthaben: {credits.total}
      </Button>
    </OverlayTrigger>
  );
}
