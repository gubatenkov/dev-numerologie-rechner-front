import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

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
      resultTextDetailViewOpen: false,
      loading: false,
      loadingText: null,
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
    const dataIndex = this.getResultArrayFormat(analysisResult).indexOf(analysisResult[dataKey]);

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
        /*.filter(numberItem => this.doesElementHaveDescription(numberItem))*/
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
            // sad special treatment for HF/HP
            let elementTitle;
            if (numberItem.numberId.startsWith('HF/HP')) {
              elementTitle = `${numberItem.values[1]}. Herausforderung = ${
                numberItem.values[2]
              }  |  ${numberItem.values[1]}. Höhepunkt = ${
                numberItem.values[3]
              } (${numberItem.values[4]})`;
            } else if (['PJ', 'PJ (+1)'].includes(numberItem.numberId)) {
              elementTitle = `${numberItem.values[numberItem.nameIndex]} = ${
                numberItem.values[numberItem.valueIndex]
              } (${numberItem.values[3]})`;
            } else {
              elementTitle = `${numberItem.values[numberItem.nameIndex]} = ${
                numberItem.values[numberItem.valueIndex]
              }`;
            }
            return {
              elementTitle,
              elementContent: numberItem.values[numberItem.descriptionTextIndex],
            };
          }
          return null;
        }),
    }));
  }

  resize = () => this.forceUpdate()

  componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
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

    let sideMenu = 
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

    let showSideMenu = window.innerWidth >= 992;

    const { analysis, personalAnalysisResult } = this.props;

    // render table, table shows spinner
    return (
      <div>
        <NavigationBar />
        <TitleBar
          title="Übersicht der Zahlen"
          backTitle="Zurück"
          backRoute="/analysisInput"
          primaryActionTitle={
            !analysis
              ? 'Speichern'
              : null
          }
          onPrimaryAction={() => {
            this.props.history.push(`/userHome/saveAnalysis/${personalAnalysisResult.firstNames}/${
              personalAnalysisResult.lastName
              }/${personalAnalysisResult.dateOfBirth}`);
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
          {showSideMenu? sideMenu: null}
          <div className="ResultContent">
            <Panel
              title={personalAnalysisResult.expressionLevel.name}
              id="ExpressionResult"
              className="panelResult"
            >
              <ResultTable
                data={personalAnalysisResult.expressionLevel}
                dataKey="expressionLevel"
                handleTextDetailClick={this.handleItemDetailClick}
              />
            </Panel>

            <Panel
              title={personalAnalysisResult.personalLevel.name}
              id="PersonalResult"
              className="panelResult"
            >
              <ResultTable
                data={personalAnalysisResult.personalLevel}
                dataKey="personalLevel"
                handleTextDetailClick={this.handleItemDetailClick}
              />
            </Panel>
            <Panel
              title={personalAnalysisResult.developmentLevel.name}
              id="DevelopmentResult"
              className="panelResult"
            >
              <ResultTable
                data={personalAnalysisResult.developmentLevel}
                dataKey="developmentLevel"
                handleTextDetailClick={this.handleItemDetailClick}
              />
            </Panel>
            <Panel
              title={personalAnalysisResult.soulLevel.name}
              id="SoulResult"
              className="panelResult"
            >
              <ResultTable
                data={personalAnalysisResult.soulLevel}
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
                data={personalAnalysisResult.vibratoryCycles}
                dataKey="vibratoryCycles"
                handleTextDetailClick={this.handleItemDetailClick}
              />
              <ResultTable
                data={personalAnalysisResult.challengesHighs}
                dataKey="challengesHighs"
                handleTextDetailClick={this.handleItemDetailClick}
              />
              <ResultTable
                data={personalAnalysisResult.personalYear}
                dataKey="personalYear"
                handleTextDetailClick={this.handleItemDetailClick}
              />
            </Panel>
          </div>
        </div>
        <LightBoxDetailView
          isOpen={this.state.resultTextDetailViewOpen}
          onClose={() => this.setState({ resultTextDetailViewOpen: false })}
          data={this.convertResultsToDetailsDataFormat(personalAnalysisResult)}
          sectionIndex={this.state.resultTextDetailViewSectionIndex}
          elementIndex={this.state.resultTextDetailViewElementIndex}
        />
      </div>
    );
  }
}

export default withRouter(AnalysisResultPersonalRender);
