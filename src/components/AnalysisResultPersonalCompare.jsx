import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';

import TitleBar from './TitleBar';
import NavigationBar from './NavigationBar';
import ContentNavigation from './ContentNavigation';
import Panel from './Panel';
import ResultTable from './ResultTable';
import LightBoxDetailView from './LightBoxDetailView';
import LoadingIndicator from './LoadingIndicator';
import { createPDFFromAnalysisResult } from '../utils/PdfBuilder';

import { personalResultsQuery } from '../graphql/Queries';

import '../styles/AnalysisResultPersonal.css';
import '../styles/AnalysisResultPersonalCompare.css';

/**
 * result screen for personal analysis comparison
 */
class AnalysisResultPersonalCompare extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        firstNames: PropTypes.string.isRequired,
        lastNames: PropTypes.string.isRequired,
        dateOfBirth: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    // setting initial state based on calculations
    this.state = {
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
   * handles close of detail view
   */
  handleCloseDetail = () => {
    this.setState({
      resultTextDetailViewOpen: false,
    });
  };

  /**
   *  handles clicks on detail links
   */
  handleItemDetailClick = (dataKey, index) => {
    const analysisResult = this.props.data.personalAnalysis;
    // getting index of elemnent represented by dataKey in state
    const dataIndex = this.getResultArrayFormat(analysisResult).indexOf(analysisResult[dataKey]);

    // if data is not here -> skip
    if (dataIndex < 0) {
      return;
    }

    // calculating index in filtered data passed to details component
    // indeNew = index - #of items removed by filtering before passed to detail component
    const sectionUpToIndex = this.props.data.personalAnalysis[
      dataKey
    ].numbers.slice(0, index);
    const removedElementsToIndexCount =
      sectionUpToIndex.length -
      sectionUpToIndex.filter(item => this.doesElementHaveDescription(item))
        .length;

    // opening detail view
    this.setState({
      resultTextDetailViewOpen: true,
      resultTextDetailViewSectionIndex: dataIndex,
      resultTextDetailViewElementIndex: index - removedElementsToIndexCount,
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
    } else if (element.type === 'customRow') {
      return (
        element.descriptionTextIndex &&
        element.descriptionTextIndex >= 0 &&
        element.values[element.descriptionTextIndex]
      );
    }
    return false;
  }

  /**
   * maps the state of this component to one that can be used
   * by the detail component
   * @param resultData the state to be transformed
   */
  convertResultsToDetailsDataFormat(resultData) {
    // transforming into items where results are numbers and a text to display is present
    return this.getResultArrayFormat(resultData).map(item => ({
      sectionName: item.name,
      sectionElements: item.numbers
        // filtering elements that are not suitable for displaying as detail view
        .filter(numberItem => this.doesElementHaveDescription(numberItem))
        // mapping those elements to data for detail
        .map((numberItem) => {
          if (numberItem.type === 'row') {
            return {
              elementTitle: `${numberItem.name} = ${numberItem.result.value ||
                numberItem.result.values ||
                numberItem.result.list}`,
              elementContent: numberItem.descriptionText,
            };
          } else if (numberItem.type === 'customRow') {
            return {
              elementTitle: `${numberItem.values[numberItem.nameIndex]} = ${
                numberItem.values[numberItem.valueIndex]
              }`,
              elementContent: numberItem.values[numberItem.descriptionTextIndex],
            };
          }
          return null;
        }),
    }));
  }

  /**
   * creates a pdf for the analysis and opens it in a new tab
   */
  createAnalysisPdf = () => {
    // making call to pdf util to generate and open pdf
    createPDFFromAnalysisResult(
      this.props.data,
      this.props.match.params.firstNames,
      this.props.match.params.lastNames,
    );
  };

  /**
   * default render
   */
  render() {
    // NOTE !! since two queries => not in props.data any more!!
    if (
      this.props.personalQuery.loading ||
      this.props.personalQueryCompare.loading
    ) {
      return <LoadingIndicator />;
    }

    console.log(this.props.personalQuery);
    console.log(this.props.personalQueryCompare);

    // render table, table shows spinner
    return (
      <div>
        <NavigationBar />
        <TitleBar
          title="Übersicht der Zahlen"
          backTitle="Zurück"
          backRoute="/analysisInput"
          primaryActionTitle="Speichern"
          onPrimaryAction={() => {
            this.props.history.push(`/userHome/saveAnalysis/${this.props.match.params.firstNames}/${
                this.props.match.params.lastNames
              }/${this.props.match.params.dateOfBirth}`);
          }}
          badgeTitle="Kurztext"
          secondaryActionTitle="Drucken"
          onSecondaryAction={this.createAnalysisPdf}
        />
        <div className="ResultPersonalDataContainer">
          <h4>{this.props.match.params.dateOfBirth}</h4>
        </div>
        <div className="ContentArea">
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
          <div className="ResultContent">
            <table className="resultCompareNameTable">
              <tbody>
                <tr>
                  <td className="resultCompareNameTable__spacer" />
                  <td className="table--bold resultCompareNameTable__nameValue">
                    {`${this.props.match.params.firstNames.split(',')[0]} ${
                      this.props.match.params.lastNames.split(',')[0]
                    }`}
                  </td>
                  <td className="table--bold resultCompareNameTable__nameValue">
                    {`${this.props.match.params.firstNames.split(',')[1]} ${
                      this.props.match.params.lastNames.split(',')[1]
                    }`}
                  </td>
                  <td className="resultCompareNameTable__spacer" />
                </tr>
              </tbody>
            </table>
            <Panel
              title={
                this.props.personalQuery.personalAnalysis.expressionLevel.name
              }
              id="ExpressionResult"
              className="panelResult"
            >
              <ResultTable
                data={this.props.personalQuery.personalAnalysis.expressionLevel}
                dataCompare={
                  this.props.personalQueryCompare.personalAnalysis
                    .expressionLevel
                }
                dataKey="expressionLevel"
                handleTextDetailClick={this.handleItemDetailClick}
              />
            </Panel>

            <Panel
              title={
                this.props.personalQuery.personalAnalysis.personalLevel.name
              }
              id="PersonalResult"
              className="panelResult"
            >
              <ResultTable
                data={this.props.personalQuery.personalAnalysis.personalLevel}
                dataCompare={
                  this.props.personalQueryCompare.personalAnalysis.personalLevel
                }
                dataKey="personalLevel"
                handleTextDetailClick={this.handleItemDetailClick}
              />
            </Panel>
            <Panel
              title={
                this.props.personalQuery.personalAnalysis.developmentLevel.name
              }
              id="DevelopmentResult"
              className="panelResult"
            >
              <ResultTable
                data={
                  this.props.personalQuery.personalAnalysis.developmentLevel
                }
                dataCompare={
                  this.props.personalQueryCompare.personalAnalysis
                    .developmentLevel
                }
                dataKey="developmentLevel"
                handleTextDetailClick={this.handleItemDetailClick}
              />
            </Panel>
            <Panel
              title={this.props.personalQuery.personalAnalysis.soulLevel.name}
              id="SoulResult"
              className="panelResult"
            >
              <ResultTable
                data={this.props.personalQuery.personalAnalysis.soulLevel}
                dataCompare={
                  this.props.personalQueryCompare.personalAnalysis.soulLevel
                }
                dataKey="soulLevel"
                handleTextDetailClick={this.handleItemDetailClick}
              />
            </Panel>
            <Panel
              title="Zeitliche Ebene"
              id="TimeResult"
              className="panelResult"
            >
              <ResultTable
                data={this.props.personalQuery.personalAnalysis.vibratoryCycles}
                dataCompare={
                  this.props.personalQueryCompare.personalAnalysis
                    .vibratoryCycles
                }
                dataKey="vibratoryCycles"
                handleTextDetailClick={this.handleItemDetailClick}
              />
              <ResultTable
                data={this.props.personalQuery.personalAnalysis.challengesHighs}
                dataCompare={
                  this.props.personalQueryCompare.personalAnalysis
                    .challengesHighs
                }
                dataKey="challengesHighs"
                handleTextDetailClick={this.handleItemDetailClick}
              />
              <ResultTable
                data={this.props.personalQuery.personalAnalysis.personalYear}
                dataCompare={
                  this.props.personalQueryCompare.personalAnalysis.personalYear
                }
                dataKey="personalYear"
                handleTextDetailClick={this.handleItemDetailClick}
              />
            </Panel>
          </div>
        </div>
        <LightBoxDetailView
          isOpen={this.state.resultTextDetailViewOpen}
          onClose={this.handleCloseDetail}
          data={this.convertResultsToDetailsDataFormat(this.props.personalQuery.personalAnalysis)}
          sectionIndex={this.state.resultTextDetailViewSectionIndex}
          elementIndex={this.state.resultTextDetailViewElementIndex}
        />
      </div>
    );
  }
}

export default compose(
  graphql(personalResultsQuery, {
    name: 'personalQueryCompare',
    options: params => ({
      variables: {
        firstNames: params.match.params.firstNames.split(',')[1],
        lastName: params.match.params.lastNames.split(',')[1],
        dateOfBirth: params.match.params.dateOfBirth,
      },
    }),
  }),
  graphql(personalResultsQuery, {
    name: 'personalQuery',
    options: params => ({
      variables: {
        firstNames: params.match.params.firstNames.split(',')[0],
        lastName: params.match.params.lastNames.split(',')[0],
        dateOfBirth: params.match.params.dateOfBirth,
      },
    }),
  }),
)(withRouter(AnalysisResultPersonalCompare));
