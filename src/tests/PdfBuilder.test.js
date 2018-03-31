import convertHTMLTextToPDFSyntax from '../utils/PdfHelper';

it('transforms html tags in formatted text string', () => {
  expect(convertHTMLTextToPDFSyntax('BEFORE_H<br>AFTER_BREAK<h1>HEADING</h1>AFTER_H<b>BOLD</b>')).toEqual([
    {
      text: ['BEFORE_H ', { text: '\n' }, 'AFTER_BREAK '],
    },
    { text: 'HEADING', style: 'H1' },
    { text: ['AFTER_H ', { text: 'BOLD ', style: 'B' }] },
  ]);
});

it('transforms lists correctly', () => {
  expect(convertHTMLTextToPDFSyntax('<ul><li>first</li><li>second</li></ul>')).toEqual([
    {
      ul: ['first', 'second'],
    },
  ]);
});

it('removes newlines properly', () => {
  expect(convertHTMLTextToPDFSyntax(`
    <UL>\n
    <LI>first</LI>
    <LI>second</LI>
    <LI>third\n \n</LI>
    <LI>fourth </LI>
    </UL>`)).toEqual([
    {
      ul: ['first', 'second', 'third', 'fourth'],
    },
  ]);
});

it('groups text and table/list elements correctly', () => {
  expect(convertHTMLTextToPDFSyntax(`
    bla1
    <h1>heading_bla</h1>
      <UL>\n
      <LI>first</LI>
      <LI>second</LI>
      <LI>third\n \n</LI>
      <LI>fourth </LI>
      </UL>
      blaend`)).toEqual([
    {
      text: ['bla1 '],
    },
    { text: 'heading_bla', style: 'H1' },
    {
      ul: ['first', 'second', 'third', 'fourth'],
    },
    {
      text: ['blaend '],
    },
  ]);
});

it('filters empty text elements properly', () => {
  expect(convertHTMLTextToPDFSyntax(`
    start
    <b>bold</b>        \n
    end`)).toEqual([
    {
      text: ['start ', { text: 'bold ', style: 'B' }, 'end '],
    },
  ]);
});
