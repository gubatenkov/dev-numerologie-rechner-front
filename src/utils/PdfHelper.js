/**
 * converts a html element into a pdfmake syntax string
 * @param htmlElement the html element to be transformed
 */
function convertHTMLElementToPDFSyntax(htmlElement) {
  // 3 = TEXT_NODE, 1 = VALID_ELEMENT_NODES
  if (htmlElement.nodeType === 3) {
    // making sure we get no empty text elements due to spaces
    const trimmedContent = htmlElement.textContent.trim();
    if (trimmedContent.length === 0) {
      return null;
    }
    return { text: `${trimmedContent} ` };
  }

  // breaks are nodes not in syntax. implicit with new paragraph
  if (htmlElement.nodeName === 'BR') {
    return { text: '\n' };
  }

  // adding newline to titles if inline
  if (['H1', 'H2', 'H3'].includes(htmlElement.nodeName)) {
    return {
      text: `${htmlElement.textContent.trim()}`,
      style: htmlElement.nodeName,
    };
  }

  // handling list items
  if (htmlElement.nodeName === 'UL') {
    return {
      ul: Array.from(htmlElement.getElementsByTagName('LI')).map(child =>
        child.textContent.trim()),
    };
  }

  // TODO handle tables

  // otherwise returning node with styling
  return {
    text: `${htmlElement.textContent.trim()} `,
    style: htmlElement.nodeName,
  };
}

/**
 * Converts html text into a collection of valid pdfmake syntax elements
 * @param htmlText html formatted string to be transofmed
 */
export default function convertHTMLTextToPDFSyntax(htmlText) {
  // removing line breaks from string
  const sanitizedText = htmlText.replace(/(\r\n|\n|\r)/gm, '');

  // creating parser and parsing html
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(sanitizedText, 'text/html');

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

    // if current element is list of table: push subresult (if present) and then list item
    if (['UL', 'TABLE', 'H1', 'H2', 'H3'].includes(currentElement.nodeName)) {
      // if we have subresult => pushing
      if (currentSubResult.length > 0) {
        groupedElements.push({
          text: currentSubResult,
        });
      }

      // clearing subresult
      currentSubResult = [];

      // pushing list or table itself
      groupedElements.push(convertHTMLElementToPDFSyntax(currentElement));
    } else {
      // pushing current element to sub result if not null
      const newElement = convertHTMLElementToPDFSyntax(currentElement);
      if (newElement) {
        currentSubResult.push(newElement);
      }

      // if last item => pushing converted subresults to rendresult
      if (index === childElements.length - 1 && currentSubResult.length > 0) {
        groupedElements.push({
          text: currentSubResult,
        });
      }
    }
  }

  return groupedElements;
}
