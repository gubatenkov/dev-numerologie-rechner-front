import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

const PromotionCard = styled(Card)`
  background-color: transparent !important;
  border: none !important;
  margin: 0 !important;
`;

const PromotionCardHeader = styled(Card.Header)`
  background-color: transparent !important;
  border: none !important;
  padding: 0 !important;
  cursor: pointer;
  user-select: none;
`;

const PromotionCardBody = styled(Card.Body)`
  margin-top: 12px;
  padding: 0;
`;

const PromotionIcon = styled(FontAwesomeIcon)`
  color: ${props => props.theme.primary};
  margin-left: 2px;
`;

const PromotionAccordion = props => {
  const [open, setOpen] = useState(false);

  return (
    <Accordion defaultActiveKey={null} className={props.className}>
      <PromotionCard>
        <Accordion.Toggle
          as={PromotionCardHeader}
          onClick={() => setOpen(!open)}
        >
          {props.title}{" "}
          <PromotionIcon icon={open ? faChevronUp : faChevronDown} />
        </Accordion.Toggle>
        <Accordion.Collapse>
          <PromotionCardBody>{props.children}</PromotionCardBody>
        </Accordion.Collapse>
      </PromotionCard>
    </Accordion>
  );
};

PromotionAccordion.propTyes = {
  title: PropTypes.string.isRequired
};

export default PromotionAccordion;
