import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Interweave from "interweave";
import styled from "styled-components";
import _ from "lodash";
import { useTranslation } from "react-i18next";

import IconButton from "./Buttons/IconButton";
import { Steps, Step } from "./Steps";
import UserLevelPromotionWidget from "./UserLevelPromotionWidget";
import BookPromotionWidget from "./BookPromotionWidget";
import ResultLockedWidget from "./ResultLockedWidget";

import iconBackPrimary from "../images/icon_back_primary.svg";
import iconForwardPrimary from "../images/icon_forward_primary.svg";

import {
  MAIN_CONTAINER_MAX_WIDTH,
  MOBILE_RESOLUTION_THRESHOLD
} from "../utils/Constants";
import { shouldShowDuplicatedComparisonResult } from "../pdf/PdfBuilder";
import { TourOverViewMobileStep } from "./TourOverviewMobileStep";

const CONTENT_STYLING_CLASS_SUBHEADING = "subheading";
const CONTENT_STYLING_CLASS_DESCRIPTION = "descriptionText";
const CONTENT_STYLING_CLASS_NAME_HEADER = "nameHeading";
const CONTENT_STYLING_CLASS_HEADER = "resultHeading";
const CONTENT_STYLING_CLASS_HEADER_RESULTNUMBER = "resultNumber";
const DESKTOP_TOUR_OVERVIEW_HEIGHT_PX = 80;
const MOBILE_TOUR_OVERVIEW_HEIGHT_PX = 80; // TODO: Make less

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

const TourOverViewButton = styled(IconButton)`
  /* adapting size and alignemnt*/
  width: 36px;
  height: 36px;
  align-self: center;

  margin-top: 22px;
  margin-bottom: 22px;
`;

const TourOverViewBackButton = styled(TourOverViewButton)`
  /* colmn to the very left */
  grid-column-start: 1;
`;

const TourOverViewForwardButton = styled(TourOverViewButton)`
  /* column to the very right */
  grid-column-start: 3;
`;

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

const TourView = props => {
  const { t } = useTranslation();
  const {
    sectionIndex,
    elementIndex,
    tourData,
    compareTourData,
    onIndexChange,
    name,
    compareName
  } = props;

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleStepClick = sectionTitleClicked => {
    const index = tourData.findIndex(
      item => item.sectionName === sectionTitleClicked
    );

    if (index > -1) {
      onIndexChange(index, 0);
    }
  };

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

  const handleNextClick = () => {
    if (elementIndex < tourData[sectionIndex].sectionElements.length - 1) {
      onIndexChange(sectionIndex, elementIndex + 1);
    } else if (sectionIndex < tourData.length - 1) {
      onIndexChange(sectionIndex + 1, 0);
    }
  };

  const handleKeyDown = event => {
    switch (event.key) {
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

  useEffect(() => {
    // if tour is visible => focusing container so key inputs work
    if (componentContainer && componentContainer.current) {
      componentContainer.current.focus();
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const buildIntroTextTourStep = sectionIntro => {
    const elementTitle = t("INTRO_TOUR_STEP_TITLE", {
      title: sectionIntro.title
    });
    const elementContent = sectionIntro.text;

    return [elementTitle, elementContent];
  };

  const buildNumberTourStep = numberResult => {
    const elementTitle = `${numberResult.name} ${numberResult.result.value ||
      numberResult.result.list ||
      ""}`;

    if (numberResult.descriptionText.length === 0) {
      return [elementTitle, null];
    }

    let elementContent = "";

    if (!props.user || props.user.showNumberMeaningExplanations) {
      if (numberResult.numberDescription.description) {
        elementContent += `<p class="${CONTENT_STYLING_CLASS_SUBHEADING}">${numberResult.numberDescription.description}</p>`;
      }
    }

    if (props.user && props.user.showNumberCalculationExplanations) {
      if (numberResult.numberDescription.calculationDescription) {
        elementContent += !!numberResult.numberDescription
          .calculationDescription
          ? `<p class="${CONTENT_STYLING_CLASS_SUBHEADING}">${numberResult.numberDescription.calculationDescription} </p>`
          : "";
      }
    }

    elementContent += `<p class=${CONTENT_STYLING_CLASS_DESCRIPTION}>${numberResult.descriptionText}</p>`;

    elementContent = elementContent
      .split("<H1>")
      .join('<H1 class="marginTop90">');

    return [elementTitle, elementContent];
  };

  const buildNumberTourCompareStep = (numberResult, numberCompareResult) => {
    const elementTitle = numberResult.name;

    if (numberResult.descriptionText.length === 0) {
      return [elementTitle, null];
    }

    let elementContent = "";

    if (!props.user || props.user.showNumberMeaningExplanations) {
      if (numberResult.numberDescription.description) {
        elementContent += `<p class="${CONTENT_STYLING_CLASS_SUBHEADING}">${numberResult.numberDescription.description}</p>`;
      }
    }

    if (props.user && props.user.showNumberCalculationExplanations) {
      if (numberResult.numberDescription.calculationDescription) {
        elementContent += `<p class="${CONTENT_STYLING_CLASS_SUBHEADING}">${numberResult.numberDescription.calculationDescription} </p>`;
      }
    }

    elementContent += `<div class=${CONTENT_STYLING_CLASS_HEADER}><div class=${CONTENT_STYLING_CLASS_HEADER_RESULTNUMBER}>${numberResult
      .result.value ||
      numberResult.result.list ||
      ""} </div><div class="${CONTENT_STYLING_CLASS_NAME_HEADER}">${name}</div></div> `;

    elementContent += `<p class=${CONTENT_STYLING_CLASS_DESCRIPTION}>${numberResult.descriptionText}</p>`;

    elementContent += `<div class=${CONTENT_STYLING_CLASS_HEADER}><div class=${CONTENT_STYLING_CLASS_HEADER_RESULTNUMBER}>${numberCompareResult
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

  let tourStepTitle;
  let tourStepContent;

  let shortTourStepTitle = "";

  let showBookPromotion = !props.user || props.user.showBookRecommendations;
  const resultItem = tourData[sectionIndex].sectionElements[elementIndex];

  if (resultItem.type === "sectionIntroText") {
    [tourStepTitle, tourStepContent] = buildIntroTextTourStep(resultItem);
    shortTourStepTitle = resultItem.title;

    showBookPromotion = false;
  } else {
    shortTourStepTitle = resultItem.name;

    if (
      !compareTourData ||
      !shouldShowDuplicatedComparisonResult(resultItem.numberId)
    ) {
      [tourStepTitle, tourStepContent] = buildNumberTourStep(resultItem);
    } else {
      const compareResultItem =
        compareTourData[sectionIndex].sectionElements[elementIndex];

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
          <TourOverViewMobileStep
            tourStepTitle={shortTourStepTitle}
            onClick={scrollToTop}
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

TourView.propTypes = {
  tourData: PropTypes.array.isRequired,
  compareTourData: PropTypes.array,
  onClose: PropTypes.func.isRequired,
  sectionIndex: PropTypes.number.isRequired,
  elementIndex: PropTypes.number.isRequired,
  user: PropTypes.object,
  accessLevel: PropTypes.string.isRequired
};

TourView.defaultProps = {
  sectionIndex: 0,
  elementIndex: 0,
  compareTourData: null
};

export default TourView;
