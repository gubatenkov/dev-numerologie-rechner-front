import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

// custom styling for card used for accordion
const PromotionCard = styled(Card)`
  background-color: transparent !important;
  border: none !important;
  margin: 0 !important;
`;

// card header = title
const PromotionCardHeader = styled(Card.Header)`
  background-color: transparent !important;
  border: none !important;
  padding: 0 !important;
  cursor: pointer;
  user-select: none;
`;

// body = area where children are rendered int
const PromotionCardBody = styled(Card.Body)`
  margin-top: 12px;
  padding: 0;
`;

// the icon used to indicate if the accordion is open or not
const PromotionIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.primary};
  margin-left: 2px;
`;

// accordion component rendering one element (children) that can be collapsed.
const PromotionAccordion = (props) => {
  // state indicating if the accordion is open
  const [open, setOpen] = useState(false);

  return (
    <Accordion defaultActiveKey={null} className={props.className}>
      <PromotionCard>
        <Accordion.Toggle
          as={PromotionCardHeader}
          onClick={() => setOpen(!open)}
        >
          {props.title}{' '}
          <PromotionIcon icon={open ? faChevronUp : faChevronDown} />
        </Accordion.Toggle>
        <Accordion.Collapse>
          <PromotionCardBody>{props.children}</PromotionCardBody>
        </Accordion.Collapse>
      </PromotionCard>
    </Accordion>
  );
};

// setting prop types
PromotionAccordion.propTyes = {
  title: PropTypes.string.isRequired,
};

export default PromotionAccordion;
