import { replaceUmlauts, preprocessString } from '../utils/Server';

it('replaces lowercase umlauts in name preprocessing', () => {
  expect(replaceUmlauts('Chröstüph Hächenblückner')).toBe('Chroestueph Haechenblueckner');
});

it('replaces upercase umlauts in name preprocessing', () => {
  expect(replaceUmlauts('ChrÖstÜph HÄchenblÜckner')).toBe('ChrOEstUEph HAEchenblUEckner');
});

it('replaces multiple umlauts in strings', () => {
  expect(replaceUmlauts('öäüÖÄÜöäüÖÄÜ')).toBe('oeaeueOEAEUEoeaeueOEAEUE');
});

it('should split strings on preprocess', () => {
  expect(preprocessString('fooBar')).toBe(['f', 'o', 'o', 'B', 'a', 'r']);
});

it('should filter spaces on preprocess', () => {
  expect(preprocessString('f o o  B   a  r')).toBe(['f', 'o', 'o', 'B', 'a', 'r']);
});

