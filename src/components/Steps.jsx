import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// styling container fro steps elements. Most of the styling ist handled by the container for the elements
const StepsContainer = styled.div`
  /* row flex container with items*/
  display: flex;
  flex-direction: row;

  /* space between elements*/
  > div + div {
    margin-left: 40px;
  }

  /* drawing the circle for each item */
  div::before {
    content: '';
    width: 12px;
    height: 12px;
    display: block;
    margin: 0 auto 10px auto;
    border-radius: 50%;
    background: ${(props) => props.theme.primaryLight};
    text-align: center;
  }

  /* drawing line after the element*/
  div::after {
    content: '';
    position: absolute;
    /* full width of the elemen + padding*/
    width: calc(100% + 40px);
    height: 2px;
    background: ${(props) => props.theme.primaryLight};
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
    background: ${(props) => props.theme.darkGrey};
  }
`;

/**
 * a container component for steps that draws a connection
 * line between steps and handles alignment of steps
 */
export const Steps = (props) => (
  <StepsContainer className={props.className}>{props.children}</StepsContainer>
);

// styling step element (text only)
const StyledStep = styled.div`
  /* important to position line*/
  position: relative;

  /* font color dependent on active state*/
  color: ${(props) => (props.active ? props.theme.darkGrey : props.theme.lighterGrey)};

  /* basic font styling */
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 16px;
  line-height: 26px;
`;

// A step in the progess steps component
export const Step = (props) => (
  <StyledStep
    className={
      props.active ? `${props.className || ''} ${'active'}` : props.className
    }
    active={props.active}
    onClick={() => props.onStepClick(props.name)}
  >
    {props.name}
  </StyledStep>
);
