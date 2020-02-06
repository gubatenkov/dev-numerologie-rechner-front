// elements that need to be included top level in the result
const TOP_LEVEL_ELEMENTS = ["UL", "TABLE", "H1", "H2", "H3"];
// heading elements
const HEADING_ELEMENTS = ["H0", "H1", "H2", "H3", "H4"];

/**
 * converts a html element into a pdfmake syntax string
 * @param htmlElement the html element to be transformed
 * @param customStyle a dictionary of html tags (or "text" for non-tag elements) to stylings
 * that should be applied in addition to HTML tag based styling
 */
export function convertHTMLElementToPDFSyntax(htmlElement, customStyles = {}) {
  // 3 = TEXT_NODE, 1 = VALID_ELEMENT_NODES
  if (htmlElement.nodeType === 3) {
    // making sure we get no empty text elements due to spaces
    const trimmedContent = htmlElement.textContent.trim();
    if (trimmedContent.length === 0) {
      return null;
    }
    // if custom style is set => returning text with custom style
    if (customStyles.text) {
      return {
        text: `${trimmedContent} `,
        style: customStyles.text
      };
    }
    // returning plain text
    return `${trimmedContent} `;
  }

  // breaks are nodes not in syntax. implicit with new paragraph
  if (htmlElement.nodeName === "BR") {
    return { text: "\n" };
  }

  // adding newline to titles if inline
  if (HEADING_ELEMENTS.includes(htmlElement.nodeName)) {
    // defining text and style
    const resultDict = {
      text: `${htmlElement.textContent.trim()} \n`,
      style: customStyles[htmlElement.nodeName.toLowerCase()]
        ? [
            htmlElement.nodeName,
            customStyles[htmlElement.nodeName.toLowerCase()]
          ]
        : htmlElement.nodeName,
      headlineLevel: htmlElement.nodeName
    };

    // h1 custom styles
    if (htmlElement.nodeName === "H1") {
      resultDict.tocItem = false;
    }

    // returning result
    return resultDict;
  }

  // handling list items
  if (htmlElement.nodeName === "UL") {
    return {
      ul: Array.from(htmlElement.getElementsByTagName("LI")).map(child =>
        child.textContent.trim()
      ),
      style: customStyles.ul ? ["LIST", customStyles.ul] : "LIST"
    };
  }

  // handling table items
  if (htmlElement.nodeName === "TABLE") {
    // getting rows
    const tableRows = Array.from(htmlElement.getElementsByTagName("TR"));
    return {
      style: customStyles.table ? ["TABLE", customStyles.table] : "TABLE",
      table: {
        headerRows: 1,
        body: tableRows.map((row, rowIndex) =>
          Array.from(row.getElementsByTagName("TD")).map((col, colIndex) => {
            const stack = [];
            col.childNodes.forEach(node => {
              stack.push(convertHTMLElementToPDFSyntax(node));
            });
            return {
              stack,
              style: {
                bold: colIndex === 0 || rowIndex === 0,
                alignment: rowIndex === 0 ? "center" : "left"
              }
            };
          })
        )
      }
    };
  }

  // otherwise returning node with styling set to its tag name => can be styled externally any ways
  return {
    text: `${htmlElement.textContent.trim()} `,
    style: htmlElement.nodeName
  };
}

/**
 * Converts html text into a collection of valid pdfmake syntax elements
 * @param htmlText html formatted string to be transofmed
 * @param customStyle a custom style string applied to elements in addition to the ones based on
 * the html string. NOTE: not dominacne of custom stlyes and HTML stlyes is guaranteed
 */
export function convertHTMLTextToPDFSyntax(htmlText, customStyles = {}) {
  // removing line breaks from string
  const sanitizedText = htmlText.replace(/(\r\n|\n|\r)/gm, "");

  // creating parser and parsing html
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(sanitizedText, "text/html");

  // getting array of all child elements of parsed body
  const childElements = Array.from(htmlDoc.body.childNodes);

  // grouping elements as formatted text neets to be grouped and list and table need to be top level
  // ul, talbe, and headings need to be top elements of returned collection
  // stylings like b have to be inline to not cause new paragraph
  const groupedElements = [];
  let currentSubResult = [];
  for (let index = 0; index < childElements.length; index += 1) {
    // getting current item
    const currentElement = childElements[index];

    // if current element is top level element: push subresult (if present) and then list item
    if (TOP_LEVEL_ELEMENTS.includes(currentElement.nodeName)) {
      // if we have subresult => pushing
      if (currentSubResult.length > 0) {
        groupedElements.push({
          text: currentSubResult
        });
      }

      // clearing subresult
      currentSubResult = [];

      // pushing list or table itself
      groupedElements.push(
        convertHTMLElementToPDFSyntax(currentElement, customStyles)
      );
    } else {
      // pushing current element to sub result if not null
      const newElement = convertHTMLElementToPDFSyntax(
        currentElement,
        customStyles
      );
      if (newElement) {
        currentSubResult.push(newElement);
      }

      // if last item => pushing converted subresults to rendresult
      if (index === childElements.length - 1 && currentSubResult.length > 0) {
        groupedElements.push({
          text: currentSubResult
        });
      }
    }
  }
  return groupedElements;
}
