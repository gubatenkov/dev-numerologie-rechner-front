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
      expressionLevel: calculateExpressionLevel(
        firstName,
        lastName,
        dateOfBirth,
      ),
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
      timeLevel: calculateTimeLevelNumbers(firstName, lastName, dateOfBirth),
      firstName,
      lastName,
      dateOfBirth,
      resultTextDetailViewOpen: false,
      resultTextDetailViewSectionIndex: 0,
      resultTextDetailViewElementIndex: 0,
    };
  }

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
    // opening detail view
    // TODO pass index = starting position
    this.setState({
      resultTextDetailViewOpen: true,
      resultTextDetailViewSectionIndex: 0,
      resultTextDetailViewElementIndex: index,
    });
  };

  /**
   * maps the state of this component to one that can be used
   * by the detail component
   * @param {*} state
   */
  convertStateToDetailsData(state) {
    return [
      state.expressionLevel,
      state.personalityLevel,
      state.developmentLevel,
      state.soulLevel,
      // state.timeLevel[0],
      // state.timeLevel[1],
    ].map(item => ({
      sectionName: item.name,
      sectionElements: item.numbers.map(numberItem => ({
        elementTitle: `${numberItem.name} = ${numberItem.result.value}`,
        elementContent: numberItem.textShort,
      })),
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
                data={this.state.timeLevel[0]}
                dataKey="timeLevel"
                handleTextDetailClick={this.handleItemDetailClick}
              />
              <ResultTable
                data={this.state.timeLevel[1]}
                dataKey="timeLevel"
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
