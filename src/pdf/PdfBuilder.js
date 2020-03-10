import pdfMake from "pdfmake/build/pdfmake";
import * as _ from "lodash";
import pdfFonts from "./fonts/vfs_fonts";

import { OVERALL_INTRO_KEY, CI_COLORS } from "../utils/Constants";

import { convertHTMLTextToPDFSyntax, imagePathToDataURL } from "./PdfHelper";
import {
  COVER_IMAGE_BY_LZ,
  BACKGROUND_IMAGES,
  BOOK_COVER
} from "./images/Images";
import {
  COPYRIGHT_NOTICE,
  LEGAL_NOTICE,
  PROMOTION_TEXT,
  BOOK_PROMOTION_TEXT
} from "./PdfTexts";

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
  H0: {
    fontSize: 30,
    bold: true,
    lineHeight: 1,
    marginBottom: 20,
    pageBreak: "before"
  },
  H1: {
    fontSize: 20,
    bold: true,
    marginTop: 40,
    marginBottom: 20,
    lineHeight: 1
  },
  H2: {
    fontSize: 16,
    marginTop: 24,
    marginBottom: 10,
    lineHeight: 1
  },
  H3: {
    fontSize: 12,
    bold: true,
    marginTop: 12,
    marginBottom: 5,
    lineHeight: 1,
    color: CI_COLORS.BLACK
  },
  H4: {
    fontSize: 16,
    marginTop: 16,
    color: CI_COLORS.GREY,
    lineHeight: 1
  },
  B: {
    bold: true
  },
  LIST: {
    markerColor: CI_COLORS.GREEN
  },
  SUBTITLE: {
    marginBottom: 10,
    lineHeight: 1
  },
  NUMBERDESCRIPTION: {
    color: CI_COLORS.GREY,
    fontSize: 12,
    bold: true
  },
  TABLE: {
    margin: [0, 10, 0, 10],
    fontSize: 10,
    alignment: "left"
  },
  TBALE_HEADING: {
    bold: true,
    alignment: "center"
  },
  TITLEPAGE_TITLE: {
    alignment: "center",
    color: CI_COLORS.WHITE,
    fontSize: 31,
    bold: true
  },
  TITLEPAGE_TITLE_SHADOW: {
    alignment: "center",
    color: "#555555",
    fontSize: 31,
    bold: true
  },
  TITLEPAGE_NAME: {
    alignment: "center",
    color: CI_COLORS.WHITE,
    fontSize: 25,
    bold: true,
    marginTop: -5
  }
};

// setting fonts for pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  MavenPro: {
    normal: "MavenPro-Regular.ttf",
    bold: "MavenPro-Bold.ttf",
    italics: "MavenPro-Regular.ttf",
    bolditalics: "MavenPro-Regular.ttf"
  },
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf"
  }
};

/**
 * builds and initializes an object to keep track of the position of
 * different sections in the pdf given the passed configuration
 * @param configuration the configuration to be used for the pdf generation
 */
function buildSectionPositionInformation(configuration) {
  // template for result
  const result = {};

  // keeping track of the location of every section in the config
  configuration.forEach(configSection => {
    result[configSection.name] = {
      startIndex: null,
      endIndex: null,
      startPage: null,
      endPage: null
    };
  });

  return result;
}

/**
 * converts centimeters to points for margins etc.
 * @param centimeters the centimeter value to transform
 * @return the point equivalent to centimeters
 */
function cmToPoints(centimeters) {
  return (centimeters / INCH_IN_CM) * PIXEL_DENSITY;
}

/**
 * Tests if the values for two result items are equal
 */
function areResultValuesEqual(resultValue, compareResultValue) {
  if (resultValue === compareResultValue) {
    return true;
  }

  if (Array.isArray(resultValue) && Array.isArray(compareResultValue)) {
    return resultValue.every(item => compareResultValue.includes(item));
  }
  return false;
}

/**
 * extracts from the number item a value suitable for display in the overview table
 */
