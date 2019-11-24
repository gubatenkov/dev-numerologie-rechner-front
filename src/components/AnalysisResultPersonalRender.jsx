import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import styled from 'styled-components';

import {
  faArrowLeft,
  faSave,
  faBookOpen,
} from '@fortawesome/free-solid-svg-icons';
import TitleBar from './TitleBar';
import NavigationBar from './NavigationBar';
import ContentNavigation from './ContentNavigation';
import Panel from './Panel';
import ResultTable from './ResultTable';
import TourView from './TourView';
import TextButton from './Buttons/TextButton';
import IconButton from './Buttons/IconButton';

import {
  PERSONAL_RESULT_CONFIGURATION_DEFAULT,
  getConfigurationForId,
} from '../utils/Configuration';

import ActionBar from './ActionBar';

const ContentArea = styled.div`
  display: flex;
  align-content: flex-start;
  flex-direction: row;
`;

const ResultContent = styled.div`
  margin-right: 50px;
  margin-left: 30px;
  width: 100%;
`;

/**
 * result screen for personal analysis
 */
class AnalysisResultPersonalRender extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    // super constructor
    super(props);

    // getting relevant parameters from props
    const { user } = props;
    const { resultConfigurationId } = props.match.params;

    // determining configuration for result
    // 3) if no user and param set => using default
    let resultConfiguration = PERSONAL_RESULT_CONFIGURATION_DEFAULT;

    // 1) if param is set => using this one
    if (resultConfigurationId && getConfigurationForId(resultConfigurationId)) {
      resultConfiguration = getConfigurationForId(resultConfigurationId);
    }
    // 2) if no param set and user => using user default
    else if (
      user
      && user.resultConfiguration
      && getConfigurationForId(user.resultConfiguration)
    ) {
      resultConfiguration = getConfigurationForId(user.resultConfiguration);
    }

    // setting initial state based on calculations
    this.state = {
      loading: false,
      loadingText: null,
      resultTextDetailViewOpen: false,
      resultTextDetailViewSectionIndex: 0,
      resultTextDetailViewElementIndex: 0,
      resultConfiguration,
    };
  }

  /**
   * transforms the analysis results and configuration into a tour data structure used for the detailed tour
   * @param resultData the result data for the analysis
   * @param configuration the current result configuration
   * @returns an array of tour sections containing section name and result items
   */
  buildTourDataStructure(resultData, configuration) {
    // constructing tourSection element for every table in configuration
    return configuration.map((resultSection) => {
      const resultSectionNumbers = [];
      // iterating over result tables of section
      resultSection.tables.forEach((resultTable) => {
        // pushing resolved numbers
        resultSectionNumbers.push(
          ...resultTable.numberIds.map((numberId) => _.get(resultData, numberId)),
        );
      });

      // pushing resulting section  to result
      return {
        sectionName: resultSection.name,
        sectionElements: resultSectionNumbers,
      };
    });
  }

  /**
   * builds a data structure used for the content sidebar
   * @param configuration the current result configuration
   * @param result the result containing ann numbers in the configuration
   */
  buildContentDataStructure(configuration, result) {
    // returning an array of section names and number names
    return configuration.map((configSection) => {
      // getting an array of all items in a section (across tables)
      const numberTitles = [];
      // iterating over tables, resolving values for ids
      configSection.tables.forEach((table) => numberTitles.push(
        ...table.numberIds.map((numberId) => {
          // getting result of number id
          const numberResult = _.get(result, numberId);

          // extracting name and value for different types of row
          const { name } = numberResult;
          const value = numberResult.result.type === 'number'
            ? numberResult.result.value
            : null;

          // constructing string of the form name = value to show in content
          const title = `${name} ${value ? `= ${value}` : ''}`;

          // returning element with title and anchor as number id
          // this anchor is set on the title and can be used for dynamic scrolling later
          return {
            title,
            anchor: numberResult.numberId,
          };
        }),
      ));

      // returning section item with name and numbers
      return {
        name: configSection.name,
        titles: numberTitles,
      };
    });
  }

  /**
   *  handles clicks on detail links
   * @param sectionId the name of the table the event was fired
   * @param rowIndex the index of the row inside the table the event was fired for
   */
  handleItemDetailClick = (sectionId, numberId) => {
    //  getting tour structure
    const tourDataStructure = this.buildTourDataStructure(
      this.props.personalAnalysisResult,
      this.state.resultConfiguration,
    );

    // finding index with datakey in tour data structure
    let sectionIndex = tourDataStructure.findIndex(
      (section) => section.sectionName === sectionId,
    );

    // if data is not here -> skip
    if (sectionIndex < 0) {
      console.log('Could not find section for row to show details');
      // starting at first section by default
      sectionIndex = 0;
    }

    // finding row index of item in section
    let elementIndex = tourDataStructure[
      sectionIndex
    ].sectionElements.findIndex((element) => element.numberId === numberId);

    if (elementIndex < 0) {
      console.log('Could not find element in section to show details');

      // starting at first number by default
      elementIndex = 0;
    }

    // opening detail view with right section index
    this.setState({
      resultTextDetailViewOpen: true,
      resultTextDetailViewSectionIndex: sectionIndex,
      resultTextDetailViewElementIndex: elementIndex,
    });
  };

  /**
   * handles the navigation to a specific item
   * @param anchor the id of the element in the dom to navigate to
   */
  navigateToElementHandler = (anchor) => {
    // scrolling to item if present in DOM
    const domElement = document.getElementById(anchor);
    if (domElement) {
      domElement.scrollIntoView();
    }
  };

  /**
   * handles the saving of the displayed analysis given the input parameters
   */
  handleSaveAnalysis = () => {
    // extracting props
    const {
      personalAnalysisResult,
      personalAnalysisCompareResult,
    } = this.props;

    // extracting parameters to save from input analysis results
    const firstNames = [personalAnalysisResult.firstNames];
    const lastNames = [personalAnalysisResult.lastName];
    if (personalAnalysisCompareResult) {
      firstNames.push(personalAnalysisCompareResult.firstNames);
      lastNames.push(personalAnalysisCompareResult.lastName);
    }
    // navigating to component to handle save
    this.props.history.push(
      `/userHome/saveAnalysis/${encodeURIComponent(
        firstNames,
      )}/${encodeURIComponent(lastNames)}/${encodeURIComponent(
        personalAnalysisResult.dateOfBirth,
      )}`,
    );
  };

  /**
   * default render
   */
  render() {
    // getting props with two different types on inputs to this component:
    // a) analysis => display
    // b) analysis result => display result
    // c) compare result => the compare result for a different name (if present)
    const {
      personalAnalysisResult,
      personalAnalysisCompareResult,
    } = this.props;

    // render table, table shows spinner
    return (
      <div>
        <NavigationBar
          leftButtonIcon={faArrowLeft}
          leftButtonOnClick={() => this.props.history.goBack()}
        />
        <TitleBar
          primaryName={`${personalAnalysisResult.firstNames} ${personalAnalysisResult.lastName}`}
          primaryDate={personalAnalysisResult.dateOfBirth}
          secondaryName={
            personalAnalysisCompareResult
            && `${personalAnalysisCompareResult.firstNames} ${personalAnalysisCompareResult.lastName}`
          }
          onRemoveSecondaryName={() => {
            this.props.history.push(
              `/resultPersonal/${personalAnalysisResult.firstNames}/${personalAnalysisResult.lastName}/${personalAnalysisResult.dateOfBirth}`,
            );
          }}
        />

        <ActionBar>
          <TextButton
            title="Namen vergleichen"
            onClick={() => window.alert('TODO: Implement compare')}
          />
          <IconButton icon={faSave} onClick={() => this.handleSaveAnalysis()} />
          <TextButton
            primary
            icon={faBookOpen}
            title="Alle lesen"
            onClick={() => this.setState({
              resultTextDetailViewOpen: true,
              resultTextDetailViewSectionIndex: 0,
              resultTextDetailViewElementIndex: 0,
            })
            }
          />
        </ActionBar>

        <ContentArea>
            <ContentNavigation
              contentItems={this.buildContentDataStructure(
                this.state.resultConfiguration,
                personalAnalysisResult,
              )}
              onItemClick={this.navigateToElementHandler}
              autoAdapt
            />
          <ResultContent>
            {// mapping every configuration section to a result panel
            this.state.resultConfiguration.map((resultSection) => (
              // returning panel and result table with filtered data
              <Panel
                title={resultSection.name}
                id={resultSection.name}
                key={resultSection.name}
              >
                {resultSection.tables.map((tableData) => (
                  // returning table with result data for each number id
                  <ResultTable
                    name={tableData.name}
                    numbers={tableData.numberIds.map((numberId) => _.get(personalAnalysisResult, numberId))}
                    compareNumbers={
                      personalAnalysisCompareResult
                      && tableData.numberIds.map((numberId) => _.get(personalAnalysisCompareResult, numberId))
                    }
                    headings={tableData.headings}
                    showTitle={tableData.showTitle}
                    sectionId={resultSection.name}
                    handleTextDetailClick={this.handleItemDetailClick}
                    key={`${resultSection.name + tableData.name}`}
                  />
                ))}
              </Panel>
            ))}
          </ResultContent>
        </ContentArea>
        <TourView
          isOpen={this.state.resultTextDetailViewOpen}
          onClose={() => this.setState({ resultTextDetailViewOpen: false })}
          tourData={this.buildTourDataStructure(
            personalAnalysisResult,
            this.state.resultConfiguration,
          )}
          sectionIndex={this.state.resultTextDetailViewSectionIndex}
          elementIndex={this.state.resultTextDetailViewElementIndex}
          onIndexChange={(sectionIndex, elementIndex) => {
            // if index changes by interaction with component => updating state to re-render accordingly
            this.setState({
              resultTextDetailViewSectionIndex: sectionIndex,
              resultTextDetailViewElementIndex: elementIndex,
            });
          }}
        />
      </div>
    );
  }
}

export default withRouter(AnalysisResultPersonalRender);
