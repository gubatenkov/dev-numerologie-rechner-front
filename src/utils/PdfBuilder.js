import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from '../fonts/vfs_fonts';

import { convertHTMLTextToPDFSyntax } from './PdfHelper';
import { COVER_IMAGE_BY_LZ, LEVEL_BG_IMAGES } from './Images';

// defining colors used in the pdf
const CI_COLORS = {
  RED: '#fb2c2c',
  ORANGE: '#f88000',
  YELLOW: '#e7c900',
  GREEN: '#8ebe31',
  BLUE: '#00b3d4',
  PURPLE: '#bb00eb',
  SILVER: '#afafaf',
  GREY: '#969696',
  BLACK: '#262626',
  WHITE: '#FFFFFF',
};

// mapping of colors to levels
const LEVEL_COLORS = {
  Ausdrucksebene: CI_COLORS.RED,
  Persönlichkeitsebene: CI_COLORS.GREEN,
  Entfaltungspotenzial: CI_COLORS.BLUE,
  'Seelische Ebene': CI_COLORS.PURPLE,
  'Vibratorische Zyklen': CI_COLORS.SILVER,
  'Herausforderungen und Höhepunkte': CI_COLORS.SILVER,
  'Persönliches Jahr': CI_COLORS.SILVER,
};

// constant for how many centimeters an inch is
const INCH_IN_CM = 2.54;
// current pixel density assumed for conversions in DPI
const PIXEL_DENSITY = 72;
// page margins
const PAGE_MARGIN_LEFT_CM = 3.5;
const PAGE_MARGIN_RIGHT_CM = 3.5;
const PAGE_MARGIN_TOP_CM = 2.5;
const PAGE_MARGIN_BOTTOM_CM = 2.5;

// styling for default classes
const PDF_STYLES = {
  H1: {
    fontSize: 30,
    bold: true,
    marginTop: 10,
    lineHeight: 1,
    pageBreak: 'before',
  },
  H2: {
    fontSize: 18,
    bold: true,
    marginTop: 10,
    marginBottom: 10,
    lineHeight: 1,
  },
  H3: {
    fontSize: 12,
    bold: true,
    marginTop: 10,
    marginBottom: 10,
    lineHeight: 1,
    color: CI_COLORS.BLACK,
  },
  H4: {
    fontSize: 12,
    color: CI_COLORS.GREY,
  },
  B: {
    bold: true,
  },
  SUBTITLE: {
    marginBottom: 10,
    lineHeight: 1,
  },
  NUMBERDESCRIPTION: {
    color: CI_COLORS.GREY,
    fontSize: 12,
  },
  TABLE: {
    margin: [0, 10, 0, 10],
    fontSize: 10,
    alignment: 'center',
  },
  TITLEPAGE_TITLE: {
    alignment: 'center',
    margin: [0, 520, 0, 0],
    color: CI_COLORS.WHITE,
  },
  TITLEPAGE_NAME: {
    alignment: 'center',
    color: CI_COLORS.WHITE,
  },
};

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

// the level location information in the created document
// this is needed to keep track of the position of the layers in the document
const levelPositionInformation = {
  Ausdrucksebene: {
    startIndex: null,
    endIndex: null,
    startPage: null,
    endPage: null,
  },
  Persönlichkeitsebene: {
    startIndex: null,
    endIndex: null,
    startPage: null,
    endPage: null,
  },
  Entfaltungspotenzial: {
    startIndex: null,
    endIndex: null,
    startPage: null,
    endPage: null,
  },
  'Seelische Ebene': {
    startIndex: null,
    endIndex: null,
    startPage: null,
    endPage: null,
  },
  'Vibratorische Zyklen': {
    startIndex: null,
    endIndex: null,
    startPage: null,
    endPage: null,
  },
  'Herausforderungen und Höhepunkte': {
    startIndex: null,
    endIndex: null,
    startPage: null,
    endPage: null,
  },
  'Persönliches Jahr': {
    startIndex: null,
    endIndex: null,
    startPage: null,
    endPage: null,
  },
};

/**
 * converts centimeters to points for margins etc.
 * @param centimeters the centimeter value to transform
 * @return the point equivalent to centimeters
 */
function cmToPoints(centimeters) {
  return centimeters / INCH_IN_CM * PIXEL_DENSITY;
}

/**
 * extracts from the number item a value suitable for display in the overview table
 */
