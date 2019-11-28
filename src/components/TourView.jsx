import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Interweave from 'interweave';
import styled from 'styled-components';

import IconButton from './Buttons/IconButton';
import '../styles/TourView.css';

import iconBackPrimary from '../images/icon_back_primary.svg';
import iconForwardPrimary from '../images/icon_forward_primary.svg';

import Panel from './Panel';
import { Steps, Step } from './Steps';

import { MOBILE_RESOLUTION_THRESHOLD } from '../utils/Constants';

const TourContentContainer = styled.div`
  border: solid black 1px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  /* enabling wrapping on mobile phones */
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    flex-wrap: wrap;
  }
`;

const Spacer = styled.div`
  flex-basis: 300px;
  flex-grow: 0;
  flex-shrink: 1;

  /* hiding on mobile phones*/
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    display: none;
  }
`;

const ContentArea = styled.div`
  flex-grow: 1;
  flex-basis: 500px;
  /*margin-right: 70px;
  margin-left: 70px;*/
`;

const PromotionArea = styled.div`
  flex-basis: 300px;
  flex-grow: 0;
  flex-shrink: 0;
`;

const UserlevelPromotion = styled.div`
  width: 300px;
`;

const BookPromotion = styled.div`
  width: 300px;
`;

const TourOverView = styled.div`
  background-color: ${(props) => props.theme.white};
  height: 80px;
  width: 100%;

  position: fixed;
  bottom: 0;

  border-top: solid ${(props) => props.theme.primaryLight} 1px;

  display: grid;

  padding-left: 30px;
  padding-right: 30px;

  grid-template-columns: 36px auto 36px;

  /* hiding on mobile phones*/
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    display: none;
  }
`;

const TourOverViewButton = styled(IconButton)`
  width: 36px;
  height: 36px;
  align-self: center;

  margin-top: 22px;
  margin-bottom: 22px;
`;

const TourOverViewBackButton = styled(TourOverViewButton)`
  grid-column-start: 1;
`;

const TourOverViewForwardButton = styled(TourOverViewButton)`
  grid-column-start: 3;
`;

const TourOverviewSteps = styled(Steps)`
  width: 804px;
  height: 44px;

  justify-self: center;
  align-self: center;

  margin-top: 20px;
  margin-bottom: 16px;
`;

