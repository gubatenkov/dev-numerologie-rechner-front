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
  calculateIniZ,
  calculateSM,
  calculateSMV,
  calculateKL,
  calculateZSA,
  calculateVZB,
  calculateVZP,
  calculateVZE,
  calculateHF,
  calculateHP,
  sumDigitsWithIntermediateValues,
} from '../utils/Server';

// constants
const TEST_FIRSTNAME = 'Christoph';
const TEST_MIDDLENAME = 'Georg';
const TEST_LASTNAME = 'Hechenblaikner';
const TEST_DATE_OF_BIRTH = '18.04.1989';
// TODO this is not right
// const TEST_DATE_OF_BIRTH = '18.04.1985';

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
const REF_GDR = [null, null, 2, null, null, 2, 2, 1, null];
const REF_GDRV = [1, 4, 8, 9];
const REF_GDRF = [2, 3, 5, 6, 7];
const REF_TZ = 4;
const REF_KZ = 3;
const REF_BFZ = 4;
const REF_VISZ = 8;
const REF_VISZ_FULL_NAME = 1;

const REF_SZ = 4;
const REF_SZ_FULL_NAME = 6;
const REF_INIZ = 9;
const REF_INIZ_FULL_NAME = 2;
const REF_SM = [2, 3, 3, null, 5, 1, 1, 4, 4];
const REF_SMV = [1, 2, 3, 5, 6, 7, 8, 9];
const REF_KL = [4];
const REF_ZSA = 4;

const REF_VZB = 4;
const REF_VZP = 9;
const REF_VZE = 9;

const REF_HF = [4, 9, 4, 4];
const REF_HP = [4, 4, 8, 4];

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
  )).toBe(calculateSZ(
    preprocessString('aaaabbbbccddeeff'),
    preprocessString('hhhhiijjkk'),
  ));
});

/* GZ calculation */
it('GZ is calculated according to reference value', () => {
  expect(calculateGZ(preprocessDateOfBirth(TEST_DATE_OF_BIRTH))).toBe(REF_GZ);
});

/* GDR calculation */
it('GDR is calculated according to reference value', () => {
  expect(calculateGDR(preprocessDateOfBirth(TEST_DATE_OF_BIRTH))).toEqual(REF_GDR);
});

/* GDRV calculation */
it('GDR-V are calculated correctly for test vectors', () => {
  const value = calculateGDRV(calculateGDR(preprocessDateOfBirth(TEST_DATE_OF_BIRTH)));
  expect(value).toEqual(expect.arrayContaining(REF_GDRV));
  expect(value.length).toBe(REF_GDRV.length);
});

it('GDR-V should be calculated correctly', () => {
  expect(calculateGDRV([1, 1, 1, null, null, null, 1, 1, 1])).toEqual([
    3,
    6,
    9,
    1,
    4,
    7,
  ]);
});

/* GDRF calculation */
it('GDR-F should be calculated correctly', () => {
  expect(calculateGDRF([1, 1, 1, null, null, null, 1, 1, 1])).toEqual([
    2,
    5,
    8,
  ]);
});

it('GDR-F should be calculated correctly for test vector', () => {
  const value = calculateGDRF(calculateGDR(preprocessDateOfBirth(TEST_DATE_OF_BIRTH)));
  expect(value).toEqual(expect.arrayContaining(REF_GDRF));
  expect(value.length).toBe(REF_GDRF.length);
});

/* GDRI calculation */
it('GDR-I should detect single entry in middle', () => {
  expect(calculateGDRI([null, null, null, null, 1, null, null, null, null])).toEqual([5]);
});

it('GDR-I should detect edge case of isolation', () => {
  expect(calculateGDRI([1, 2, 3, null, null, 1, 1, null, null])).toEqual([1]);
});

it('GDR-I should detect edge case of isolation', () => {
  expect(calculateGDRI([1, 2, null, null, null, 1, 1, 1, null])).toEqual([8]);
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
  expect(calculateVisZ(
    preprocessString(TEST_FIRSTNAME),
    preprocessString(TEST_LASTNAME),
    preprocessDateOfBirth(TEST_DATE_OF_BIRTH),
  )).toBe(REF_VISZ);
});

