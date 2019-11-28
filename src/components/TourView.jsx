import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Interweave from 'interweave';
import styled from 'styled-components';

import IconButton from './Buttons/IconButton';
import { Steps, Step } from './Steps';

// icons
import iconBackPrimary from '../images/icon_back_primary.svg';
import iconForwardPrimary from '../images/icon_forward_primary.svg';

// images for promotions
import book1Cover from '../images/book_1.svg';
import book2Cover from '../images/book_2.svg';

// treshhold for mobile view
import { MOBILE_RESOLUTION_THRESHOLD } from '../utils/Constants';

// constants used for content styling
const CONTENT_STYLING_CLASS_SUBHEADING = 'subheading';
const CONTENT_STYLING_CLASS_BOOK_REFERENCE = 'bookReference';
const CONTENT_STYLING_CLASS_DESCRIPTION = 'descriptionText';

// main container for view layout
const TourContentContainer = styled.div`
  /* one row that contains a spacer (invisible), the content and the promotion sidebar*/
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  /* this element is focused upon opening the tour as the keydown handlers for
  shortcuts are registered to it. To prevent a blue shadow from the focused element, this is needed*/
  :focus {
    border: none;
    outline: none;
  }

  /* enabling wrapping on mobile phones */
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    flex-wrap: wrap;
  }
`;

// an invisible spacer element to the left
const Spacer = styled.div`
  /* max size of 300px and the only element in the row that shrinks*/
  flex-basis: 300px;

  /* cannot take any additional space and shrinks as only element */
  flex-grow: 0;
  flex-shrink: 1;

  /* hiding on mobile phones*/
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    display: none;
  }
`;

// the content element rendering the result text
// Note: this contains styling for the container but also
// for how result text coming from the server as HTML is styled
const ContentArea = styled.div`
  /* takes up all space in the row with minimum size */
  flex-grow: 1;
  flex-basis: 630px;

  /* basic box rules */
  margin: 0 70px 15px 70px;
  padding-bottom: 80px;

  /* styling standard text within container*/
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.black};
  font-size: 18px;
  line-height: 30px;

  /* adapting margins on mobile */
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    margin: 0 16px 15px 16px;
  }

  /* content specific styling*/
  .${CONTENT_STYLING_CLASS_SUBHEADING} {
    color: ${(props) => props.theme.lighterGrey};
  }

  .${CONTENT_STYLING_CLASS_DESCRIPTION} {
    margin-top: 20px;
  }

  h1 {
    font-size: 48px;
    font-weight: 500;
    line-height: 58px;
  }

  h2 {
    margin-top: 10px;
  }

  h3 {
    margin-top: 10px;
  }
`;

// promotion are to the right
const PromotionArea = styled.div`
  /* fixed size that cannot shrink or grow */
  flex-basis: 300px;
  flex-grow: 0;
  flex-shrink: 0;

  margin-right: 35px;
`;

// promotion container for the next user level
const UserlevelPromotion = styled.div`
  width: 300px;
  height: 350px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.lightestGrey};
`;

// promotion container for the book
const BookPromotion = styled.div`
  width: 300px;
  border-radius: 6px;

  /* basic background color*/
  background-color: ${(props) => props.theme.lightestGrey};

  /* partial color as background image*/
  background-image: linear-gradient(
    0deg,
    #8fbd36,
    #8fbd36 33%,
    transparent 33%,
    transparent 100%
  );

  padding: 16px;
  margin-top: 30px;

  color: #323232;
  font-family: Roboto;

  background-image: linear-gradient(
    top,
    red,
    red 70%,
    transparent 70%,
    transparent 100%
  );

  h4 {
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
  }

  p {
    font-size: 16px;
    line-height: 26px;
  }
`;

const BookPromotionImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

// container for the fixed overview component at the bottom
const TourOverView = styled.div`
  /* basic box styling */
  height: 80px;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  background-color: ${(props) => props.theme.white};
  border-top: solid ${(props) => props.theme.primaryLight} 1px;

  /* element stays fixed at the bottom of view */
  position: fixed;
  bottom: 0;

  /* element ist structured as grid with three columns*/
  display: grid;
  grid-template-columns: 36px auto 36px;

  /* hiding on mobile phones*/
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    display: none;
  }
`;

// button used in the tour overview
const TourOverViewButton = styled(IconButton)`
  /* adapting size and alignemnt*/
  width: 36px;
  height: 36px;
  align-self: center;

  margin-top: 22px;
  margin-bottom: 22px;
`;

// button to the left to navigate back
const TourOverViewBackButton = styled(TourOverViewButton)`
  /* colmn to the very left */
  grid-column-start: 1;
`;

// button to the right to navigate forth
const TourOverViewForwardButton = styled(TourOverViewButton)`
  /* column to the very right */
  grid-column-start: 3;
`;

// customizing steps component to fit into layout
const TourOverviewSteps = styled(Steps)`
  /* fixed size */
  width: 804px;
  height: 44px;

  /* aligning center */
  justify-self: center;
  align-self: center;

  /* setting custom margins*/
  margin-top: 20px;
  margin-bottom: 16px;
`;

// tour view component allowing users to explore their analysis results
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

  // ref to root container to focus upon mount (needed for shortcuts to work)
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
      || numberResult.result.list
      || ''}`;

    // if item is locked => returning promotion
    if (numberResult.descriptionText.length === 0) {
      // TODO: add promotion elements here
      return [elementTitle, null];
    }

    // building content based on user preferences
    let elementContent = '';

    // adding number explanation text if configured
    if (props.user.showNumberMeaningExplanations) {
      elementContent += `<p class="${CONTENT_STYLING_CLASS_SUBHEADING}">${numberResult.numberDescription.description}</p>`;
    }

    // adding number calcuation explanation text if configured
    if (props.user.showNumberCalculationExplanations) {
      elementContent += `<p class="${CONTENT_STYLING_CLASS_SUBHEADING}">${numberResult.numberDescription.calculationDescription} </p>`;
    }

    // adding description text of result
    elementContent += `<p class=${CONTENT_STYLING_CLASS_DESCRIPTION}>${numberResult.descriptionText}</p>`;

    // adding book references if configured
    if (props.user.showBookReferences) {
      elementContent += `<p class=${CONTENT_STYLING_CLASS_BOOK_REFERENCE}>${numberResult.bookReference}</p>`;
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

  // getting result item for render
  const resultItem = tourData[sectionIndex].sectionElements[elementIndex - 1];

  return [
    <TourContentContainer
      onKeyDown={(event) => handleKeyDown(event)}
      ref={componentContainer}
      tabIndex="0"
      key="tourContainer"
    >
      <Spacer></Spacer>
      <ContentArea>
        <h1>{tourStepTitle}</h1>
        <Interweave content={tourStepContent} />
      </ContentArea>
      <PromotionArea>
        <UserlevelPromotion>Userlevel Promotion</UserlevelPromotion>
        {elementIndex > 0 && (
          <BookPromotion>
            <h4>Defaillierte Beschreibungen</h4>
            <p>
              ...über Ihre <b>{`${tourStepTitle}`}</b> finden Sie in unserem
              Buch <Interweave content={resultItem.bookReference} />
            </p>

            <BookPromotionImageContainer>
              <img
                src={
                  resultItem.bookReference.includes('Band 1')
                    ? book1Cover
                    : book2Cover
                }
              />
            </BookPromotionImageContainer>
          </BookPromotion>
        )}
      </PromotionArea>
    </TourContentContainer>,
    <TourOverView key="tourOverview">
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
