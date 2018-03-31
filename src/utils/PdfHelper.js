function convertHTMLElementToPDFSyntax(htmlElement) {
  // 3 = TEXT_NODE, 1 = VALID_ELEMENT_NODES
  if (htmlElement.nodeType === 3) {
    return { text: `${htmlElement.textContent.trim()} ` };
  } else if (htmlElement.nodeType === 1) {
    // breaks are nodes not in syntax. implicit with new paragraph
    if (htmlElement.nodeName === 'BR') {
      return { text: ' \n ' };
    }

    // adding newline to titles if inline
    if (['H1', 'H2', 'H3'].includes(htmlElement.nodeName)) {
      return {
        text: `\n ${htmlElement.textContent} \n`,
        style: htmlElement.nodeName,
      };
    }

    // TODO handle lists

    // TODO handle tables

    // otherwise returning node with styling
    return {
      text: `${htmlElement.textContent} `,
      style: htmlElement.nodeName,
    };
  }

  return null;
}

export default function convertHTMLTextToPDFSyntax(htmlText) {
  // creating parser and parsing html
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(htmlText, 'text/html');

  // getting array of all child elements of parsed body
  const childElements = Array.from(htmlDoc.body.childNodes);

  // applying convert function on all elements, this function can return null to remove
  let transformed = childElements.map(element =>
    convertHTMLElementToPDFSyntax(element));

  // filtering null elements and returning result
  transformed = transformed.filter(item => item);

  console.log(transformed);

  return transformed;
}
