import {
  replaceUmlauts,
  preprocessString,
  preprocessDateOfBirth,
  splitNumberIntoDigitArray,
  calculateAZ,
  calculateBZ,
  calculateNNZ,
  calculateWZ,
  calculateLZ,
  calculateIZ,
  calculateSZ,
  calculateGZ,
  calculateGDR,
  calculateGDRV,
  calculateGDRF,
  calculateGDRI,
  calculateTZ,
  calculateKZ,
  calculateBfZ,
  calculateVisZ,
} from '../utils/Server';

// constants
const TEST_FIRSTNAME = 'Christoph';
const TEST_MIDDLENAME = 'Georg';
const TEST_LASTNAME = 'Hechenblaikner';
const TEST_DATE_OF_BIRTH = '18.04.1989';

// reference values
const REF_AZ = 2;
const REF_AZ_FULL_NAME = 7;
const REF_BZ = 6;
const REF_BZ_FULL_NAME = 4;
const REF_NNZ = 8;
const REF_WZ = 36;
const REF_LZ = 9;
const REF_IZ = 5;
const REF_GZ = 9;
// TODO
const REF_GDR = [3, 6, 9, null, null, null, 11, null, 7];
// TODO
const REF_GDR_V = 1;
// TODO
const REF_GDR_F = 2;
// TODO
const REF_GDR_I = 0;
const REF_TZ = 4;
const REF_KZ = 3;
const REF_BFZ = 4;
const REF_VISZ = 8;
const REF_VISZ_FULL_NAME = 1;

/* String umlaut handling */
it('replaces lowercase umlauts in name preprocessing', () => {
  expect(replaceUmlauts('Chröstüph Hächenblückner')).toBe('Chroestueph Haechenblueckner');
});

it('replaces upercase umlauts in name preprocessing', () => {
  expect(replaceUmlauts('ChrÖstÜph HÄchenblÜckner')).toBe('ChrOEstUEph HAEchenblUEckner');
});

it('replaces multiple umlauts in strings', () => {
  expect(replaceUmlauts('öäüÖÄÜöäüÖÄÜ')).toBe('oeaeueOEAEUEoeaeueOEAEUE');
});

/* String slicing */
it('should split strings on preprocess', () => {
  expect(preprocessString('fooBar')).toEqual(['f', 'o', 'o', 'B', 'a', 'r']);
});

it('should filter spaces on preprocess', () => {
  expect(preprocessString('f o o  B   a  r')).toEqual(expect.arrayContaining(['f', 'o', 'o', 'B', 'a', 'r']));
});

/* date of birth preprocessing */
it('produces an array of digits from string in form dd.mm.yyyy in preprocess step', () => {
  expect(preprocessDateOfBirth(TEST_DATE_OF_BIRTH)).toEqual(expect.arrayContaining([1, 8, 0, 4, 1, 9, 8, 9]));
});

/* Number slicing */
it('should slice numbers into digit arrays correctly', () => {
  expect(splitNumberIntoDigitArray(1234567)).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6, 7]));
});

/* AZ calculation */
it('AZ (only first and last name) is calculated according to reference value', () => {
  expect(calculateAZ(
    preprocessString(TEST_FIRSTNAME),
    preprocessString(TEST_LASTNAME),
  )).toBe(REF_AZ);
});

it('AZ (first, last and middle name) is calculated according to reference value', () => {
  expect(calculateAZ(
    preprocessString(TEST_FIRSTNAME).concat(preprocessString(TEST_MIDDLENAME)),
    preprocessString(TEST_LASTNAME),
  )).toBe(REF_AZ_FULL_NAME);
});

/* BZ calculation */
it('BZ (only firstname and lastname) is calculated according to reference value', () => {
  expect(calculateBZ(
    preprocessString(TEST_FIRSTNAME),
    preprocessString(TEST_LASTNAME),
  )).toBe(REF_BZ);
});
it('BZ (first, middle and last name) is calculated according to reference value', () => {
  expect(calculateBZ(
    preprocessString(TEST_FIRSTNAME).concat(preprocessString(TEST_MIDDLENAME)),
    preprocessString(TEST_LASTNAME),
  )).toBe(REF_BZ_FULL_NAME);
});