it('VisZ is calculated according to reference value (full name)', () => {
  expect(calculateVisZ(
    preprocessString(TEST_FIRSTNAME).concat(preprocessString(TEST_MIDDLENAME)),
    preprocessString(TEST_LASTNAME),
    preprocessDateOfBirth(TEST_DATE_OF_BIRTH),
  )).toBe(REF_VISZ_FULL_NAME);
});

/* SZ calculation */
it('SZ is calculated according to reference value', () => {
  expect(calculateSZ(
    preprocessString(TEST_FIRSTNAME),
    preprocessString(TEST_LASTNAME),
    preprocessDateOfBirth(TEST_DATE_OF_BIRTH),
  )).toBe(REF_SZ);
});

it('SZ is calculated according to reference value (full name)', () => {
  expect(calculateSZ(
    preprocessString(TEST_FIRSTNAME).concat(preprocessString(TEST_MIDDLENAME)),
    preprocessString(TEST_LASTNAME),
    preprocessDateOfBirth(TEST_DATE_OF_BIRTH),
  )).toBe(REF_SZ_FULL_NAME);
});

/* IniZ calculation */
it('IniZ is calculated according to reference value', () => {
  expect(calculateIniZ(
    preprocessString(TEST_FIRSTNAME),
    preprocessString(TEST_LASTNAME),
    preprocessDateOfBirth(TEST_DATE_OF_BIRTH),
  )).toBe(REF_INIZ);
});

it('IniZ is calculated according to reference value (full name)', () => {
  expect(calculateIniZ(
    preprocessString(TEST_FIRSTNAME).concat(preprocessString(TEST_MIDDLENAME)),
    preprocessString(TEST_LASTNAME),
    preprocessDateOfBirth(TEST_DATE_OF_BIRTH),
  )).toBe(REF_INIZ_FULL_NAME);
});

/* SM calculation */
it('SM is calculated according to reference value', () => {
  expect(calculateSM(
    preprocessString(TEST_FIRSTNAME),
    preprocessString(TEST_LASTNAME),
  )).toEqual(REF_SM);
});

/* SMV calculation */
it('SMV is calculated according to reference value', () => {
  expect(calculateSMV(calculateSM(
    preprocessString(TEST_FIRSTNAME),
    preprocessString(TEST_LASTNAME),
  ))).toEqual(REF_SMV);
});

/* KL calculation */
it('KL is calculated according to reference value', () => {
  expect(calculateKL(calculateSM(
    preprocessString(TEST_FIRSTNAME),
    preprocessString(TEST_LASTNAME),
  ))).toEqual(REF_KL);
});

/* ZSA calculation */
it('KL is calculated according to reference value', () => {
  expect(calculateZSA(calculateKL(calculateSM(
    preprocessString(TEST_FIRSTNAME),
    preprocessString(TEST_LASTNAME),
  )))).toEqual(REF_ZSA);
});

/* VZ calculation */
it('VZB is calculated according to reference value', () => {
  expect(calculateVZB(preprocessDateOfBirth(TEST_DATE_OF_BIRTH))).toEqual(REF_VZB);
});

it('VZP is calculated according to reference value', () => {
  expect(calculateVZP(preprocessDateOfBirth(TEST_DATE_OF_BIRTH))).toEqual(REF_VZP);
});

it('VZE is calculated according to reference value', () => {
  expect(calculateVZE(preprocessDateOfBirth(TEST_DATE_OF_BIRTH))).toEqual(REF_VZE);
});

/* HF calculation */
it('HF is calculated according to reference value', () => {
  expect(calculateHF(preprocessDateOfBirth(TEST_DATE_OF_BIRTH))).toEqual(REF_HF);
});

/* HP calculation */
it('HP is calculated according to reference value', () => {
  expect(calculateHP(preprocessDateOfBirth(TEST_DATE_OF_BIRTH))).toEqual(REF_HP);
});

/* sumup with intermediate calculations */
it('sumup with intermediate values should reutrn an array of intediate values', () => {
  expect(sumDigitsWithIntermediateValues([9, 8])).toEqual([98, 17, 8]);
});

it('sumup with intermediate values should reutrn an array of intediate values', () => {
  expect(sumDigitsWithIntermediateValues([1, 6])).toEqual([16, 7]);
});
