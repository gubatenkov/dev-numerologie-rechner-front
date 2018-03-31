import convertHTMLTextToPDFSyntax from '../utils/PdfHelper';

it('transforms html tags in formatted text string', () => {
  expect(convertHTMLTextToPDFSyntax('BEFORE_H<br>AFTER_BREAK<h1>HEADING</h1>AFTER_H<b>BOLD</b>')).toContainEqual([
    { text: 'BEFORE_H' },
    { text: 'AFTER_BREAK' },
    { text: 'HEADING', style: 'H1' },
    { text: 'AFTER_H' },
    { text: 'BOLD', style: 'B' },
  ]);
});
