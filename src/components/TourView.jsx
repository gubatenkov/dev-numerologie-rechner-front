import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Interweave from "interweave";
import styled from "styled-components";
import _ from "lodash";

import IconButton from "./Buttons/IconButton";
import { Steps, Step } from "./Steps";
import UserLevelPromotionWidget from "./UserLevelPromotionWidget";
import BookPromotionWidget from "./BookPromotionWidget";
import ResultLockedWidget from "./ResultLockedWidget";

// icons
import iconBackPrimary from "../images/icon_back_primary.svg";
import iconForwardPrimary from "../images/icon_forward_primary.svg";

// treshhold for mobile view
import {
  MAIN_CONTAINER_MAX_WIDTH,
  MOBILE_RESOLUTION_THRESHOLD
} from "../utils/Constants";
import { shouldShowDuplicatedComparisonResult } from "../pdf/PdfBuilder";

// constants used for content styling
const CONTENT_STYLING_CLASS_SUBHEADING = "subheading";
const CONTENT_STYLING_CLASS_DESCRIPTION = "descriptionText";
const CONTENT_STYLING_CLASS_NAME_HEADER = "nameHeading";
const CONTENT_STYLING_CLASS_HEADER = "resultHeading";
const CONTENT_STYLING_CLASS_HEADER_RESULTNUMBER = "resultNumber";
const DESKTOP_TOUR_OVERVIEW_HEIGHT_PX = 80;
const MOBILE_TOUR_OVERVIEW_HEIGHT_PX = 80; // TODO: Make less

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
  font-family: ${props => props.theme.fontFamily};
  color: ${props => props.theme.black};
  font-size: 18px;
  line-height: 30px;

  /* if the text contains tables => they won't be responsive => this puts at least a scrollbar on them*/
  overflow-x: auto;

  /* adapting margins on mobile */
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    margin: 0 16px 15px 16px;
    padding-bottom: 0px;
  }

  /* content specific styling (dynamically parsed from server)*/
  .${CONTENT_STYLING_CLASS_SUBHEADING} {
    color: ${props => props.theme.lighterGrey};
  }

  .${CONTENT_STYLING_CLASS_DESCRIPTION} {
    margin-top: 20px;
  }

  .${CONTENT_STYLING_CLASS_NAME_HEADER} {
    color: ${props => props.theme.lighterGrey};
  }

  .${CONTENT_STYLING_CLASS_HEADER} {
    margin-top: 120px;
    font-size: 32px;
    font-weight: 400;

    div {
      display: inline;
    }
  }

  .${CONTENT_STYLING_CLASS_HEADER_RESULTNUMBER} {
    font-size: 48px;
    font-weight: 500;
  }

  .marginTop90 {
    margin-top: 90px;
  }

  // /* rules provided by Clemens (client) for styling of content coming from backend*/
  // h1,
  // h2,
  // h3,
  // h4,
  // h5,
  // h6,
  // p,
  // ul,
  // li {
  //   font-family: Open sans;
  // }
  //
  h1 {
    @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
      font-size: 30px;
    }
    margin-bottom: 2rem;
  }

  h2 {
    line-height: 1.3em;
    margin-top: 50px;
    margin-bottom: 30px;
    @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
      font-size: 24px;
      margin-top: 30px;
    }
  }

  // h3 {
  //   font-size: 21px;
  //   color: #aaa;
  //   line-height: 30px;
  //   margin-top: 30px !important;
  // }
`;

// promotion are to the right
const PromotionArea = styled.div`
  /* fixed size that cannot shrink or grow */
  flex-basis: 300px;
  flex-grow: 0;
  flex-shrink: 0;

  margin-right: 35px;

  /* adapting margins on mobile and letting container grow on own row */
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    margin: 0 16px ${MOBILE_TOUR_OVERVIEW_HEIGHT_PX}px 16px;
    flex-grow: 1;
  }
`;

const TourOverViewOuterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: ${DESKTOP_TOUR_OVERVIEW_HEIGHT_PX}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TourOverViewInnerWrapper = styled.div`
  width: ${MAIN_CONTAINER_MAX_WIDTH}px;
`;

// container for the fixed overview component at the bottom
const TourOverView = styled.div`
  /* basic box styling */
  height: 100%;
  width: 100%;

  padding-left: 30px;
  padding-right: 30px;

  background-color: ${props => props.theme.white};
  border-top: solid ${props => props.theme.primaryLight} 1px;

  /* element ist structured as grid with three columns*/
  display: grid;
  grid-template-columns: 36px auto 36px;
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
  width: 100%;
  height: 44px;

  justify-content: center;

  /* aligning center */
  justify-self: center;
  align-self: center;

  /* setting custom margins*/
  margin-top: 20px;
  margin-bottom: 16px;
