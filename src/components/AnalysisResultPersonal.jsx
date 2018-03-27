import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from '../fonts/vfs_fonts';

import TitleBar from './TitleBar';
import NavigationBar from './NavigationBar';
import ContentNavigation from './ContentNavigation';
import Panel from './Panel';
import ResultTable from './ResultTable';
import LightBoxDetailView from './LightBoxDetailView';
import LoadingIndicator from './LoadingIndicator';

import { personalResultsQuery } from '../graphql/Queries';

import '../styles/AnalysisResultPersonal.css';

// setting fonts for pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  MavenPro: {
    normal: 'MavenPro-Regular.ttf',
    bold: 'MavenPro-Bold.ttf',
    italics: 'MavenPro-Regular.ttf',
    bolditalics: 'MavenPro-Regular.ttf',
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf',
  },
};

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
    // defining pdf and default styling
    const docDefinition = {
      pageSize: 'A5',
      pageOrientation: 'portrait',
      pageMargins: [40, 60, 40, 60],
      content: [
        {
          text: this.props.data.personalAnalysis.analysisIntro.title,
          style: 'h1',
        },
        {
          text: this.props.data.personalAnalysis.analysisIntro.text,
          pageBreak: 'after',
        },
        {
          text: 'Übersichtsblatt der Zahlen',
          style: 'h1',
        },
        {
          text: 'TODO: Table with numbers goes here. ',
          pageBreak: 'after',
        },
      ],
      footer: currentPage => ({
        columns: [
          `Persoenlichkeitsnumeroskop fuer ${
            this.props.match.params.firstNames
          } ${this.props.match.params.lastName} mit Namensvergleich`,
          { text: currentPage, alignment: 'right' },
        ],
      }),
      defaultStyle: {
        font: 'MavenPro',
        fontSize: 8,
      },
      styles: {
        h1: {
          fontSize: 14,
          bold: true,
        },
        h2: {
          fontSize: 12,
        },
        h3: {
          fontSize: 10,
        },
      },
    };

    // getting result in array format
    const resultArray = this.getResultArrayFormat(this.props.data.personalAnalysis);

    // pushing content to pdf
    resultArray.forEach((result) => {
      // adding level intro
      if (result.introText) {
        docDefinition.content.push(
          {
            text: result.introText.title,
            style: 'h1',
          },
          {
            text: result.introText.text,
            pageBreak: 'after',
          },
        );
      }

      // adding numbers
      result.numbers.forEach((item) => {
        /* if (item.type === 'customRow') {
          return;
        } */
        // console.log(item);

        let itemName = null;
        let itemValue = null;

        // determining name of element
        if (
          item.type === 'row' &&
          (item.result.value || item.result.values || item.result.list)
        ) {
          itemName = item.name;
          itemValue =
            item.result.value || item.result.values || item.result.list;

          // if item is matrix => not showing value in titel
          if (item.result.type === 'matrix') {
            itemValue = ' ';
          }
        } else if (
          item.type === 'customRow' &&
          item.values &&
          item.nameIndex !== null &&
          item.values[item.nameIndex] &&
          item.valueIndex !== null
        ) {
          itemName = item.values[item.nameIndex];
          itemValue = item.values[item.valueIndex];
        }

        // if item name set => adding name and name subtitle
        if (itemName && itemValue) {
          // adding heading for number
          docDefinition.content.push({
            text: `${itemName} ${itemValue}`,
            style: 'h1',
          });

          // adding subheading with name
          docDefinition.content.push({
            text: `mit Name ${this.props.match.params.firstNames} ${
              this.props.match.params.lastName
            }`,
            style: 'h3',
          });

          // adding number description if present
          if (item.numberDescription && item.numberDescription.description) {
            docDefinition.content.push({
              text: item.numberDescription.description,
            });
          }

          // adding number calculation description if present
          if (
            item.numberDescription &&
            item.numberDescription.calculationDescription
          ) {
            docDefinition.content.push({
              text: item.numberDescription.calculationDescription,
            });
          }

          // pushing description text
          let descriptionText = null;

          // having to determine between standard and custom row
          if (item.type === 'row') {
            descriptionText = item.descriptionText;
          } else if (item.type === 'customRow') {
            descriptionText = item.values[item.descriptionTextIndex];
          } else {
            console.log('NOooooooo discription');
          }

          // if description text is present => adding to content
          if (descriptionText) {
            docDefinition.content.push({
              text: descriptionText,
            });
          }
        } else {
          console.log('not in there');
          console.log(item);
          console.log(itemName);
          console.log(itemValue);
        }
      });
    });

    // creating pdf and opening in new tab
    pdfMake.createPdf(docDefinition).open();
  };

  /**
   * default render
   */
  render() {
    if (this.props.data.loading) {
      return <LoadingIndicator />;
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