function extractTableValueFromItem(numberItem) {
  let value;
  // assigning value based on type of result
  if (numberItem.type === 'row') {
    if (numberItem.result.type === 'number') {
      value = { text: numberItem.result.value, alignment: 'center' };
    } else if (numberItem.result.type === 'list') {
      value = {
        text: numberItem.result.list.join(','),
        alignment: 'center',
      };
    } else {
      const matrix = numberItem.result.values.map(item => (item && item.length > 0 ? item : '     '));
      value = {
        table: {
          heights: 45,
          widths: [45, 45, 45],
          body: [
            [
              { text: matrix[0], alignment: 'center' },
              { text: matrix[1], alignment: 'center' },
              { text: matrix[2], alignment: 'center' },
            ],
            [
              { text: matrix[3], alignment: 'center' },
              { text: matrix[4], alignment: 'center' },
              { text: matrix[5], alignment: 'center' },
            ],
            [
              { text: matrix[6], alignment: 'center' },
              { text: matrix[7], alignment: 'center' },
              { text: matrix[8], alignment: 'center' },
            ],
          ],
          alignment: 'center',
        },
      };
    }
  } else {
    value = {
      text: numberItem.values[numberItem.valueIndex],
      alignment: 'center',
    };
  }

  return value;
}

/**
 * calculates the overview table for the numbers
 * @param results the results of the analysis
 * @param firstNames the first name
 * @param lastName the last name
 */
function calculateResultOverviewTable(
  results,
  firstNames,
  lastName,
  compareResults = null,
  compareFirstNames = null,
  compareLastName = null,
) {
  // creating overview table data
  const overviewTableBody = [];

  // adding first row with name
  if (!compareResults) {
    overviewTableBody.push([
      {
        text: `${firstNames} ${lastName}`,
        colSpan: 2,
        alignment: 'center',
      },
      {},
    ]);
  } else {
    overviewTableBody.push([
      {},
      {
        text: `${firstNames} ${lastName}`,
        alignment: 'center',
      },
      {
        text: `${compareFirstNames} ${compareLastName}`,
        alignment: 'center',
      },
    ]);
  }

  // adding cells for date
  results.forEach((resultItem, resultIndex) => {
    // getting compare item
    const compareResult = compareResults ? compareResults[resultIndex] : null;
    resultItem.numbers.forEach((numberItem, numberIndex) => {
      // getting table value for item
      const value = extractTableValueFromItem(numberItem);

      // getting compare value for item
      const compareNumberItem = compareResult
        ? compareResult.numbers[numberIndex]
        : null;
      const compareValue = compareNumberItem
        ? extractTableValueFromItem(compareNumberItem)
        : null;

      // pushing value onto table body object
      if (compareValue) {
        overviewTableBody.push([
          { text: numberItem.numberId, alignment: 'center' },
          value,
          compareValue,
        ]);
      } else {
        overviewTableBody.push([
          { text: numberItem.numberId, alignment: 'center' },
          value,
        ]);
      }
    });
  });
  return overviewTableBody;
}

/**
 * returns an array representation of the state of the component
 * @param data the state to be transformed
 */