function createOverviewTableItem(numberItem) {
  // defining overview table element and constructing based on type of result
  let overviewTableElement;
  // case a) number => display simple number
  // case b) list => show whole list
  // case c) matrix => showing table
  if (numberItem.result.type === "number") {
    overviewTableElement = { text: numberItem.result.value, alignment: "left" };
  } else if (numberItem.result.type === "list") {
    overviewTableElement = {
      text: numberItem.result.list.join(","),
      alignment: "left"
    };
  } else {
    const matrix = numberItem.result.values.map(item =>
      item && item.length > 0 ? item : "     "
    );
    overviewTableElement = {
      table: {
        dontBreakRows: true,
        heights: 40,
        widths: [40, 40, 40],
        body: [
          [
            { text: matrix[0], alignment: "center" },
            { text: matrix[1], alignment: "center" },
            { text: matrix[2], alignment: "center" }
          ],
          [
            { text: matrix[3], alignment: "center" },
            { text: matrix[4], alignment: "center" },
            { text: matrix[5], alignment: "center" }
          ],
          [
            { text: matrix[6], alignment: "center" },
            { text: matrix[7], alignment: "center" },
            { text: matrix[8], alignment: "center" }
          ]
        ],
        alignment: "left"
      }
    };
  }

  // bold if highlighted
  overviewTableElement.bold = numberItem.highlighted;
  return overviewTableElement;
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
  compareLastName = null
) {
  // creating overview table data
  const overviewTableBody = [];

  // adding first row with name
  if (!compareResults) {
    overviewTableBody.push([
      {
        text: `${firstNames} ${lastName}`,
        colSpan: 2,
        alignment: "center"
      },
      {}
    ]);
  } else {
    overviewTableBody.push([
      {},
      {
        text: `${firstNames} ${lastName}`,
        alignment: "center"
      },
      {
        text: `${compareFirstNames} ${compareLastName}`,
        alignment: "center"
      }
    ]);
  }

  // adding cells for date
  results.forEach((resultItem, resultIndex) => {
    // getting compare item
    const compareResult = compareResults ? compareResults[resultIndex] : null;
    resultItem.numbers.forEach((numberItem, numberIndex) => {
      // getting table value for item
      const value = createOverviewTableItem(numberItem);
      const { name } = numberItem;

      // getting compare value for item
      const compareNumberItem = compareResult
        ? compareResult.numbers[numberIndex]
        : null;
      const compareValue = compareNumberItem
        ? createOverviewTableItem(compareNumberItem)
        : null;

      // pushing value onto table body object
      if (compareValue) {
        overviewTableBody.push([
          { text: name, alignment: "left" },
          value,
          shouldShowDuplicatedComparisonResult(numberItem.numberId)
            ? compareValue
            : ""
        ]);
      } else {
        overviewTableBody.push([
          {
            text: name,
            bold: numberItem.highlighted,
            alignment: "left"
          },
          value
        ]);
      }
    });
  });
  return overviewTableBody;
}

function shouldShowDuplicatedComparisonResult(numberId) {
  const notToShow = [
    "LZ",
    "WZ",
    "GZ",
    "TZ",
    "BfZ",
    "GDR",
    "GDR-V",
    "GDR-F",
    "GDR-I",
    "VZ-B",
    "VZ-P",
    "VZ-E",
    "HF1",
    "HF2",
    "HF3",
    "HF4",
    "HP1",
    "HP2",
    "HP3",
    "HP4",
    "PJ",
    "PJNJ"
  ];

  return notToShow.findIndex(id => id === numberId) === -1;
}

/**
 * builds the result structure for the pdf generation based on the analysis result and the
 * given configuration
 * @param resultData result of the analysis
 * @param configuration the current configuration to generate the pdf in accordance with
 * @param introTexts an array of introduction texts for the different levels
 * @returns an array of sections of the pdf containing a name, intro text and an array of result items per section
 */
export function buildResultDataStructure(
  resultData,
  configuration,
  introTexts
) {
  // if any of the parameters is null => return null
  if (!resultData || !configuration) {
    return null;
  }
  // mapping sections to result items with all numbers of tables aggregated and resolved against result
  return configuration.map(configSection => {
    // container for all numbers in section (not ids but resolved result objects)
    const numbers = [];
    // iterating over tables and aggregating numbers
    configSection.tables.forEach(table => {
      // adding numbers (resolved  for result objects) to numbers
      numbers.push(
        ...table.numberIds.map(numberId => _.get(resultData, numberId))
      );
    });

    // finding intro text in input param
    const sectionIntroText = introTexts.filter(
      text => text.sectionId === configSection.name
    )[0];

    // returning full section with resolved and aggregated numbers
    return {
      name: configSection.name,
      color: configSection.color,
      introText: sectionIntroText,
      numbers
    };
  });
}

