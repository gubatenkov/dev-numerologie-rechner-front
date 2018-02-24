import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

import TitleBar from './TitleBar';
import NavigationBar from './NavigationBar';
import ContentNavigation from './ContentNavigation';
import Panel from './Panel';
import ResultTable from './ResultTable';
import LightBoxDetailView from './LightBoxDetailView';

import '../styles/AnalysisResultPersonal.css';

import { calculateTimeLevelNumbers } from '../utils/Server';

// queries for getting results from server
const AnalysisPartsFragment = gql`
fragment AnalysisParts on AnalysisResult {
  name
  numbers {
    ... on DefaultAnalysisResultItem {
      name
      id
      highlighted
      descriptionText
      type
      result {
        ... on AnalysisResultValueNumber {
          type
          value
        }
        ... on AnalysisResultValueMatrix {
          type
          values
          dimensions {
            rows
            cols
          }
          highlighted
        }
        ... on AnalysisResultValueList {
          type
          list
        }
      }
    }
    ... on CustomAnalysisResultItem {
      type
      id
      values
      nameIndex
      valueIndex
      descriptionTextIndex
      highlighted
    }
  }
}
`;

const personalResultsQuery = gql`
  query personalAnalysis(
    $firstNames: String!
    $lastName: String!
    $dateOfBirth: String!
  ) {
    personalAnalysis(
      firstNames: $firstNames
      lastName: $lastName
      dateOfBirth: $dateOfBirth
    ) {
      expressionLevel {
        ...AnalysisParts
      }
      personalLevel {
        ...AnalysisParts
      }
      developmentLevel {
        ...AnalysisParts
      }
      soulLevel {
        ...AnalysisParts
      }
    }
  }
  ${AnalysisPartsFragment}
`;

/**
 * result screen for personal analysis
 */
class AnalysisResultPersonal extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        firstNames: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    // getting data from parameters
    const { firstNames, lastName, dateOfBirth } = props.match.params;

    // setting initial state based on calculations
    this.state = {
      vibratoryCycles: calculateTimeLevelNumbers(
        firstNames,
        lastName,
        dateOfBirth,
      )[0],
      challengesHighs: calculateTimeLevelNumbers(
        firstNames,
        lastName,
        dateOfBirth,
      )[1],
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
      // data.vibratoryCycles,
      // data.challengesHighs,
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
   * default render
   */
  render() {
    if (this.props.data.loading) {
      return <h1>Loading...</h1>;
    }

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
            this.props.history.push('/userHome');
          }}
          badgeTitle="Kurztext"
          secondaryActionTitle="Drucken"
          onSecondaryAction={() => {}}
        />
        <div className="ResultPersonalDataContainer">
          <div className="ResultPersonalData">
            <h4>
              {`${this.props.match.params.firstNames} ${
                this.props.match.params.lastName
              }`}
            </h4>
            <h4>{this.props.match.params.dateOfBirth}</h4>
          </div>
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
            <Panel
              title={this.props.data.personalAnalysis.expressionLevel.name}
              id="ExpressionResult"
            >
              <ResultTable
                data={this.props.data.personalAnalysis.expressionLevel}
                dataKey="expressionLevel"
                handleTextDetailClick={this.handleItemDetailClick}
              />
            </Panel>

            <Panel
              title={this.props.data.personalAnalysis.personalLevel.name}
              id="PersonalResult"
            >
              <ResultTable
                data={this.props.data.personalAnalysis.personalLevel}
                dataKey="personalLevel"
                handleTextDetailClick={this.handleItemDetailClick}
              />
            </Panel>
            <Panel
              title={this.props.data.personalAnalysis.developmentLevel.name}
              id="DevelopmentResult"
            >
              <ResultTable
                data={this.props.data.personalAnalysis.developmentLevel}
                dataKey="developmentLevel"
                handleTextDetailClick={this.handleItemDetailClick}
              />
            </Panel>
            <Panel
              title={this.props.data.personalAnalysis.soulLevel.name}
              id="SoulResult"
            >
              <ResultTable
                data={this.props.data.personalAnalysis.soulLevel}
                dataKey="soulLevel"
                handleTextDetailClick={this.handleItemDetailClick}
              />
            </Panel>
            <Panel title="Zeitliche Ebene" id="TimeResult">
              <ResultTable
                data={this.state.vibratoryCycles}
                dataKey="vibratoryCycles"
                handleTextDetailClick={this.handleItemDetailClick}
              />
              <ResultTable
                data={this.state.challengesHighs}
                dataKey="challengesHighs"
                handleTextDetailClick={this.handleItemDetailClick}
              />
            </Panel>
          </div>
        </div>
        <LightBoxDetailView
          isOpen={this.state.resultTextDetailViewOpen}
          onClose={this.handleCloseDetail}
          data={this.convertResultsToDetailsDataFormat(this.props.data.personalAnalysis)}
          sectionIndex={this.state.resultTextDetailViewSectionIndex}
          elementIndex={this.state.resultTextDetailViewElementIndex}
        />
      </div>
    );
  }
}

export default compose(graphql(personalResultsQuery, {
  options: params => ({
    variables: {
      firstNames: params.match.params.firstNames,
      lastName: params.match.params.lastName,
      dateOfBirth: params.match.params.dateOfBirth,
    },
  }),
}))(withRouter(AnalysisResultPersonal));
