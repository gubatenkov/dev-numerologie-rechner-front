import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from '../fonts/vfs_fonts';

import convertHTMLTextToPDFSyntax from './PdfHelper';

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
 * build a pdf document from the analysis result given and opens it in new tab
 * @param analysisResult the analysis result with subsections
 * @param ristNames the first names of the analysis
 * @param lastName the last name of the analysis
 */
export function createPDFFromAnalysisResult(
  analysisResult,
  firstNames,
  lastName,
) {
  // defining pdf and default styling
  const docDefinition = {
    pageSize: 'A5',
    pageOrientation: 'portrait',
    pageMargins: [40, 60, 40, 60],
    content: [
      {
        text: analysisResult.personalAnalysis.analysisIntro.title,
        style: 'H1',
      },
      {
        text: convertHTMLTextToPDFSyntax(analysisResult.personalAnalysis.analysisIntro.text),
        pageBreak: 'after',
      },
      {
        text: 'Übersichtsblatt der Zahlen',
        style: 'H1',
      },
      {
        text: 'TODO: Table with numbers goes here. ',
        pageBreak: 'after',
      },
    ],
    footer: currentPage => ({
      columns: [
        `Persoenlichkeitsnumeroskop fuer ${firstNames} ${lastName} mit Namensvergleich`,
        { text: currentPage, alignment: 'right' },
      ],
    }),
    defaultStyle: {
      font: 'MavenPro',
      fontSize: 8,
    },
    styles: {
      H1: {
        fontSize: 14,
        bold: true,
        marginTop: 10,
      },
      H2: {
        fontSize: 12,
      },
      H3: {
        fontSize: 10,
      },
      B: {
        bold: true,
      },
      SUBTITLE: {
        marginBottom: 10,
        fontSize: 10,
      },
    },
  };

  // getting result in array format
  const resultArray = getResultArrayFormat(analysisResult.personalAnalysis);

  // pushing content to pdf
  resultArray.forEach((result) => {
    // adding level intro
    if (result.introText) {
      docDefinition.content.push({
        text: result.introText.title,
        style: 'H1',
      });
      docDefinition.content.push({
        text: convertHTMLTextToPDFSyntax(result.introText.text),
      });
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

      // if item name set => adding name and name subtitle
      if (itemName && itemValue) {
        // adding heading for number
        docDefinition.content.push({
          text: `${itemName} ${itemValue}`,
          style: 'H1',
        });

        // adding subheading with name
        docDefinition.content.push({
          text: `mit Name ${firstNames} ${lastName}`,
          style: 'SUBTITLE',
        });

        // adding number description if present
        if (item.numberDescription && item.numberDescription.description) {
          docDefinition.content.push({
            text: convertHTMLTextToPDFSyntax(item.numberDescription.description),
          });
        }

        // adding number calculation description if present
        if (
          item.numberDescription &&
          item.numberDescription.calculationDescription
        ) {
          docDefinition.content.push({
            text: convertHTMLTextToPDFSyntax(item.numberDescription.calculationDescription),
          });
        }

        // pushing description text
        let descriptionText = null;

        // having to determine between standard and custom row
        if (item.type === 'row') {
          descriptionText = item.descriptionText;
        } else if (item.type === 'customRow') {
          descriptionText = item.values[item.descriptionTextIndex];
        }

        // if description text is present => adding to content
        if (descriptionText) {
          docDefinition.content.push({
            text: convertHTMLTextToPDFSyntax(descriptionText),
          });
        }
      } else {
        console.log('Result element not in pdf');
        console.log(item);
        console.log(itemName);
        console.log(itemValue);
      }
    });
  });

  // creating pdf and opening in new tab
  pdfMake.createPdf(docDefinition).open();
}
