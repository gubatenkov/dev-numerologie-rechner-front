import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import TitleBar from './TitleBar';
import NavigationBar from './NavigationBar';
import ContentNavigation from './ContentNavigation';
import Panel from './Panel';
import ResultTable from './ResultTable';
import LightBoxDetailView from './LightBoxDetailView';

import '../styles/AnalysisResultPersonal.css';

import {
  calculateExpressionLevel,
  calculatePersonalLevel,
  calculateDevelopmentLevel,
  calculateSoulLevelNumbers,
  calculateTimeLevelNumbers,
} from '../utils/Server';

/**
 * result screen for personal analysis
 */
class AnalysisResultPersonal extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };
  constructor(props) {
    super(props);

    // faking call to server
    // TODO get firstname, lastName and date of birth from input
    const firstName = 'Christoph';
    const lastName = 'Hechenblaikner';
    const dateOfBirth = '18.04.1989';

    // setting initial state based on calculations
    this.state = {
      expressionLevel: calculateExpressionLevel(firstName, lastName),
      personalityLevel: calculatePersonalLevel(
        firstName,
        lastName,
        dateOfBirth,
      ),
      developmentLevel: calculateDevelopmentLevel(
        firstName,
        lastName,
        dateOfBirth,
      ),
      soulLevel: calculateSoulLevelNumbers(firstName, lastName, dateOfBirth),
      vibratoryCycles: calculateTimeLevelNumbers(
        firstName,
        lastName,
        dateOfBirth,
      )[0],
      challengesHighs: calculateTimeLevelNumbers(
        firstName,
        lastName,
        dateOfBirth,
      )[1],
      firstName,
      lastName,
      dateOfBirth,
      resultTextDetailViewOpen: false,
      resultTextDetailViewSectionIndex: 0,
      resultTextDetailViewElementIndex: 0,
    };
  }

  /**
   * returns an array representation of the state of the component
   * @param state the state to be transformed
   */
  getResultArrayFormat(state) {
    return [
      state.expressionLevel,
      state.personalityLevel,
      state.developmentLevel,
      state.soulLevel,
      state.vibratoryCycles,
      state.challengesHighs,
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
    // getting index of elemnent represented by dataKey in state
    const dataIndex = this.getResultArrayFormat(this.state).indexOf(this.state[dataKey]);

    // if data is not here -> skip
    if (dataIndex < 0) {
      return;
    }

    // calculating index in filtered data passed to details component
    // indeNew = index - #of items removed by filtering before passed to detail component
    const sectionUpToIndex = this.state[dataKey].numbers.slice(0, index);
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
      return (
        element.result.value &&
        element.textShort &&
        element.textShort.length > 0
      );
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
   * @param state the state to be transformed
   */
  convertStateToDetailsData(state) {
    // transforming into items where results are numbers and a text to display is present
    return this.getResultArrayFormat(state).map(item => ({
      sectionName: item.name,
      sectionElements: item.numbers
        // filtering elements that are not suitable for displaying as detail view
        .filter(numberItem => this.doesElementHaveDescription(numberItem))
        // mapping those elements to data for detail
        .map((numberItem) => {
          if (numberItem.type === 'row') {
            return {
              elementTitle: `${numberItem.name} = ${numberItem.result.value}`,
              elementContent: numberItem.textShort,
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
            <h4>{`${this.state.firstName} ${this.state.lastName}`}</h4>
            <h4>{this.state.dateOfBirth}</h4>
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
                'PersonalityResult',
                'DevelopmentResult',
                'SoulResult',
                'TimeResult',
              ]}
              onItemClick={this.navigateToElementHandler}
              autoAdapt
            />
          </div>
          <div className="ResultContent">
            <Panel title="Ausdrucksebene" id="ExpressionResult">
              <ResultTable
                data={this.state.expressionLevel}
                dataKey="expressionLevel"
                handleTextDetailClick={this.handleItemDetailClick}
              />
            </Panel>

            <Panel title="Persönlichkeitsebene" id="PersonalityResult">
              <ResultTable
                data={this.state.personalityLevel}
                dataKey="personalityLevel"
                handleTextDetailClick={this.handleItemDetailClick}
              />
            </Panel>
            <Panel title="Entfaltungspotential" id="DevelopmentResult">
              <ResultTable
                data={this.state.developmentLevel}
                dataKey="developmentLevel"
                handleTextDetailClick={this.handleItemDetailClick}
              />
            </Panel>
            <Panel title="Seelische Ebene" id="SoulResult">
              <ResultTable
                data={this.state.soulLevel}
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
          data={this.convertStateToDetailsData(this.state)}
          sectionIndex={this.state.resultTextDetailViewSectionIndex}
          elementIndex={this.state.resultTextDetailViewElementIndex}
        />
      </div>
    );
  }
}

export default withRouter(AnalysisResultPersonal);