/**
 * build a pdf document from the analysis result given and opens it in new tab
 * @param analysisResult the analysis result with subsections
 * @param firstNames the first names of the analysis
 * @param lastName the last name of the analysis
 * @param fileName name of the file to download as
 * @param compareAnalysisResult the compare analysis result with subsections
 * @param compareFirstNames the first name input to the compare analysis
 * @param compareLastName the last name input to the compare analysis
 * @param includePromotion flag that indicates if a promotional text should be added
 * to the end of the PDF
 */
export async function createPDFFromAnalysisResult(
  analysisResult,
  configuration,
  configurationId,
  introTexts,
  firstNames,
  lastName,
  fileName = null,
  includePromotion = false,
  compareAnalysisResult = null,
  compareFirstNames = null,
  compareLastName = null
) {
  // preparing data structure to generate pdf from for result
  const resultSections = buildResultDataStructure(
    analysisResult,
    configuration,
    introTexts
  );

  // preparing data structure to generate pdf from for result (might be null)
  const resultsCompareSections = buildResultDataStructure(
    compareAnalysisResult,
    configuration,
    introTexts
  );

  // getting pdf Intro text
  const pdfIntroText = introTexts.filter(
    text => text.sectionId === OVERALL_INTRO_KEY(configurationId)
  )[0];
  pdfIntroText.title = "Einführung";

  // building section location info object. This is used to keep track
  // of the position of different sections throughout the document and is
  // build up as the pdf is generated
  const sectionPositionInformation = buildSectionPositionInformation(
    configuration
  );

  // getting lz to determine title image
  const lzValue = analysisResult.lz.result.value;
  const titleImage = COVER_IMAGE_BY_LZ[lzValue] || COVER_IMAGE_BY_LZ[0];

  const titleImageData = await imagePathToDataURL(titleImage);

  // defining pdf and default styling
  const docDefinition = {
    pageSize: "A4",
    background(page) {
      // first pages => title page with background image
      if (page === 1) {
        return [
          {
            image: titleImageData,
            width: 600
          }
        ];
      }

      // checking if the page is in a range of level pages => background image
      let currentSectionName = null;
      Object.entries(sectionPositionInformation).forEach(([key, section]) => {
        // if page is within range of section => setting background image
        if (page >= section.startPage && page <= section.endPage) {
          currentSectionName = key;
        }
      });

      // getting section color
      let currentResultSection = resultSections.filter(
        section => section.name === currentSectionName
      )[0];

      // if current page is in level rage => setting corresponding background image
      if (
        currentResultSection &&
        currentResultSection.color &&
        BACKGROUND_IMAGES[currentResultSection.color]
      ) {
        return [
          {
            image: BACKGROUND_IMAGES[currentResultSection.color],
            absolutePosition: { x: 550, y: 350 },
            width: 50
          }
        ];
      }
      return null;
    },
    pageOrientation: "portrait",
    pageMargins: [
      cmToPoints(PAGE_MARGIN_LEFT_CM),
      cmToPoints(PAGE_MARGIN_TOP_CM),
      cmToPoints(PAGE_MARGIN_RIGHT_CM),
      cmToPoints(PAGE_MARGIN_BOTTOM_CM)
    ],
    content: [
      {
        text: "Persönlichkeitsnumeroskop",
        absolutePosition: { x: 103, y: 501 },
        style: "TITLEPAGE_TITLE_SHADOW"
      },
      {
        text: "Persönlichkeitsnumeroskop",
        absolutePosition: { x: 102, y: 500 },
        style: "TITLEPAGE_TITLE",
        pageBreak: "after"
      },
      {
        toc: {
          title: { text: "Inhalt", style: "H1" },
          textStyle: { lineHeight: 1.0 },
          numberStyle: { bold: true }
        }
      },
      {
        text: pdfIntroText.title,
        style: ["H1"],
        tocItem: true,
        tocMargin: [0, 15, 0, 0],
        pageBreak: "before"
      },
      [...convertHTMLTextToPDFSyntax(pdfIntroText.text)],
      {
        text: "Übersichtsblatt der Zahlen",
        style: ["H1", { alignment: "center" }],
        marginBottom: 20,
        tocItem: true,
        pageBreak: "before"
      },
      {
        columns: [
          { width: "*", text: "" },
          {
            width: "auto",
            table: {
              dontBreakRows: true,
              body: calculateResultOverviewTable(
                resultSections,
                firstNames,
                lastName,
                resultsCompareSections,
                compareFirstNames,
                compareLastName
              )
            }
          },
          { width: "*", text: "" }
        ]
      }
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
    header: currentPage => {
      if (currentPage === 1) {
        // first page in created document (page numbers are final) =>
        // getting information about the start pages of the different levels
        const levelEntries = Object.entries(sectionPositionInformation);
        levelEntries.forEach(([key, value]) => {
          // setting start page correlating with start index
          if (value.startIndex) {
            sectionPositionInformation[key].startPage =
              docDefinition.content[value.startIndex].positions[0].pageNumber;
          }

          // setting stop page correlating with start index
          if (value.endIndex)
            sectionPositionInformation[key].endPage =
              docDefinition.content[value.endIndex].positions[0].pageNumber;
        });
      }
    },
    footer: currentPage => {
      // no footer of first page
      if (currentPage === 1) {
        return {
          text: `${firstNames} ${lastName}`,
          style: ["TITLEPAGE_NAME"],
          pageBreak: "after"
        };
      }

      // returning footer with name
      return {
        columns: [
          {
            text: `Persönlichkeitsnumeroskop für ${firstNames} ${lastName} - www.psychologischenumerologie.eu`,
            width: "auto"
          },
          { text: currentPage, alignment: "right" }
        ],
        margin: [
          cmToPoints(PAGE_MARGIN_LEFT_CM / 2),
          10,
          cmToPoints(PAGE_MARGIN_RIGHT_CM / 2),
          0
        ],
        fontSize: 10
      };
    },
    defaultStyle: {
      font: "MavenPro",
      fontSize: 12,
      lineHeight: 1.5
    },
    styles: PDF_STYLES
  };

  // pushing content to pdf => each level
  resultSections
    .filter(resultSection =>
      // checking if any numbers on the section has description text => excluding section if not. Rule: No empty sections (just intro text)
      resultSection.numbers.some(number => {
        const itemDescriptionText = number.descriptionText;
        return itemDescriptionText && itemDescriptionText.length > 0;
      })
    )
    .forEach((resultSection, index) => {
      // getting color for current level
      const resultColor =
        resultSection.color && CI_COLORS[resultSection.color]
          ? CI_COLORS[resultSection.color]
          : "";

      // getting compare result
      let resultCompareSection = null;
      if (resultsCompareSections) {
        // find out the index
        const compareIndex = resultSections.findIndex(
          item => item === resultSection
        );
        resultCompareSection = resultsCompareSections[compareIndex];
      }

      // saving information about first element of level -> the index saved will be the first index
      // of this level
      sectionPositionInformation[resultSection.name].startIndex =
        docDefinition.content.length;

      // adding level intro
      if (resultSection.introText) {
        docDefinition.content.push({
          text: resultSection.introText.title,
          style: ["H0", { color: resultColor, alignment: "center" }],
          marginBottom: 50,
          pageBreak: "before",
          tocItem: true,
          tocStyle: { color: resultColor }
        });
        docDefinition.content.push(
          ...convertHTMLTextToPDFSyntax(resultSection.introText.text, {
            h1: { color: resultColor }
          })
        );
      }

      // adding number results for all numbers with descriptionText
      resultSection.numbers.forEach((number, resultIndex) => {
        if (number.descriptionText && number.descriptionText.length > 0) {
          // getting name and value of
          const itemName = number.name;
          const itemValue =
            number.result.type !== "matrix" &&
            (number.result.value || number.result.list);

          // getting if there is a compare item
          let compareItem = null;
          let compareItemName = null;
          let compareItemValue = null;
          if (resultCompareSection) {
            // getting comparer result item
            compareItem = resultCompareSection.numbers[resultIndex];

            // getting name and value of compare item
            compareItemName = compareItem.name;
            compareItemValue =
              compareItem.result.type !== "matrix" &&
              (compareItem.result.value || compareItem.result.list);
          }

          // checking if item is empty
          const itemEmpty =
            !itemValue || (Array.isArray(itemValue) && itemValue.length === 0);

          // if item name set => adding name and name subtitle
          if (itemName && !itemEmpty) {
            // adding heading for number
            docDefinition.content.push({
              text: `${itemName} ${itemValue}`,
              style: ["H1", { color: resultColor }],
              marginBottom:
                compareItem &&
                !areResultValuesEqual(compareItemValue, itemValue)
                  ? 0
                  : 20,
              headlineLevel: "H1",
              tocItem: true,
              tocStyle: { color: resultColor },
              tocMargin: [15, 0, 0, 0]
            });

            // adding subheading with name if compare is present
            if (
              compareItem &&
              !areResultValuesEqual(compareItemValue, itemValue)
            ) {
              docDefinition.content.push({
                text: `mit Name ${firstNames} ${lastName}`,
                style: ["SUBTITLE", { color: resultColor }],
                headlineLevel: "SUBTITLE"
              });
            }

            // adding number description if present
            if (
              number.numberDescription &&
              number.numberDescription.description
            ) {
              docDefinition.content.push({
                stack: [
                  ...convertHTMLTextToPDFSyntax(
                    number.numberDescription.description,
                    {
                      text: "NUMBERDESCRIPTION"
                    }
                  )
                ],
                marginBottom: 10
              });
            }

            // adding number calculation description if present
            if (
              number.numberDescription &&
              number.numberDescription.calculationDescription
            ) {
              docDefinition.content.push({
                stack: [
                  ...convertHTMLTextToPDFSyntax(
                    number.numberDescription.calculationDescription,
                    { text: "NUMBERDESCRIPTION" }
                  )
                ],
                marginBottom: 10
              });
            }

            // pushing description text
            let { descriptionText } = number;

            // if description text is present => adding to content
            if (descriptionText) {
              docDefinition.content.push(
                ...convertHTMLTextToPDFSyntax(descriptionText, {
                  h1: { color: resultColor },
                  ul: { markerColor: resultColor }
                })
              );
            }

            // adding compare item
            if (
              compareItem &&
              !areResultValuesEqual(compareItemValue, itemValue)
            ) {
              // adding heading for number
              docDefinition.content.push({
                text: `${compareItemName} ${compareItemValue}`,
                style: ["H1", { color: resultColor }],
                headlineLevel: "H1",
                tocItem: true,
                tocStyle: { color: resultColor },
                tocMargin: [15, 0, 0, 0]
              });

              // adding subheading with name if compare is present
              docDefinition.content.push({
                text: `mit Name ${compareFirstNames} ${compareLastName}`,
                style: ["SUBTITLE", { color: resultColor }],
                headlineLevel: "SUBTITLE",
                marginBottom: 20
              });

              // pushing description text
              let compareDescriptionText = compareItem.descriptionText;

              // if description text is present => adding to content
              if (compareDescriptionText) {
                docDefinition.content.push(
                  ...convertHTMLTextToPDFSyntax(compareDescriptionText, {
                    h1: { color: resultColor },
                    ul: { markerColor: resultColor }
                  })
                );
              }
            }
          }
        }
      });

      // saving information about last element of level -> the index saved will be the last index
      // of this level
      sectionPositionInformation[resultSection.name].endIndex =
        docDefinition.content.length - 1;
    });

  // if flag is set => adding promotional text
  if (!includePromotion) {
    // pushing title
    docDefinition.content.push({
      text: "Entdecken Sie noch mehr über sich in der Langtext-Version",
      style: ["H1"],
      tocItem: true,
      pageBreak: "before",
      marginBottom: 10
    });
    // pushing text
    docDefinition.content.push(...convertHTMLTextToPDFSyntax(PROMOTION_TEXT));
  }

  // adding legal text at end of pdf
  docDefinition.content.push({
    text: "Urheberrechtshinweis",
    style: ["H1"],
    tocItem: true,
    pageBreak: "before",
    marginBottom: 10
  });

  docDefinition.content.push({
    text: COPYRIGHT_NOTICE
  });

  // adding legal text at end of pdf
  docDefinition.content.push({
    text: "Haftungsausschluss",
    style: ["H1"],
    tocItem: true,
    marginBottom: 10
  });

  docDefinition.content.push({
    text: LEGAL_NOTICE
  });

  docDefinition.content.push({
    text: "Weiterführende Inhalte",
    style: ["H1"],
    tocItem: true,
    pageBreak: "before",
    marginBottom: 10
  });

  docDefinition.content.push(
    ...convertHTMLTextToPDFSyntax(BOOK_PROMOTION_TEXT.intro)
  );

  const cover1ImageData = await imagePathToDataURL(BOOK_COVER[1]);
  const cover2ImageData = await imagePathToDataURL(BOOK_COVER[2]);

  docDefinition.content.push({
    columns: [
      ...convertHTMLTextToPDFSyntax(BOOK_PROMOTION_TEXT.cover1),
      {
        image: cover1ImageData,
        width: 150,
        marginLeft: 50
      }
    ]
  });
  docDefinition.content.push({
    columns: [
      ...convertHTMLTextToPDFSyntax(BOOK_PROMOTION_TEXT.cover2),
      {
        image: cover2ImageData,
        width: 150,
        marginLeft: 50
      }
    ]
  });

  // creating pdf and opening in new tab
  pdfMake.createPdf(docDefinition).download(fileName);
}
