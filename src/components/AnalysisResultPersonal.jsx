import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { graphql, compose, withApollo } from 'react-apollo';

import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';

import TitleBar from './TitleBar';
import NavigationBar from './NavigationBar';
import ContentNavigation from './ContentNavigation';
import Panel from './Panel';
import ResultTable from './ResultTable';
import LightBoxDetailView from './LightBoxDetailView';
import LoadingIndicator from './LoadingIndicator';
import { createPDFFromAnalysisResult } from '../utils/PdfBuilder';

import { getUserAuthData } from '../utils/AuthUtils';

import { personalResultsQuery } from '../graphql/Queries';

import '../styles/AnalysisResultPersonal.css';

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
        dateOfBirth: PropTypes.string.isRequired,
      }).isRequired,
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

  /**
   * creates a pdf for the analysis and opens it in a new tab
   */
  createAnalysisPdf = async () => {
    // checking if logged in => otherwise redirecting to login
    const authUser = getUserAuthData();
    if (!authUser || !authUser.token || !authUser.email) {
      this.props.history.push('/login');
      return;
    }

    // setting activity indicator
    this.setState({
      loading: true,
      loadingText: 'Berechne detaillierte Auswertung und erstelle PDF...',
    });

    // getting long texts used for pdf (if allowed)
    try {
      const result = await this.props.client.query({
        query: personalResultsQuery,
        variables: {
          firstNames: this.props.match.params.firstNames,
          lastName: this.props.match.params.lastName,
          dateOfBirth: this.props.match.params.dateOfBirth,
          longTexts: true,
        },
      });

      // creating pdf and downloading with custom name
      await createPDFFromAnalysisResult(
        result.data,
        this.props.match.params.firstNames,
        this.props.match.params.lastName,
        `Persönlichkeitsnumeroskop_${this.props.match.params.firstNames}_${
          this.props.match.params.lastName
        }.pdf`,
      );
    } catch (error) {
      console.log(error);
      // removing loading indicator
      this.setState({
        loading: false,
        loadingText: null,
      });
      NotificationManager.error(
        'Das Erstellen eines fertigen Numeroskops mit wahlweise kurzen oder langen Texten mit ca. 60 bzw. 100 Seiten als PDF (kostenpflichtig) zum Ausdrucken oder Weiterleiten ist noch nicht möglich. Diese Eigenschaft wird erst ab Herbst 2018 freigeschalten. Wir informieren Sie darüber in unseremPsychologische Numerologie Newsletter. Klicken Sie hier um sich für den Newsletter anzumelden.',
        '',
        5000,
        () => {
          const win = window.open(
            'https://www.psychologischenumerologie.eu/newsletter/',
            '_blank',
          );
          win.focus();
        },
      );
    }

    // removing loading indicator
    this.setState({
      loading: false,
      loadingText: null,
    });
  };

  //rerender on size change
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
    if (this.props.data.loading) {
      return <LoadingIndicator text="Berechne Auswertung für Namen..." />;
    }

    if (this.state.loading) {
      return <LoadingIndicator text={this.state.loadingText} />;
    }

    const breakpoints = {
      desktop: 992, //bootstrap small laptops
    };
    
      // render table, table shows spinner
      var showSideMenu = true
      if(window.innerWidth >= breakpoints.desktop ) {
        showSideMenu = true
      } else {
        showSideMenu = false
      };

      console.log("Sidemenushow = " + showSideMenu + " because width = " + window.innerWidth)
    
      let sideMenu = showSideMenu ? <ContentNavigation 
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
    /> : null;

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
                this.props.match.params.lastName
              }/${this.props.match.params.dateOfBirth}`);
          }}
          badgeTitle="Kurztext"
          secondaryActionTitle="Drucken"
          onSecondaryAction={this.createAnalysisPdf}
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
          {sideMenu}
          </div>
          <div className="ResultContent">
            <Panel
              title={this.props.data.personalAnalysis.expressionLevel.name}
              id="ExpressionResult"
              className="panelResult"
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
              className="panelResult"
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
              className="panelResult"
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
              className="panelResult"
            >
              <ResultTable
                data={this.props.data.personalAnalysis.soulLevel}
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
                data={this.props.data.personalAnalysis.vibratoryCycles}
                dataKey="vibratoryCycles"
                handleTextDetailClick={this.handleItemDetailClick}
              />
              <ResultTable
                data={this.props.data.personalAnalysis.challengesHighs}
                dataKey="challengesHighs"
                handleTextDetailClick={this.handleItemDetailClick}
              />
              <ResultTable
                data={this.props.data.personalAnalysis.personalYear}
                dataKey="personalYear"
                handleTextDetailClick={this.handleItemDetailClick}
              />
            </Panel>
          </div>
        </div>
        <LightBoxDetailView
          isOpen={this.state.resultTextDetailViewOpen}
          onClose={() => this.setState({ resultTextDetailViewOpen: false })}
          data={this.convertResultsToDetailsDataFormat(this.props.data.personalAnalysis)}
          sectionIndex={this.state.resultTextDetailViewSectionIndex}
          elementIndex={this.state.resultTextDetailViewElementIndex}
        />
        <NotificationContainer />
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
      longTexts: false,
    },
  }),
}))(withApollo(withRouter(AnalysisResultPersonal)));