export function getResultArrayFormat(data) {
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
 * extracts item name and value from
 */
function extractNameAndValueFromItem(item) {
  let itemName = null;
  let itemValue = null;

  // determining name of element
  if (
    item.type === 'row' &&
    (item.result.value || item.result.values || item.result.list)
  ) {
    itemName = item.name;
    itemValue = item.result.value || item.result.values || item.result.list;

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

  return {
    itemName,
    itemValue,
  };
}

/**
 * build a pdf document from the analysis result given and opens it in new tab
 * @param analysisResult the analysis result with subsections
 * @param ristNames the first names of the analysis
 * @param lastName the last name of the analysis
 */
export function createPDFFromAnalysisResult(
  analysisResult,
  firstNames,
  lastName,
  compareAnalysisResult = null,
  compareFirstNames = null,
  compareLastName = null,
) {
  // getting result in array format
  const resultArray = getResultArrayFormat(analysisResult.personalAnalysis);
  let resultCompareArray = null;
  if (compareAnalysisResult) {
    resultCompareArray = getResultArrayFormat(compareAnalysisResult.personalAnalysis);
  }

  // getting lz to determine title image
  const lzValue = analysisResult.personalAnalysis.personalLevel.numbers.filter(item => item.numberId === 'LZ')[0].result.value;
  const titleImage = COVER_IMAGE_BY_LZ[lzValue] || COVER_IMAGE_BY_LZ[0];

  // defining pdf and default styling
  const docDefinition = {
    pageSize: 'A4',
    background(page) {
      // first pages => title page with background image
      if (page === 1) {
        return [
          {
            image: titleImage,
            width: 600,
          },
        ];
      }

      // checking if the page is in a range of level pages => background image
      let currentLevelName = null;
      Object.entries(levelPositionInformation).forEach(([key, value]) => {
        if (page >= value.startPage && page <= value.endPage) {
          currentLevelName = key;
        }
      });

      // if current page is in level rage => setting corresponding background image
      if (currentLevelName) {
        return [
          {
            image: LEVEL_BG_IMAGES[currentLevelName],
            width: 600,
          },
        ];
      }

      return null;
    },
    pageOrientation: 'portrait',
    pageMargins: [
      cmToPoints(PAGE_MARGIN_LEFT_CM),
      cmToPoints(PAGE_MARGIN_TOP_CM),
      cmToPoints(PAGE_MARGIN_RIGHT_CM),
      cmToPoints(PAGE_MARGIN_BOTTOM_CM),
    ],
    content: [
      {
        text: 'Persönlichkeitsnumeroskop',
        style: ['H1', 'TITLEPAGE_TITLE'],
        pageBreak: 'after',
      },
      {
        toc: {
          title: { text: 'Inhalt', style: 'H1' },
          // textMargin: [0, 0, 0, 0],
          textStyle: { lineHeight: 1.0 },
          numberStyle: { bold: true },
        },
      },
      {
        text: analysisResult.personalAnalysis.analysisIntro.title,
        style: ['H1'],
        tocItem: true,
        tocMargin: [0, 15, 0, 0],
        pageBreak: 'before',
      },
      [
        ...convertHTMLTextToPDFSyntax(analysisResult.personalAnalysis.analysisIntro.text),
      ],
      {
        text: 'Übersichtsblatt der Zahlen',
        style: ['H1'],
        marginBottom: 20,
        tocItem: true,
        pageBreak: 'before',
      },
      {
        columns: [
          { width: '*', text: '' },
          {
            width: 'auto',
            table: {
              body: calculateResultOverviewTable(
                resultArray,
                firstNames,
                lastName,
                resultCompareArray,
                compareFirstNames,
                compareLastName,
              ),
            },
          },
          { width: '*', text: '' },
        ],
      },
    ],
    pageBreakBefore(currentNode, followingNodesOnPage) {
      // heading is last element before footer
      if (currentNode.headlineLevel && followingNodesOnPage.length === 3) {
        return true;
      }

      // heading with subheadings is last element before footer
      if (
        currentNode.headlineLevel &&
        followingNodesOnPage[0].headlineLevel &&
        followingNodesOnPage.length === 4
      ) {
        return true;
      }

      return false;
    },
    header: (currentPage) => {
      if (currentPage === 1) {
        // first page in created document (page numbers are final) =>
        // getting information about the start pages of the different levels
        const levelEntries = Object.entries(levelPositionInformation);
        levelEntries.forEach(([key, value]) => {
          // setting start page correlating with start index
          levelPositionInformation[key].startPage =
            docDefinition.content[value.startIndex].positions[0].pageNumber;

          // setting stop page correlating with start index
          levelPositionInformation[key].endPage =
            docDefinition.content[value.endIndex].positions[0].pageNumber;
        });
      }
    },
    footer: (currentPage) => {
      // no footer of first page
      if (currentPage === 1) {
        return {
          text: `${firstNames} ${lastName}`,
          style: ['H2', 'TITLEPAGE_NAME'],
          pageBreak: 'after',
        };
      }

      // returning footer with name
      return {
        columns: [
          {
            text: `Persönlichkeitsnumeroskop für ${firstNames} ${lastName}`,
            width: 'auto',
          },
          { text: currentPage, alignment: 'right' },
        ],
        margin: [
          cmToPoints(PAGE_MARGIN_LEFT_CM),
          10,
          cmToPoints(PAGE_MARGIN_RIGHT_CM),
          0,
        ],
        fontSize: 10,
      };
    },
    defaultStyle: {
      font: 'MavenPro',
      fontSize: 12,
      lineHeight: 1.5,
    },
    styles: PDF_STYLES,
  };

  // pushing content to pdf
  resultArray.forEach((result, index) => {
    // getting color for current level
    const resultColor = LEVEL_COLORS[result.name] || '';

    // getting compare result
    let compareResult = null;
    if (resultCompareArray) {
      compareResult = resultCompareArray[index];
    }

    // saving information about first element of level -> the index saved will be the first index
    // of this level
    levelPositionInformation[result.name].startIndex =
      docDefinition.content.length;

    // adding level intro
    if (result.introText) {
      docDefinition.content.push({
        text: result.introText.title,
        style: ['H1', { color: resultColor }],
        pageBreak: 'before',
        tocItem: true,
      });
      docDefinition.content.push(...convertHTMLTextToPDFSyntax(result.introText.text, {
        h1: { color: resultColor },
        h2: { color: resultColor },
      }));
    }

    // adding numbers
    result.numbers.forEach((item, resultIndex) => {
      const { itemName, itemValue } = extractNameAndValueFromItem(item);

      // getting compare item
      let compareItem = null;
      let compareItemName = null;
      let compareItemValue = null;
      if (compareResult) {
        compareItem = compareResult.numbers[resultIndex];
        const extractedResult = extractNameAndValueFromItem(compareItem);
        compareItemName = extractedResult.itemName;
        compareItemValue = extractedResult.itemValue;
      }

      // if item name set => adding name and name subtitle
      if (itemName && itemValue) {
        // adding heading for number
        docDefinition.content.push({
          text: `${itemName} ${itemValue}`,
          style: ['H1', { color: resultColor }],
          headlineLevel: 'H1',
          tocItem: true,
          tocMargin: [15, 0, 0, 0],
        });

        // adding subheading with name if compare is present
        if (compareItem) {
          docDefinition.content.push({
            text: `mit Name ${firstNames} ${lastName}`,
            style: ['SUBTITLE', { color: resultColor }],
            headlineLevel: 'SUBTITLE',
          });
        }

        // adding number description if present
        if (item.numberDescription && item.numberDescription.description) {
          docDefinition.content.push(...convertHTMLTextToPDFSyntax(item.numberDescription.description, {
            text: 'NUMBERDESCRIPTION',
          }));
        }

        // adding number calculation description if present
        if (
          item.numberDescription &&
          item.numberDescription.calculationDescription
        ) {
          docDefinition.content.push(...convertHTMLTextToPDFSyntax(
            item.numberDescription.calculationDescription,
            { text: 'NUMBERDESCRIPTION' },
          ));
        }

        // pushing description text
        let descriptionText = null;

        // having to determine between standard and custom row
        if (item.type === 'row') {
          ({ descriptionText } = item);
        } else if (item.type === 'customRow') {
          descriptionText = item.values[item.descriptionTextIndex];
        }

        // if description text is present => adding to content
        if (descriptionText) {
          docDefinition.content.push(...convertHTMLTextToPDFSyntax(descriptionText, {
            h1: { color: resultColor },
            h2: { color: resultColor },
            ul: { markerColor: resultColor },
          }));
        }

        if (compareItem) {
          // adding heading for number
          docDefinition.content.push({
            text: `${compareItemName} ${compareItemValue}`,
            style: ['H1', { color: resultColor }],
            headlineLevel: 'H1',
            tocItem: true,
            tocMargin: [15, 0, 0, 0],
          });

          // adding subheading with name if compare is present
          docDefinition.content.push({
            text: `mit Name ${compareFirstNames} ${compareLastName}`,
            style: ['SUBTITLE', { color: resultColor }],
            headlineLevel: 'SUBTITLE',
          });

          // pushing description text
          let compareDescriptionText = null;

          // having to determine between standard and custom row
          if (item.type === 'row') {
            compareDescriptionText = compareItem.descriptionText;
          } else if (item.type === 'customRow') {
            compareDescriptionText =
              compareItem.values[compareItem.descriptionTextIndex];
          }

          // if description text is present => adding to content
          if (compareDescriptionText) {
            docDefinition.content.push(...convertHTMLTextToPDFSyntax(compareDescriptionText, {
              h1: { color: resultColor },
              h2: { color: resultColor },
              ul: { markerColor: resultColor },
            }));
          }
        }
      }
    });

    // saving information about last element of level -> the index saved will be the last index
    // of this level
    levelPositionInformation[result.name].endIndex =
      docDefinition.content.length - 1;
  });

  // creating pdf and opening in new tab
  pdfMake.createPdf(docDefinition).open();
}
