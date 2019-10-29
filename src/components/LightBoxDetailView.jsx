import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import '../styles/LightBoxDetailView.css';

import Panel from './Panel';
import Steps from './Steps';
import Step from './Step';

function LightBoxDetailView(props) {
  // getting used values out of props
  const {
    sectionIndex,
    elementIndex,
    data,
    compareData,
    onClose,
    isOpen,
  } = props;

  // defining and initializing state variables
  const [currentSectionIndex, setCurrentSectionIndex] = useState(sectionIndex);
  const [currentElementIndex, setCurrentElementIndex] = useState(elementIndex);

  // handler for clicks on the steps directly in the overview
  const handleStepClick = (sectionTitleClicked) => {
    // getting index of section title clicked and setting it's index as current section index
    const index = props.data.findIndex(
      (item) => item.sectionName === sectionTitleClicked,
    );
    if (index > -1) {
      setCurrentSectionIndex(index);
      setCurrentElementIndex(0);
    }
  };

  // handler for clicking on back button
  const handleBackClick = () => {
    if (currentElementIndex > 0) {
      setCurrentElementIndex(currentElementIndex - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentElementIndex(
        props.data[currentSectionIndex - 1].sectionElements.length - 1,
      );
    }
  };

  // handler for click on the next button
  const handleNextClick = () => {
    // navigate within section
    if (
      currentElementIndex
      < data[currentSectionIndex].sectionElements.length - 1
    ) {
      setCurrentElementIndex(currentElementIndex + 1);
    // navigate to first element of next section
    } else if (currentSectionIndex < data.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentElementIndex(0);
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

  // re-initializing in two cases:
  //  a) section or element of prop changes
  //  b) lightbox is opened or closed
  useEffect(() => {
    setCurrentSectionIndex(sectionIndex);
    setCurrentElementIndex(elementIndex);
  }, [sectionIndex, elementIndex, isOpen]);

  // disabling/enabling scrolling and focus for key input if is shown/hidden
  useEffect(() => {
    // updating body class of the site to prevent scrolling
    document.body.classList.toggle('noScroll', isOpen);

    // if modal is shown, getting focus so key inputs work
    if (componentContainer && componentContainer.current && isOpen) {
      componentContainer.current.focus();
    }
  });

  // if detail view not open -> not showing it
  if (isOpen === false) {
    return null;
  }

  // getting current element
  const currentElement = data[currentSectionIndex].sectionElements[currentElementIndex];

  // getting current compare element if persent
  let currentCompareElement;
  if (compareData) {
    currentCompareElement = compareData[currentSectionIndex].sectionElements[currentElementIndex];
  }

  // if for some reason, the current element is invalid > rendering nothing
  if (!currentElement || (compareData && !currentCompareElement)) {
    return null;
  }

  return (
    <div
      className="LightBoxDetailView__Container modal-backdrop"
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex="0"
      ref={componentContainer}
    >
      <div className="LightBoxDetailView__ContentOverview">
        <Steps horizontal>
          {data.map((item, index) => {
            // getting length of current section (only elements that have content)
            const currentSectionLength = item.sectionElements.length;

            // determining index to display for step
            let stepElementIndex = 0;
            if (index === currentSectionIndex) {
              stepElementIndex = currentElementIndex;
            } else if (index < currentSectionIndex) {
              stepElementIndex = currentSectionLength - 1;
            }

            // determining the name of the item to display
            // if if is the current section, an indication for
            // the element position in the current section is given
            let stepName = item.sectionName;
            if (index === currentSectionIndex) {
              stepName += ` (${stepElementIndex + 1}/${currentSectionLength})`;
            }

            return (
              <Step
                key={item.sectionName}
                name={stepName}
                current={index === currentSectionIndex}
                done={index < currentSectionIndex}
                onStepClick={handleStepClick}
                horizontal
              />
            );
          })}
        </Steps>
      </div>
      <div className="LightBoxDetailView__Content">
        <div className="LightBoxDetailView__ButtonArea">
          <button
            type="button"
            className="LightBoxDetailView__NavigationButton"
            onClick={handleBackClick}
          >
            <i className="icon wb-chevron-left" />
          </button>
        </div>
        <div>
          <Panel
            className="LightBoxDetailView__Panel"
            title={currentElement.elementTitle}
          >
            <div
              className="LightBoxDetailView__text LightBoxDetailView--non-printable"
              dangerouslySetInnerHTML={{
                __html: currentElement.elementContent,
              }}
            />
            <h3 className="LightBoxDetailView--printWatermark">
              Die Resultate können nur mit Druckpaket ausgedruckt werden.
            </h3>
          </Panel>
        </div>
        {props.compareData && (
          <div className="">
            <Panel
              className="LightBoxDetailView__Panel"
              title={currentCompareElement.elementTitle}
            >
              <div
                className="LightBoxDetailView__text LightBoxDetailView--non-printable"
                dangerouslySetInnerHTML={{
                  __html: _.isEqual(currentCompareElement, currentElement)
                    ? 'Gleich wie links.'
                    : currentCompareElement.elementContent,
                }}
              />
              <h3 className="LightBoxDetailView--printWatermark">
                Die Resultate können nur mit Druckpaket ausgedruckt werden.
              </h3>
            </Panel>
          </div>
        )}
        <div className="LightBoxDetailView__ButtonArea">
          <button
            type="button"
            className="LightBoxDetailView__NavigationButton"
            onClick={handleNextClick}
          >
            <i className="icon wb-chevron-right" />
          </button>
        </div>
      </div>
      <div className="LightBoxDetailView__BottomActions">
        <button type="button" className="btn btn-default" onClick={onClose}>
          Schließen
        </button>
      </div>
    </div>
  );
}

// defining proptypes
LightBoxDetailView.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      sectionName: PropTypes.string.isRequired,
      sectionElements: PropTypes.arrayOf(
        PropTypes.shape({
          elementTitle: PropTypes.string.isRequired,
          elementContent: PropTypes.string.isRequired,
        }),
      ),
    }),
  ).isRequired,
  compareData: PropTypes.arrayOf(
    PropTypes.shape({
      sectionName: PropTypes.string.isRequired,
      sectionElements: PropTypes.arrayOf(
        PropTypes.shape({
          elementTitle: PropTypes.string.isRequired,
          elementContent: PropTypes.string.isRequired,
        }),
      ),
    }),
  ),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  sectionIndex: PropTypes.number,
  elementIndex: PropTypes.number,
};

// defining default props
LightBoxDetailView.defaultProps = {
  sectionIndex: 0,
  elementIndex: 0,
  compareData: null,
};

export default LightBoxDetailView;
