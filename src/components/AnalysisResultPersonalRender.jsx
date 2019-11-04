import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import * as _ from 'lodash';

import { PersonalResultConfiguration } from '../utils/Config';

import TitleBar from './TitleBar';
import NavigationBar from './NavigationBar';
import ContentNavigation from './ContentNavigation';
import Panel from './Panel';
import ResultTable from './ResultTable';
import LightBoxDetailView from './LightBoxDetailView';
import LoadingIndicator from './LoadingIndicator';

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
    super(props);

    // setting initial state based on calculations
    this.state = {
      loading: false,
      loadingText: null,
      resultTextDetailViewOpen: false,
      resultTextDetailViewSectionIndex: 0,
      resultTextDetailViewElementIndex: 0,
    };
  }

  /**
   * returns an array representation of the state of the component
   * @param data the state to be transformed
   */
  getResultArrayFormat(data) {
    return [
      data.expressionLevel,
      data.personalLevel,
      data.developmentLevel,
      data.soulLevel,
      data.vibratoryCycles,
      data.challengesHighs,
      data.personalYear,
    ];
  }

  /**
   *  handles clicks on detail links
   */
  handleItemDetailClick = (dataKey, index) => {
    const analysisResult = this.props.personalAnalysisResult;
    // getting index of elemnent represented by dataKey in state
    const dataIndex = this.getResultArrayFormat(analysisResult).indexOf(
      analysisResult[dataKey],
    );

    // if data is not here -> skip
    if (dataIndex < 0) {
      return;
    }

    // opening detail view
    this.setState({
      resultTextDetailViewOpen: true,
      resultTextDetailViewSectionIndex: dataIndex,
      resultTextDetailViewElementIndex: index,
    });
  };

  /**
   * handles the navigation to a specific item
   */
  navigateToElementHandler = (name, anchor) => {
    // scrolling to item if present in DOM
    const stepContentItem = document.getElementById(anchor);
    if (stepContentItem) {
      stepContentItem.scrollIntoView();
    }
  };

  /**
   * checks whether an element has a description text element present
   * @param element the element to check for
   * @returns true if contains valid description, false otherwise
   */
  doesElementHaveDescription(element) {
    if (element.type === 'row') {
      return element.descriptionText && element.descriptionText.length > 0;
    }
    if (element.type === 'customRow') {
      return (
        element.descriptionTextIndex
        && element.descriptionTextIndex >= 0
        && element.values[element.descriptionTextIndex]
      );
    }
    return false;
  }

  /**
   * transforms the analysis results and configuration into a tour data structure used for the detailed tour
   * @param resultData the result data for the analysis
   * @param configuration the current result configuration
   * @returns an array of tour sections containing section name and result items
   */
  buildTourStructure(resultData, configuration) {
    // constructing tourSection element for every table in configuration
    const tourSections = [];
    configuration.forEach((resultSection) => {
      tourSections.push(...
        resultSection.tables.map((table) => ({
          sectionName: table.name,
          sectionElements: table.numberIds.map((numberId) => _.get(resultData, numberId)),
        })),
      );
    });
    return tourSections;
  }

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
    // if data is loading => showing loading indicator with standard text
    if (this.props.loading) {
      return <LoadingIndicator text="Berechne Auswertung für Namen..." />;
    }

    if (this.state.loading) {
      return <LoadingIndicator text={this.state.loadingText} />;
    }

    if (this.props.error) {
      return <LoadingIndicator text={this.props.error.message} />;
    }

    // constructing side menu component
    let sideMenu = (
      <div className="ResultContentOverview">
        <ContentNavigation
          contentItems={[
            'Ausdrucksebene',
            'Persönlichkeitsebene',
            'Entfaltungspotential',
            'Seelische Ebene',
            'Zeitliche Ebene',
          ]}
          contentItemAnchors={[
            'ExpressionResult',
            'PersonalResult',
            'DevelopmentResult',
            'SoulResult',
            'TimeResult',
          ]}
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

    // defining configuration of current view
    // TODO: switch this based on url param
    const resultConfiguration = PersonalResultConfiguration.LEVELS;

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
              `/userHome/saveAnalysis/${personalAnalysisResult.firstNames}/${personalAnalysisResult.lastName}/${personalAnalysisResult.dateOfBirth}`,
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
            resultConfiguration.map((resultSection) => (
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
                    dataKey={'TBA'}
                    key={`${resultSection.name + tableData.headings}`}
                    handleTextDetailClick={this.handleItemDetailClick}
                  />
                ))}
              </Panel>
            ))}
          </div>
        </div>
        <LightBoxDetailView
          isOpen={this.state.resultTextDetailViewOpen}
          onClose={() => this.setState({ resultTextDetailViewOpen: false })}
          tourData={this.buildTourStructure(
            personalAnalysisResult,
            resultConfiguration,
          )}
          sectionIndex={this.state.resultTextDetailViewSectionIndex}
          elementIndex={this.state.resultTextDetailViewElementIndex}
        />
      </div>
    );
  }
}

export default withRouter(AnalysisResultPersonalRender);
