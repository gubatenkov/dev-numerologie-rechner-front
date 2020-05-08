import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { MOBILE_RESOLUTION_THRESHOLD } from "../utils/Constants";

const StepsContainer = styled.div`
  /* row flex container with items*/
  display: flex;
  flex-direction: row;
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    display: none;
  }

  /* space between elements*/
  > div + div {
    margin-left: 40px;
  }

  /* drawing the circle for each item */
  div::before {
    content: "";
    width: 12px;
    height: 12px;
    display: block;
    margin: 0 auto 10px auto;
    border-radius: 50%;
    background: ${props => props.theme.primaryLight};
    text-align: center;
  }

  /* drawing line after the element*/
  div::after {
    content: "";
    position: absolute;
    /* full width of the elemen + padding*/
    width: calc(100% + 40px);
    height: 2px;
    background: ${props => props.theme.primaryLight};
    top: 5px;
    left: 0;
    z-index: -1;
  }

  /* last element => only drawing from right edge of previous element to center of self*/
  div:last-child:after {
    width: calc(50% + 50px);
    left: -50%;
  }
  /* first element => only drawing from own center to edge of element + margin*/
  div:first-child:after {
    width: calc(50% + 50px);
    left: 50%;
  }

  /* active element => black circle*/
  div.active:before {
    background: ${props => props.theme.darkGrey};
  }
`;

export const Steps = props => (
  <StepsContainer className={props.className}>{props.children}</StepsContainer>
);

const StyledStep = styled.div`
  /* important to position line*/
  position: relative;

  /* font color dependent on active state*/
  color: ${props =>
    props.active ? props.theme.darkGrey : props.theme.lighterGrey};

  /* show on mobile devices if active */
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    display: ${props =>
      props.stepIndex === props.currentIndex ? "show" : "none"};
  }

  /* basic font styling */
  font-family: ${props => props.theme.fontFamily};
  font-size: 16px;
  line-height: 26px;
`;

export const Step = props => {
  let isActive = props.stepIndex <= props.currentIndex;
  return (
    <StyledStep
      className={
        isActive ? `${props.className || ""} ${"active"}` : props.className
      }
      active={props.active}
      stepIndex={props.stepIndex}
      currentIndex={props.currentIndex}
      onClick={() => props.onStepClick(props.name)}
    >
      {_.truncate(props.name, { length: 15 })}
    </StyledStep>
  );
};
