import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";

import { withRouter } from "react-router-dom";
import _ from "lodash";
import styled from "styled-components";

// icons
import bookIconWhite from "../images/icon_openBook_white.svg";
import bookIconPrimary from "../images/icon_openBook_primary.svg";
import saveIconPrimary from "../images/icon_save_primary.svg";
import iconBackPrimary from "../images/icon_back_primary.svg";
import iconClosePrimary from "../images/icon_close_primary.svg";

// components
import TitleBar from "./TitleBar";
import NavigationBar from "./NavigationBar";
import ContentNavigation from "./ContentNavigation";
import ResultPanel from "./ResultPanel";
import ResultTable from "./ResultTable";
import TourView from "./TourView";
import TextButton from "./Buttons/TextButton";
import IconButton from "./Buttons/IconButton";
import NameInputDialog from "./dialogs/NameInputDialog";
import Footer from "./Footer";
import CreditsBuyModal from "./CreditsBuyModal";

import { MOBILE_RESOLUTION_THRESHOLD } from "../utils/Constants";

import {
  PERSONAL_RESULT_CONFIGURATION_DEFAULT,
  PERSONAL_RESULT_CONFIGURATION_DEFAULT_ID,
  getConfigurationForId
} from "../utils/Configuration";

import { introTextQuery } from "../graphql/Queries";

import { OVERALL_INTRO_KEY, TYPE_ID_MATRIX } from "../utils/Constants";

import ActionBar from "./ActionBar";
import LoadingIndicator from "./LoadingIndicator";
import MainContainer from "./MainContainer";

const ContentArea = styled.div`
  display: flex;
  align-content: flex-start;
  flex-direction: row;
`;

const ResultContent = styled.div`
  margin-right: 50px;
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    margin-right: 30px;
  }
  margin-left: 30px;
  width: 100%;
`;

/**
 * result screen for personal analysis
 */
