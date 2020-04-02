import React from "react";
import styled from "styled-components";

import { MOBILE_RESOLUTION_THRESHOLD } from "../utils/Constants";

const StepContainer = styled.div`
  /* basic box styling */
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  margin-left: 20px;
  text-align: center;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    cursor: pointer;
  }

  @media (min-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    display: none;
  }
`;

export const TourOverViewMobileStep = ({ tourStepTitle, onClick }) => {
  /* 
    Hack: changing the structure is not worth it. some names include a ":", the next line removes them at the start and end  
    Should be refactored
  */
  const title = tourStepTitle.replace(/^:|:$/g, "");
  return (
    <StepContainer onClick={onClick}>
      <h3>{title}</h3>
    </StepContainer>
  );
};
