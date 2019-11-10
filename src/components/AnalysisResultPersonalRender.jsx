import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import * as _ from 'lodash';

import TitleBar from './TitleBar';
import NavigationBar from './NavigationBar';
import ContentNavigation from './ContentNavigation';
import Panel from './Panel';
import ResultTable from './ResultTable';
import TourView from './TourView';

import {
  PERSONAL_RESULT_CONFIGURATION_DEFAULT,
  getConfigurationForId,
} from '../utils/Configuration';

import '../styles/AnalysisResultPersonal.css';

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
    const tourSections = [];
    configuration.forEach((resultSection) => {
      tourSections.push(
        ...resultSection.tables.map((table) => ({
          sectionName: table.name,
          sectionElements: table.numberIds.map((numberId) => _.get(resultData, numberId)),
        })),
      );
    });
    return tourSections;
  }

  /**
   * builds a data structure used for the content sidebar
   * @param configuration the current result configuration
   */
  buildContentDataStructure(configuration) {
    // returning an array of section names
    return configuration.map((configSection) => configSection.name);
  }

  /**
   *  handles clicks on detail links
   * @param dataKey the name of the table the event was fired
   * @param rowIndex the index of the row inside the table the event was fired for
   */
  handleItemDetailClick = (dataKey, rowIndex) => {
    //  getting tour structure
    const tourDataStructure = this.buildTourDataStructure(
      this.props.personalAnalysisResult,
      this.state.resultConfiguration,
    );

    // finding index with datakey in tour data structure
    const sectionIndex = tourDataStructure.findIndex(
      (section) => section.sectionName === dataKey,
    );

    // if data is not here -> skip
    if (sectionIndex < 0) {
      return;
    }

    // opening detail view with right section index
    this.setState({
      resultTextDetailViewOpen: true,
      resultTextDetailViewSectionIndex: sectionIndex,
      resultTextDetailViewElementIndex: rowIndex,
    });
  };

  /**
   * handles the navigation to a specific item
   * @param anchor the # anchor in the html to navigate to
   */
  navigateToElementHandler = (name, anchor) => {
    // scrolling to item if present in DOM
    const stepContentItem = document.getElementById(anchor);
    if (stepContentItem) {
      stepContentItem.scrollIntoView();
    }
  };

  resize = () => this.forceUpdate();

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  /**
   * default render
   */
  render() {
    // constructing side menu component
    let sideMenu = (
      <div className="ResultContentOverview">
        <ContentNavigation
          contentItems={this.buildContentDataStructure(
            this.state.resultConfiguration,
          )}
          contentItemAnchors={this.buildContentDataStructure(
            this.state.resultConfiguration,
          )}
          onItemClick={this.navigateToElementHandler}
          autoAdapt
        />
      </div>
    );

    // responsiveness => if window smaller than defined width => hide side menu
    let showSideMenu = window.innerWidth >= 992;

    // getting props with two different types on inputs to this component:
    // a) analysis => display
    // b) analysis result => display result
    const { analysis, personalAnalysisResult } = this.props;

    // render table, table shows spinner
    return (
      <div>
        <NavigationBar />
        <TitleBar
          title="Übersicht der Zahlen"
          backTitle="Zurück"
          backRoute="/analysisInput"
          primaryActionTitle={!analysis ? 'Speichern' : null}
          onPrimaryAction={() => {
            this.props.history.push(
              `/userHome/saveAnalysis/${encodeURIComponent(
                personalAnalysisResult.firstNames,
              )}/${encodeURIComponent(
                personalAnalysisResult.lastName,
              )}/${encodeURIComponent(personalAnalysisResult.dateOfBirth)}`,
            );
          }}
          badgeTitle="Kurztext"
        />
        <div className="ResultPersonalDataContainer">
          <div className="ResultPersonalData">
            <h4>
              {`${personalAnalysisResult.firstNames} ${personalAnalysisResult.lastName}`}
            </h4>
            <h4>{personalAnalysisResult.dateOfBirth}</h4>
          </div>
        </div>
        <div className="ContentArea">
          {showSideMenu ? sideMenu : null}
          <div className="ResultContent">
            {// mapping every configuration section to a result panel
            this.state.resultConfiguration.map((resultSection) => (
              // returning panel and result table with filtered data
              <Panel
                title={resultSection.name}
                id={resultSection.name}
                className="panelResult"
                key={resultSection.name}
              >
                {resultSection.tables.map((tableData) => (
                  // returning table with result data for each number id
                  <ResultTable
                    data={{
                      numbers: tableData.numberIds.map((numberId) => _.get(personalAnalysisResult, numberId)),
                      headings: tableData.headings,
                    }}
                    dataKey={tableData.name}
                    key={`${resultSection.name + tableData.headings}`}
                    handleTextDetailClick={this.handleItemDetailClick}
                  />
                ))}
              </Panel>
            ))}
          </div>
        </div>
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