const AnalysisResultPersonalRender = props => {
  // getting relevant parameters from props
  const { user } = props;
  const { resultConfigurationId } = props.match.params;

  // determining configuration for result
  // 3) if no user and param set => using default
  let resultConfig = PERSONAL_RESULT_CONFIGURATION_DEFAULT;
  let resultConfigId = PERSONAL_RESULT_CONFIGURATION_DEFAULT_ID;

  // 1) if param is set => using this one
  if (resultConfigurationId && getConfigurationForId(resultConfigurationId)) {
    resultConfig = getConfigurationForId(resultConfigurationId);
    resultConfigId = resultConfigurationId;
  }

  // 2) if no param set and user => using user default
  else if (
    user &&
    user.resultConfiguration &&
    getConfigurationForId(user.resultConfiguration)
  ) {
    resultConfig = getConfigurationForId(user.resultConfiguration);
    resultConfigId = user.resultConfiguration;
  }

  // filtering names of all intro texts
  const sectionIds = resultConfig.map(section => section.name);
  sectionIds.push(OVERALL_INTRO_KEY(resultConfigId));

  // fetching intro texts for given configuration sections
  const { loading, error, data } = useQuery(introTextQuery, {
    variables: {
      sectionIds,
      isPdf: false,
      longText: false
    }
  });

  // defining component state
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);
  const [tourSectionIndex, setTourSectionIndex] = useState(0);
  const [tourElementIndex, setTourElementIndex] = useState(0);

  if (loading) {
    return <LoadingIndicator text={"Erstelle Auswertung..."} />;
  }

  if (error) {
    return <LoadingIndicator text={"Error while fetching intro texts"} />;
  }

  // extracting intro texts from result
  const { introTexts } = data;

  /**
   * transforms the analysis results and configuration into a tour data structure used for the detailed tour
   * @param resultData the result data for the analysis
   * @param configuration the current result configuration
   * @param introTexts the intro texts of the current configuration to bake into the data structure as they are shown in the tour
   * @returns an array of tour sections containing section name and result items
   */
  const buildTourDataStructure = (
    resultData,
    configuration,
    introTexts,
    user
  ) =>
    // constructing tourSection element for every table in configuration
    configuration.map(resultSection => {
      // finding intro text for section
      const sectionIntroText = introTexts.filter(
        text => text.sectionId === resultSection.name
      )[0];

      // defining resulting elements for section in tour
      const resultSectionElements = [];

      // if section intro texts are enabled in user settings => pushing intro text element to result
      // also default if user not registered
      if (!user || user.showCategoryExplanations) {
        resultSectionElements.push({
          type: "sectionIntroText",
          title: sectionIntroText.title,
          text: sectionIntroText.text
        });
      }

      // iterating over result tables of sectionp
      resultSection.tables.forEach(resultTable => {
        // pushing resolved numbers
        resultSectionElements.push(
          ...resultTable.numberIds
            .map(numberId => ({
              ..._.get(resultData, numberId),
              type: "resultText"
            }))
            // filtering out matrix elements => those don't have a tour item
            .filter(item => item.result.type !== TYPE_ID_MATRIX)
            // filtering out empty elements as they don't have a tour item
            .filter(item => item.result.value || item.result.list.length > 0)
        );
      });

      // pushing resulting section  to result
      return {
        sectionName: resultSection.name,
        sectionElements: resultSectionElements
      };
    });

  /**
   * builds a data structure used for the content sidebar
   * @param configuration the current result configuration
   * @param result the result containing ann numbers in the configuration
   */
  const buildContentDataStructure = (configuration, result) =>
    // returning an array of section names and number names
    configuration.map(configSection => {
      // getting an array of all items in a section (across tables)
      const numberTitles = [];
      // iterating over tables, resolving values for ids
      configSection.tables.forEach(table =>
        numberTitles.push(
          ...table.numberIds.map(numberId => {
            // getting result of number id
            const numberResult = _.get(result, numberId);

            // extracting name and value for different types of row
            const { name } = numberResult;
            const value =
              numberResult.result.type === "number"
                ? numberResult.result.value
                : null;

            // constructing string of the form name = value to show in content
            const title = `${name} ${value ? `= ${value}` : ""}`;

            // returning element with title and anchor as number id
            // this anchor is set on the title and can be used for dynamic scrolling later
            return {
              title,
              anchor: numberResult.numberId
            };
          })
        )
      );

      // returning section item with name and numbers
      return {
        name: configSection.name,
        titles: numberTitles
      };
    });

  /**
   *  handles clicks on detail links
   * @param sectionId the name of the table the event was fired
   * @param rowIndex the index of the row inside the table the event was fired for
   */
  const handleItemDetailClick = (sectionId, numberId) => {
    //  getting tour structure
    const tourDataStructure = buildTourDataStructure(
      props.personalAnalysisResult,
      resultConfig,
      introTexts,
      user
    );

    // finding index with datakey in tour data structure
    let sectionIndex = tourDataStructure.findIndex(
      section => section.sectionName === sectionId
    );

    // if data not found => starting at first index
    if (sectionIndex < 0) {
      // starting at first section by default
      sectionIndex = 0;
    }

    // finding row index of item in section
    let elementIndex = tourDataStructure[
      sectionIndex
    ].sectionElements.findIndex(element => element.numberId === numberId);

    if (elementIndex < 0) {
      // starting at first element by default
      elementIndex = 0;
    }

    // opening detail view with right section index
    setIsTourOpen(true);
    setTourSectionIndex(sectionIndex);
    setTourElementIndex(elementIndex);
  };

  /**
   * handles the navigation to a specific item
   * @param anchor the id of the element in the dom to navigate to
   */
  const navigateToElementHandler = anchor => {
    // scrolling to item if present in DOM
    const domElement = document.getElementById(anchor);
    if (domElement) {
      domElement.scrollIntoView();
    }
  };

  /**
   * handles the saving of the displayed analysis given the input parameters
   */
  const handleSaveAnalysis = () => {
    // extracting props
    const { personalAnalysisResult, personalAnalysisCompareResult } = props;

    // extracting parameters to save from input analysis results
    const firstNames = [personalAnalysisResult.firstNames];
    const lastNames = [personalAnalysisResult.lastName];
    if (personalAnalysisCompareResult) {
      firstNames.push(personalAnalysisCompareResult.firstNames);
      lastNames.push(personalAnalysisCompareResult.lastName);
    }
    // navigating to component to handle save
    props.history.push(
      `/userHome/saveAnalysis/${encodeURIComponent(
        firstNames
      )}/${encodeURIComponent(lastNames)}/${encodeURIComponent(
        personalAnalysisResult.dateOfBirth
      )}`
    );
  };

  // getting props with two different types on inputs to this component:
  // a) analysis => display
  // b) analysis result => display result
  // c) compare result => the compare result for a different name (if present)
  const { personalAnalysisResult, personalAnalysisCompareResult } = props;

  // render table, table shows spinner
  return (
    <MainContainer>
      <NavigationBar
        leftButtonIcon={isTourOpen ? iconClosePrimary : iconBackPrimary}
        leftButtonOnClick={
          isTourOpen ? () => setIsTourOpen(false) : () => props.history.goBack()
        }
      />
      {/* displaying content if tour is not open */}
      {!isTourOpen && [
        <TitleBar
          primaryName={`${personalAnalysisResult.firstNames} ${personalAnalysisResult.lastName}`}
          primaryDate={personalAnalysisResult.dateOfBirth}
          secondaryName={
            personalAnalysisCompareResult &&
            `${personalAnalysisCompareResult.firstNames} ${personalAnalysisCompareResult.lastName}`
          }
          onRemoveSecondaryName={() => {
            props.history.push(
              `/resultPersonal/${personalAnalysisResult.firstNames}/${personalAnalysisResult.lastName}/${personalAnalysisResult.dateOfBirth}`
            );
          }}
          key="titlebar"
        />,
        <ActionBar key="actionbar">
          <TextButton
            title="Namen vergleichen"
            onClick={() => setIsNameDialogOpen(true)}
          />
          <IconButton
            imageIcon={saveIconPrimary}
            onClick={() => handleSaveAnalysis()}
          />
          <TextButton
            primary
            icon={bookIconWhite}
            title="Alles lesen"
            onClick={() => {
              // opening tour view at start
              setIsTourOpen(true);
              setTourSectionIndex(0);
              setTourElementIndex(0);
            }}
          />
        </ActionBar>,
        <ContentArea key="resultContent">
          <ContentNavigation
            contentItems={buildContentDataStructure(
              resultConfig,
              personalAnalysisResult
            )}
            onItemClick={navigateToElementHandler}
            autoAdapt
          />

          <ResultContent>
            {// mapping every configuration section to a result panel
            resultConfig.map(resultSection => (
              // returning panel and result table with filtered data
              <ResultPanel
                title={resultSection.name}
                rightActionIcon={bookIconPrimary}
                onRightActionClick={() =>
                  handleItemDetailClick(resultSection.name)
                }
                id={resultSection.name}
                key={resultSection.name}
              >
                {resultSection.tables.map(tableData => (
                  // returning table with result data for each number id
                  <ResultTable
                    name={tableData.name}
                    numbers={tableData.numberIds.map(numberId =>
                      _.get(personalAnalysisResult, numberId)
                    )}
                    compareNumbers={
                      personalAnalysisCompareResult &&
                      tableData.numberIds.map(numberId =>
                        _.get(personalAnalysisCompareResult, numberId)
                      )
                    }
                    headings={tableData.headings}
                    showTitle={tableData.showTitle}
                    handleTextDetailClick={handleItemDetailClick}
                    sectionId={resultSection.name}
                    accessLevel={personalAnalysisResult.accessLevel}
                    key={`${resultSection.name + tableData.name}`}
                  />
                ))}
              </ResultPanel>
            ))}
          </ResultContent>
        </ContentArea>
      ]}

      {/* displaying tour if open */}
      {isTourOpen && (
        <TourView
          onClose={() => setIsTourOpen(false)}
          tourData={buildTourDataStructure(
            personalAnalysisResult,
            resultConfig,
            introTexts,
            user
          )}
          name={`${personalAnalysisResult.firstNames} ${personalAnalysisResult.lastName}`}
          compareTourData={
            personalAnalysisCompareResult &&
            buildTourDataStructure(
              personalAnalysisCompareResult,
              resultConfig,
              introTexts,
              user
            )
          }
          compareName={
            personalAnalysisCompareResult &&
            `${personalAnalysisCompareResult.firstNames} ${personalAnalysisCompareResult.lastName}`
          }
          sectionIndex={tourSectionIndex}
          elementIndex={tourElementIndex}
          onIndexChange={(sectionIndex, elementIndex) => {
            // if index changes by interaction with component => updating state to re-render accordingly
            setTourSectionIndex(sectionIndex);
            setTourElementIndex(elementIndex);
          }}
          user={props.user}
          accessLevel={personalAnalysisResult.accessLevel}
        />
      )}

      {/* Dialog to change/ and add names to compare */}
      <NameInputDialog
        show={isNameDialogOpen}
        onHide={() => setIsNameDialogOpen(false)}
        firstNames={personalAnalysisResult.firstNames}
        lastName={personalAnalysisResult.lastName}
        compareFirstNames={
          personalAnalysisCompareResult &&
          personalAnalysisCompareResult.firstNames
        }
        compareLastName={
          personalAnalysisCompareResult &&
          personalAnalysisCompareResult.lastName
        }
        onChange={(
          firstNames,
          lastName,
          compareFirstNames,
          compareLastName
        ) => {
          // checking if any of the names has changed
          const hasCompareName =
            !!(compareFirstNames.length > 0) || !!(compareLastName.length > 0);

          // checking primary name
          let hasNameChanged =
            firstNames !== personalAnalysisResult.firstNames ||
            lastName !== personalAnalysisResult.lastName;

          // if compare result already => checking if names changed
          if (personalAnalysisCompareResult) {
            hasNameChanged =
              hasNameChanged ||
              compareFirstNames !== personalAnalysisCompareResult.firstNames ||
              compareLastName !== personalAnalysisCompareResult.lastName;
          } else {
            // if not compare => checking if compare name was added
            hasNameChanged = hasNameChanged || hasCompareName;
          }

          // if name has changed => triggering new analysis
          if (hasNameChanged) {
            let firstNameParam;
            let lastNameParam;

            // setting parameters based on results
            if (hasCompareName) {
              // setting first name param => default to same as primary name
              firstNameParam = [firstNames, compareFirstNames || firstNames];
              lastNameParam = [lastName, compareLastName || lastName];
            } else {
              firstNameParam = firstNames;
              lastNameParam = lastName;
            }

            // navigating to new result
            props.history.push(
              `/resultPersonal/${firstNameParam}/${lastNameParam}/${personalAnalysisResult.dateOfBirth}`
            );
          } else {
            // closing dialog
            setIsNameDialogOpen(false);
          }
        }}
      />
      <CreditsBuyModal />
      {!isTourOpen && <Footer />}
    </MainContainer>
  );
};

// setting proptypes
AnalysisResultPersonalRender.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(AnalysisResultPersonalRender);
