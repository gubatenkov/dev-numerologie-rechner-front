import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Interweave from 'interweave';

import '../styles/TourView.css';

import Panel from './Panel';
import Steps from './Steps';
import Step from './Step';

const TourView = (props) => {
  // getting used values out of props
  const {
    sectionIndex,
    elementIndex,
    tourData,
    compareTourData,
    onClose,
    onIndexChange,
    isOpen,
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
        tourData[sectionIndex - 1].sectionElements.length - 1,
      );
    }
  };

  // handler for click on the next button
  const handleNextClick = () => {
    // navigate within section
    if (elementIndex < tourData[sectionIndex].sectionElements.length - 1) {
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
    // updating body class of the site to prevent scrolling
    document.body.classList.toggle('noScroll', isOpen);

    // if modal is shown, getting focus so key inputs work
    if (componentContainer && componentContainer.current && isOpen) {
      componentContainer.current.focus();
    }
  });

  /**
   * extracts the title and content from the passed result element
   * and returns both parameters as array
   * @param element the result element to build title and content from
   */
  const buildElementContent = (element) => {
    // if no element passed => returning null for all value
    if (!element) {
      return [null, null];
    }
    // determining title and content of element
    let elementTitle;
    let elementContent;
    if (element.type === 'row') {
      // if element is default result => using standard result
      // title is name and value
      elementTitle = `${element.name} = ${element.result.value
        || element.result.values
        || element.result.list}`;

      // content is description
      elementContent = element.descriptionText;
    } else {
      // title needs to be extracted from custom element
      elementTitle = `${element.values[element.nameIndex]} = ${
        element.values[element.valueIndex]
      }`;

      // description text needs to be extracted from custom values
      elementContent = element.values[element.descriptionTextIndex];
    }

    return [elementTitle, elementContent];
  };

  // if detail view not open -> not showing it
  if (isOpen === false) {
    return null;
  }

  // getting current element
  const currentElement = tourData[sectionIndex].sectionElements[elementIndex];

  // getting current compare element if persent
  let currentCompareElement;
  if (compareTourData) {
    currentCompareElement = compareTourData[sectionIndex].sectionElements[elementIndex];
  }

  // if for some reason, the current element is invalid > rendering nothing
  if (!currentElement || (compareTourData && !currentCompareElement)) {
    return null;
  }

  // determining title and content of elements
  const [elementTitle, elementContent] = buildElementContent(currentElement);
  const [compareElementTitle, compareElementContent] = buildElementContent(
    currentCompareElement,
  );

  return (
    <div
      className="TourView__Container modal-backdrop"
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex="0"
      ref={componentContainer}
    >
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
          <Panel className="TourView__Panel" title={elementTitle}>
            <div className="TourView__text TourView--non-printable" />
            <Interweave content={elementContent} />
            <h3 className="TourView--printWatermark">
              Die Resultate können nur mit Druckpaket ausgedruckt werden.
            </h3>
          </Panel>
        </div>
        {compareTourData && (
          <div className="">
            <Panel
              className="TourView__Panel"
              title={compareElementTitle}
            >
              <div className="TourView__text TourView--non-printable">
                <Interweave
                  content={
                    _.isEqual(currentCompareElement, currentElement)
                      ? 'Gleich wie links.'
                      : compareElementContent
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
    </div>
  );
};

// defining proptypes
TourView.propTypes = {
  tourData: PropTypes.array.isRequired,
  compareTourData: PropTypes.array,
  isOpen: PropTypes.bool.isRequired,
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