`;

// tour view component allowing users to explore their analysis results
const TourView = props => {
  // getting used values out of props
  const {
    sectionIndex,
    elementIndex,
    tourData,
    compareTourData,
    onIndexChange,
    name,
    compareName
  } = props;

  // handler for clicks on the steps directly in the overview
  const handleStepClick = sectionTitleClicked => {
    // getting index of section title clicked and setting it's index as current section index
    const index = tourData.findIndex(
      item => item.sectionName === sectionTitleClicked
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
        tourData[sectionIndex - 1].sectionElements.length - 1
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
  const handleKeyDown = event => {
    switch (event.key) {
      // determining which key was pressed
      case "ArrowRight":
        handleNextClick();
        return;
      case "ArrowLeft":
        handleBackClick();
        break;
      case "Escape":
        props.onClose();
        break;
      default:
    }
  };

  // ref to root container to focus upon mount (needed for shortcuts to work)
  const componentContainer = useRef();

  // disabling/enabling scrolling and focus for key input if is shown/hidden
  useEffect(() => {
    // if tour is visible => focusing container so key inputs work
    if (componentContainer && componentContainer.current) {
      componentContainer.current.focus();
    }
  });

  // scrolling to top after change in step
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  /**
   * builds a tour element for an introduction text into a section
   * @param sectionIntro the section intro object
   */
  const buildIntroTextTourStep = sectionIntro => {
    // building title and content for introduction text to section
    const elementTitle = `Einführung ${sectionIntro.title}`;
    const elementContent = sectionIntro.text;
    console.log("sec intro:", sectionIntro.text);
    // returning result
    return [elementTitle, elementContent];
  };

  /**
   * build title and content for a number result item and returns it as an array
   * @param numberResult the result element to build title and content from
   */
  const buildNumberTourStep = numberResult => {
    // if element is default result => using standard result
    // title is name and value
    const elementTitle = `${numberResult.name} ${numberResult.result.value ||
      numberResult.result.list ||
      ""}`;
    // if item is locked => returning promotion
    if (numberResult.descriptionText.length === 0) {
      // returning title and locked widget element
      return [elementTitle, null];
    }

    // building content based on user preferences
    let elementContent = "";

    // adding number explanation text if configured
    if (!props.user || props.user.showNumberMeaningExplanations) {
      if (numberResult.numberDescription.description) {
        elementContent += `<p class="${CONTENT_STYLING_CLASS_SUBHEADING}">${numberResult.numberDescription.description}</p>`;
      }
    }

    // adding number calcuation explanation text if configured
    if (props.user && props.user.showNumberCalculationExplanations) {
      if (numberResult.numberDescription.calculationDescription) {
        elementContent += !!numberResult.numberDescription
          .calculationDescription
          ? `<p class="${CONTENT_STYLING_CLASS_SUBHEADING}">${numberResult.numberDescription.calculationDescription} </p>`
          : "";
      }
    }

    // adding description text of result
    elementContent += `<p class=${CONTENT_STYLING_CLASS_DESCRIPTION}>${numberResult.descriptionText}</p>`;

    elementContent = elementContent
      .split("<H1>")
      .join('<H1 class="marginTop90">');

    return [elementTitle, elementContent];
  };

  /**
   * build title and content for two number result items in compare mode and returns it as an array
   * @param numberResult the result element
   * @param numberCompareResult the compare result element
   */
  const buildNumberTourCompareStep = (numberResult, numberCompareResult) => {
    // title is name
    const elementTitle = numberResult.name;

    // if item is locked => returning promotion
    if (numberResult.descriptionText.length === 0) {
      return [elementTitle, null];
    }

    // building content based on user preferences
    let elementContent = "";

    // adding number explanation text if configured
    if (!props.user || props.user.showNumberMeaningExplanations) {
      if (numberResult.numberDescription.description) {
        elementContent += `<p class="${CONTENT_STYLING_CLASS_SUBHEADING}">${numberResult.numberDescription.description}</p>`;
      }
    }

    // adding number calcuation explanation text if configured
    if (props.user && props.user.showNumberCalculationExplanations) {
      if (numberResult.numberDescription.calculationDescription) {
        elementContent += `<p class="${CONTENT_STYLING_CLASS_SUBHEADING}">${numberResult.numberDescription.calculationDescription} </p>`;
      }
    }

    // adding result for first name
    elementContent += `<div class=${CONTENT_STYLING_CLASS_HEADER}><div class=${CONTENT_STYLING_CLASS_HEADER_RESULTNUMBER}>${numberResult
      .result.value ||
      numberResult.result.list ||
      ""} </div><div class="${CONTENT_STYLING_CLASS_NAME_HEADER}">${name}</div></div> `;

    // adding description text for first name
    elementContent += `<p class=${CONTENT_STYLING_CLASS_DESCRIPTION}>${numberResult.descriptionText}</p>`;

    // adding result for second name
    elementContent += `<div class=${CONTENT_STYLING_CLASS_HEADER}><div>${numberCompareResult
      .result.value ||
      numberCompareResult.result.list ||
      ""} </div><div class="${CONTENT_STYLING_CLASS_NAME_HEADER}">${compareName}</div></div> `;

    // if results for both names are equal => only showing info text.
    // otheriwse including description text for second name
    if (_.isEqual(numberResult.result, numberCompareResult.result)) {
      elementContent +=
        "</br> Die Beschreibung dieser Zahl entspricht der vorherigen Zahlbeschreibung oben.";
    } else {
      // adding description text for second name
      elementContent += `<p class=${CONTENT_STYLING_CLASS_DESCRIPTION}>${numberCompareResult.descriptionText}</p>`;
    }

    elementContent = elementContent
      .split("<H1>")
      .join('<H1 class="marginTop90">');

    return [elementTitle, elementContent];
  };

  // defining content and compare content
  let tourStepTitle;
  let tourStepContent;

  // determining if book promotion should be shown (not for intro text and based on user config)
  let showBookPromotion = !props.user || props.user.showBookRecommendations;
  // getting result item to render given current section and element index
  const resultItem = tourData[sectionIndex].sectionElements[elementIndex];

  // if first element => building intro text element
  if (resultItem.type === "sectionIntroText") {
    // building step from section intro
    [tourStepTitle, tourStepContent] = buildIntroTextTourStep(resultItem);

    // not showing book promotion for intro text
    showBookPromotion = false;
  } else {
    // no compare result
    if (
      !compareTourData ||
      !shouldShowDuplicatedComparisonResult(resultItem.numberId)
    ) {
      // building tour step for result item
      [tourStepTitle, tourStepContent] = buildNumberTourStep(resultItem);
    } else {
      // getting compare item
      const compareResultItem =
        compareTourData[sectionIndex].sectionElements[elementIndex];

      // building compare content
      [tourStepTitle, tourStepContent] = buildNumberTourCompareStep(
        resultItem,
        compareResultItem
      );
    }
  }

  return [
    <TourContentContainer
      onKeyDown={event => handleKeyDown(event)}
      ref={componentContainer}
      tabIndex="0"
      key="tourContainer"
    >
      <Spacer />
      <ContentArea>
        <h1>{tourStepTitle}</h1>
        {tourStepContent ? (
          <Interweave
            content={tourStepContent}
            filters={[
              {
                // filtering out tables in intro texts as not responsive
                node: (name, node) => (name === "table" ? null : node)
              }
            ]}
          />
        ) : (
          <ResultLockedWidget accessLevel={props.accessLevel} />
        )}
      </ContentArea>
      <PromotionArea>
        <UserLevelPromotionWidget accessLevel={props.accessLevel} />
        {showBookPromotion && (
          <BookPromotionWidget
            resultTitle={tourStepTitle}
            bookReference={resultItem.bookReference}
          />
        )}
      </PromotionArea>
    </TourContentContainer>,
    <TourOverViewOuterWrapper key="tourOverviewWrapper">
      <TourOverViewInnerWrapper>
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
                currentIndex={sectionIndex}
                stepIndex={tourSectionIndex}
                // active={tourSectionIndex <= sectionIndex}
                onStepClick={name => handleStepClick(name)}
              />
            ))}
          </TourOverviewSteps>
          <TourOverViewForwardButton
            imageIcon={iconForwardPrimary}
            onClick={() => handleNextClick()}
          />
        </TourOverView>
      </TourOverViewInnerWrapper>
    </TourOverViewOuterWrapper>
  ];
};

// defining proptypes
TourView.propTypes = {
  tourData: PropTypes.array.isRequired,
  compareTourData: PropTypes.array,
  onClose: PropTypes.func.isRequired,
  sectionIndex: PropTypes.number.isRequired,
  elementIndex: PropTypes.number.isRequired,
  user: PropTypes.object,
  accessLevel: PropTypes.string.isRequired
};

// defining default props
TourView.defaultProps = {
  sectionIndex: 0,
  elementIndex: 0,
  compareTourData: null
};

export default TourView;