const TourView = (props) => {
  // getting used values out of props
  const {
    sectionIndex,
    elementIndex,
    tourData,
    compareTourData,
    onClose,
    onIndexChange,
  } = props;

  // handler for clicks on the steps directly in the overview
  const handleStepClick = (sectionTitleClicked) => {
    // getting index of section title clicked and setting it's index as current section index
    const index = tourData.findIndex(
      (item) => item.sectionName === sectionTitleClicked,
    );

    if (index > -1) {
      onIndexChange(index, 0);
    }
  };

  // handler for clicking on back button
  const handleBackClick = () => {
    if (elementIndex > 0) {
      onIndexChange(sectionIndex, elementIndex - 1);
    } else if (sectionIndex > 0) {
      onIndexChange(
        sectionIndex - 1,
        tourData[sectionIndex - 1].sectionElements.length,
      );
    }
  };

  // handler for click on the next button
  const handleNextClick = () => {
    // navigate within section
    if (elementIndex < tourData[sectionIndex].sectionElements.length) {
      onIndexChange(sectionIndex, elementIndex + 1);
      // navigate to first element of next section
    } else if (sectionIndex < tourData.length - 1) {
      onIndexChange(sectionIndex + 1, 0);
    }
  };

  // handler for key press
  const handleKeyDown = (event) => {
    switch (event.key) {
      // determining which key was pressed
      case 'ArrowRight':
        handleNextClick();
        return;
      case 'ArrowLeft':
        handleBackClick();
        break;
      case 'Escape':
        props.onClose();
        break;
      default:
    }
  };

  // ref to focus container
  const componentContainer = useRef();

  // disabling/enabling scrolling and focus for key input if is shown/hidden
  useEffect(() => {
    // if modal is shown, getting focus so key inputs work
    if (componentContainer && componentContainer.current) {
      componentContainer.current.focus();
    }
  });

  /**
   * builds a tour element for an introduction text into a section
   * @param sectionIntro the section intro object
   */
  const buildIntroTextTourStep = (sectionIntro) => {
    // building title and content for introduction text to section
    const elementTitle = `Einführung ${sectionIntro.title}`;
    const elementContent = sectionIntro.text;

    // returning result
    return [elementTitle, elementContent];
  };

  /**
   * extracts the title and content from the passed result element
   * and returns both parameters as array
   * @param numberResult the result element to build title and content from
   */
  const buildNumberTourStep = (numberResult) => {
    // if element is default result => using standard result
    // title is name and value
    const elementTitle = `${numberResult.name} ${numberResult.result.value
      || numberResult.result.list}`;

    // if item is locked => returning promotion
    if (numberResult.descriptionText.length === 0) {
      // TODO: add promotion elements here
      return [elementTitle, null];
    }

    // building content based on user preferences
    let elementContent = '';

    // adding number explanation text if configured
    if (props.user.showNumberMeaningExplanations) {
      elementContent += numberResult.numberDescription.description;
    }

    // adding number calcuation explanation text if configured
    if (props.user.showNumberCalculationExplanations) {
      elementContent += `<br/>${numberResult.numberDescription.calculationDescription}`;
    }

    // adding description text of result
    elementContent += `<br/>b${numberResult.descriptionText}`;

    // adding book references if configured
    if (props.user.showBookReferences) {
      elementContent += `<br/>${numberResult.bookReference}`;
    }

    return [elementTitle, elementContent];
  };

  // defining content and compare content
  let tourStepTitle;
  let tourStepCompareTitle;
  let tourStepContent;
  let tourStepCompareContent;

  // if first element => building intro text element
  if (elementIndex === 0) {
    // building step from section intro
    [tourStepTitle, tourStepContent] = buildIntroTextTourStep(
      tourData[sectionIndex].sectionIntro,
    );
  } else {
    // building tour step for result item
    [tourStepTitle, tourStepContent] = buildNumberTourStep(
      tourData[sectionIndex].sectionElements[elementIndex - 1],
    );

    // if present, building tour step for compare result item
    if (compareTourData) {
      [tourStepCompareTitle, tourStepCompareContent] = buildNumberTourStep(
        compareTourData[sectionIndex].sectionElements[elementIndex - 1],
      );
    }
  }

  return [
    <TourContentContainer>
      <Spacer></Spacer>
      <ContentArea>Content</ContentArea>
      <PromotionArea>
        <UserlevelPromotion>Userlevel Promotion</UserlevelPromotion>
        <BookPromotion>Book Promotion</BookPromotion>
      </PromotionArea>
    </TourContentContainer>,
    <TourOverView>
      <TourOverViewBackButton
        imageIcon={iconBackPrimary}
        onClick={() => handleBackClick()}
      />
      <TourOverviewSteps horizontal>
        {tourData.map((tourSection, tourSectionIndex) => (
          <Step
            key={tourSection.sectionName}
            name={tourSection.sectionName}
            active={tourSectionIndex <= sectionIndex}
            onStepClick={(name) => handleStepClick(name)}
          />
        ))}
      </TourOverviewSteps>
      <TourOverViewForwardButton
        imageIcon={iconForwardPrimary}
        onClick={() => handleNextClick()}
      />
    </TourOverView>,
  ];

  return (
    <div
      className="TourView__Container modal-backdrop"
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex="0"
      ref={componentContainer}
    >
      <div className="TourView__Content">
        <div className="TourView__ButtonArea">
          <button
            type="button"
            className="TourView__NavigationButton"
            onClick={handleBackClick}
          >
            <i className="icon wb-chevron-left" />
          </button>
        </div>
        <div>
          <Panel className="TourView__Panel" title={tourStepTitle}>
            <div className="TourView__text TourView--non-printable" />
            <Interweave content={tourStepContent} />
            <h3 className="TourView--printWatermark">
              Die Resultate können nur mit Druckpaket ausgedruckt werden.
            </h3>
          </Panel>
        </div>
        {compareTourData && (
          <div className="">
            <Panel className="TourView__Panel" title={tourStepCompareTitle}>
              <div className="TourView__text TourView--non-printable">
                <Interweave
                  content={
                    _.isEqual(
                      tourData[sectionIndex].sectionElements[elementIndex],
                      compareTourData[sectionIndex].sectionElements[
                        elementIndex
                      ],
                    )
                      ? 'Gleich wie links.'
                      : tourStepCompareContent
                  }
                />
              </div>
              <h3 className="TourView--printWatermark">
                Die Resultate können nur mit Druckpaket ausgedruckt werden.
              </h3>
            </Panel>
          </div>
        )}
        <div className="TourView__ButtonArea">
          <button
            type="button"
            className="TourView__NavigationButton"
            onClick={handleNextClick}
          >
            <i className="icon wb-chevron-right" />
          </button>
        </div>
      </div>
      <div className="TourView__BottomActions">
        <button type="button" className="btn btn-default" onClick={onClose}>
          Schließen
        </button>
      </div>
      <div className="TourView__ContentOverview">
        <Steps horizontal>
          {tourData.map((tourSection, tourSectionIndex) => {
            // getting length of current section (only elements that have content)
            const currentSectionLength = tourSection.sectionElements.length;

            // determining index to display for step
            let stepElementIndex = 0;
            if (tourSectionIndex === sectionIndex) {
              stepElementIndex = elementIndex;
            } else if (tourSectionIndex < sectionIndex) {
              stepElementIndex = currentSectionLength - 1;
            }

            // determining the name of the item to display
            // if if is the current section, an indication for
            // the element position in the current section is given
            let stepName = tourSection.sectionName;
            if (tourSectionIndex === sectionIndex) {
              stepName += ` (${stepElementIndex + 1}/${currentSectionLength})`;
            }

            return (
              <Step
                key={tourSection.sectionName}
                name={stepName}
                current={tourSectionIndex === sectionIndex}
                done={tourSectionIndex < sectionIndex}
                onStepClick={handleStepClick}
                horizontal
              />
            );
          })}
        </Steps>
      </div>
    </div>
  );
};

// defining proptypes
TourView.propTypes = {
  tourData: PropTypes.array.isRequired,
  compareTourData: PropTypes.array,
  onClose: PropTypes.func.isRequired,
  sectionIndex: PropTypes.number,
  elementIndex: PropTypes.number,
};

// defining default props
TourView.defaultProps = {
  sectionIndex: 0,
  elementIndex: 0,
  compareTourData: null,
};

export default TourView;