/* NZZ calculation */
it('NZZ is calculated according to reference value', () => {
  expect(calculateNNZ(preprocessString(TEST_LASTNAME))).toBe(REF_NNZ);
});

/* WZ calculation */
it('WZ is calculated according to reference value', () => {
  expect(calculateWZ(preprocessDateOfBirth(TEST_DATE_OF_BIRTH))).toBe(REF_WZ);
});

/* LZ calculation */
it('LZ is calculated according to reference value', () => {
  expect(calculateLZ(preprocessDateOfBirth(TEST_DATE_OF_BIRTH))).toBe(REF_LZ);
});

/* IZ calculation */
it('IZ (fistname, lastname only) is calculated according to reference value with unique maximum', () => {
  expect(calculateIZ(
    preprocessString(TEST_FIRSTNAME),
    preprocessString(TEST_LASTNAME),
  )).toBe(REF_IZ);
});

it('IZ (fistname, lastname only) is calculated according to reference value with NO unique maximum', () => {
  expect(calculateIZ(
    preprocessString('aaaabbbbccddeeff'),
    preprocessString('hhhhiijjkk'),
    preprocessDateOfBirth(TEST_DATE_OF_BIRTH),
  )).toBe(calculateSZ(preprocessDateOfBirth(TEST_DATE_OF_BIRTH)));
});

/* GZ calculation */
it('GZ is calculated according to reference value', () => {
  expect(calculateGZ(preprocessDateOfBirth(TEST_DATE_OF_BIRTH))).toBe(REF_GZ);
});

/* GDR calculation */
it('GDR is calculated according to reference value', () => {
  expect(calculateGDR(preprocessDateOfBirth(TEST_DATE_OF_BIRTH))).toBe(REF_GDR);
});

it('GDR-V should be calculated correctly', () => {
  expect(calculateGDRV([1, 1, 1, null, null, null, 1, 1, 1])).toBe(expect.arrayContaining([3, 6, 9, 1, 4, 7]));
});

it('GDR-F should be calculated correctly', () => {
  expect(calculateGDRF([1, 1, 1, null, null, null, 1, 1, 1])).toBe(expect.arrayContaining([2, 5, 8]));
});

it('GDR-I should detect single entry in middle', () => {
  expect(calculateGDRI([null, null, null, null, 1, null, null, null, null])).toBe(expect.arrayContaining([5]));
});

it('GDR-I should detect edge case of isolation', () => {
  expect(calculateGDRI([1, 2, 3, null, null, 1, 1, null, null])).toBe(expect.arrayContaining([7]));
});

/* TZ calculation */
it('TZ is calculated according to reference value', () => {
  expect(calculateTZ(preprocessDateOfBirth(TEST_DATE_OF_BIRTH))).toBe(REF_TZ);
});

/* KZ calculation */
it('KZ is calculated according to reference value', () => {
  expect(calculateKZ(preprocessString(TEST_FIRSTNAME))).toBe(REF_KZ);
});

/* BfZ calculation */
it('BfZ is calculated according to reference value', () => {
  expect(calculateBfZ(preprocessDateOfBirth(TEST_DATE_OF_BIRTH))).toBe(REF_BFZ);
});

/* VisZ calculation */
it('VisZ is calculated according to reference value (only first and last name)', () => {
  expect(calculateVisZ(preprocessDateOfBirth(TEST_DATE_OF_BIRTH))).toBe(REF_VISZ);
});

it('VisZ is calculated according to reference value (full name)', () => {
  expect(calculateVisZ(preprocessDateOfBirth(TEST_DATE_OF_BIRTH))).toBe(REF_VISZ_FULL_NAME);
});
