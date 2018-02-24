import _ from 'lodash';

// constants
const NUMBER_ID_AZ = 'AZ';
const NUMBER_ID_BZ = 'BZ';
const NUMBER_ID_NNZ = 'NNZ';

const NUMBER_ID_WZ = 'WZ';
const NUMBER_ID_LZ = 'LZ';
const NUMBER_ID_IZ = 'ID';
const NUMBER_ID_GZ = 'GZ';
const NUMBER_ID_GDR = 'GDR';
const NUMBER_ID_GDRV = 'GDR-V';
const NUMBER_ID_GDRF = 'GDR-F';
const NUMBER_ID_GDRI = 'GDR-I';

const NUMBER_ID_TZ = 'TZ';
const NUMBER_ID_KZ = 'KZ';
const NUMBER_ID_BFZ = 'BfZ';
const NUMBER_ID_VISZ = 'VisZ';

const NUMBER_ID_SZ = 'SZ';
const NUMBER_ID_INIZ = 'IniZ';
const NUMBER_ID_SM = 'SM';
const NUMBER_ID_SM_V = 'SM-V';
const NUMBER_ID_KL = 'KL';
const NUMBER_ID_ZSA = 'ZSA';

const NUMBER_ID_VZB = 'VZ-B';
const NUMBER_ID_VZP = 'VP-P';
const NUMBER_ID_VZE = 'VP-E';

const NUMBER_ID_HF = 'HF';
const NUMBER_ID_HP = 'HP';

// mapping from matrix index (as used by the UI) and the GDR indexing scheme
const GDR_INDEX_NUMBER_MAPPING = {
  0: 3,
  1: 6,
  2: 9,
  3: 2,
  4: 5,
  5: 8,
  6: 1,
  7: 4,
  8: 7,
};

/**
 * mocks server call to get user groups and analyses
 */
export function getUserGroupsAnalyses() {
  return [
    {
      id: 0,
      name: 'Familie',
      analyses: [
        { id: 0, name: 'Analyse Familie 1' },
        { id: 1, name: 'Analyse Familie 2' },
      ],
    },
    {
      id: 1,
      name: 'Stammfamilie',
      analyses: [
        { id: 2, name: 'Analyse Stammfamilie 1' },
        { id: 3, name: 'Analyse Stammfamilie 2' },
      ],
    },
    {
      id: 2,
      name: 'Verwandte',
      analyses: [
        { id: 4, name: 'Analyse Verwandte 1' },
        { id: 5, name: 'Analyse Verwandte 2' },
      ],
    },
    {
      id: 3,
      name: 'Freunde',
      analyses: [
        { id: 6, name: 'Analyse Freunde 1' },
        { id: 7, name: 'Analyse Freunde 2' },
      ],
    },
    {
      id: 4,
      name: 'Beruf',
      analyses: [
        { id: 8, name: 'Analyse Beruf 1' },
        { id: 9, name: 'Analyse Beruf 2' },
      ],
    },
    {
      id: 5,
      name: 'Freizeit',
      analyses: [
        { id: 10, name: 'Analyse Freizeit 1' },
        { id: 11, name: 'Analyse Freizeit 2' },
      ],
    },
    {
      id: 6,
      name: 'Sonstige',
      analyses: [
        { id: 12, name: 'Analyse Sonstige 1' },
        { id: 13, name: 'Analyse Sonstige 2' },
      ],
    },
  ];
}

/**
<<<<<<< HEAD
 * alphabet
 */
const ALPHABET = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

// vowels and consonants
const VOWELS = ['a', 'e', 'i', 'o', 'u'];
const UMLAUTS = ['ä', 'ü', 'ö'];
const UMLAUT_MAPPING = ['ae', 'ue', 'oe'];

/**
 * calculates the digit value of a character by mapping it according to a scheme
 * 1  2  3  4  5  6  7  8  9
 * a  b  c  d  e    ...    i
 * j  k  l  m  n    ...    r
 * s  t  u  v  w    ... z  -
 * where the value of the caracter corresponds with
 * the column number: e.g. d => 4, n => 5
 * @param char the character to be translated, if a string
 * longer than length 1 is passed, the first character is considered
 * as input
 */
function getCharDigit(char) {
  // assigning input
  let input = char;

  // if input is longer than one char -> first char is used
  if (char.length > 1) {
    [input] = char;
  }
  const index = ALPHABET.indexOf(input.toLowerCase());
  return index % 9 + 1;
}

export function splitStringIntoCharArray(input) {
  return input.split('').filter(item => item !== ' ' && item.length > 0);
}

export function splitNumberIntoDigitArray(input) {
  return input
    .toString()
    .split('')
    .filter(item => item !== ' ' && item.length > 0)
    .map(item => parseInt(item, 10));
}

/**
 * maps an array of characters to an array of numbers according to the defined schema
 * @param {array(chars)} inputArray an array of characters to be mapped
 * @return an array of digits (ints) corresponding to the numbers
 */
function mapToDigits(inputArray) {
  return inputArray.map(item => getCharDigit(item));
}

/**
 * sums up the digits of the input digits and reduces to one digit
 * if required
 * @param {array(int)} digits the digits to sum up as an array of numbers
 * @param {bool} reduce if set to true, the method will reduce results with
 * more than one digit to one digit (except for if contained in the passed exceptions)
 * @param {*} exceptedFromReduction if @param reduce is set to true, the numbers passed here
 * are NOT reduced
 */
function sumDigits(digits, reduce = true, exceptedFromReduction = []) {
  // calculating sum of digits
  const sum = digits.reduce((a, b) => a + b);

  // if more than one digit -> reduce if set
  if (reduce && sum > 9) {
    // if current sum value is excepted -> returning without reduction
    if (exceptedFromReduction.includes(sum)) {
      return sum;
    }

    // calling recursively to reduce (pot. multiple times: 19 > 10 > 1)
    return sumDigits(splitNumberIntoDigitArray(sum));
  }
  return sum;
}

/**
 * sums up the digits of the input digits and reduces to one digit
 * if required
 * @param {array(int)} digits the digits to sum up as an array of numbers
 * @param {bool} reduce if set to true, the method will reduce results with
 * more than one digit to one digit (except for if contained in the passed exceptions)
 * @param {*} exceptedFromReduction if @param reduce is set to true, the numbers passed here
 * are NOT reduced
 */
export function sumDigitsWithIntermediateValues(
  digits,
  exceptedFromReduction = [],
) {
  // inetmediate sum values
  let digitValues = digits;
  const intermediateSumValues = [parseInt(digitValues.join(''), 10)];
  let sum = 0;
  do {
    // calculating sum of digits
    sum = digitValues.reduce((a, b) => a + b);

    // pushing to intermediate values
    intermediateSumValues.push(sum);

    // splitting up sum values
    digitValues = splitNumberIntoDigitArray(sum);
  } while (sum > 9 && !exceptedFromReduction.includes(sum));

  return intermediateSumValues;
}

/**
 * sanitizes and removes unwanted characters from date of birth.
 * returns an array of digits as contained in the date in the formst dd.mm.yyyy.
 * e.g. 18.03.2009 => [1,8,0,3,2,0,0,9]
 * @param dateOfBirth a string in the format dd.mm.yyyy representing the date
 */
export function preprocessDateOfBirth(dateOfBirth) {
  // replacing all dots -> splitting into chars and
  // removing emtpy elements and spaces
  return splitNumberIntoDigitArray(dateOfBirth.replace(/\./g, ''));
}

export function replaceUmlauts(input) {
  // assigning input to result to replace here
  let result = input;

  // iterating though umlauts and replacing
  for (let index = 0; index < UMLAUTS.length; index += 1) {
    // getting current umlaut to replace
    const currentUmlaut = UMLAUTS[index];

    // replacing lower case occurences of umlaut
    result = result.replace(
      new RegExp(currentUmlaut, 'g'),
      UMLAUT_MAPPING[index],
    );

    // replacing upper case occurences of umlaut
    result = result.replace(
      new RegExp(currentUmlaut.toUpperCase(), 'g'),
      UMLAUT_MAPPING[index].toUpperCase(),
    );
  }

  return result;
}

export function preprocessString(input) {
  // replacing umlauts of names
  const nameWithoutUmlauts = replaceUmlauts(input);

  // returning replaced results
  return splitStringIntoCharArray(nameWithoutUmlauts);
}

/**
 * extracts vowels from the input array, returns an array of only the vowels
 * contained in @param input in the same order
 * @param {array(char)} input an array of characters
 */
function extractVowels(input) {
  return input.filter(char => VOWELS.includes(char));
}

/**
 * extracts consonants from the input array, returns an array of only the consonants
 * contained in @param input in the same order
 * @param {array(char)} input an array of characters
 */
function extractConsonants(input) {
  return input.filter(char => !VOWELS.includes(char));
}

/*--------------------------------------------------------------------------------*/
/* Calculations of numbers */

/**
 * calculation of the AZ
 * @param {array(chars)} firstNameArray an array of the characters of the first name
 * @param {array(chars)} lastNameArray an array of the characters of the last name
 * @returns returns the digit sum of the digits of the merged first and last name
 */
export function calculateAZ(firstNameArray, lastNameArray) {
  // gettin digits for consonants
  const firstNameConsonantDigitArray = mapToDigits(extractConsonants(firstNameArray));

  // getting digits for vowels
  const lastNameConsonantDigitArray = mapToDigits(extractConsonants(lastNameArray));

  // calculating digit sum of merged arrays
  return sumDigits(firstNameConsonantDigitArray.concat(lastNameConsonantDigitArray));
}

/**
 * calulation of the BZ
 * @param {array(char)} firstNameArray an array of the characters of the first name (and middle name)
 * @param lastNameArray an array of the characters of the last name
 */
export function calculateBZ(firstNamesArray, lastNameArray) {
  return sumDigits(
    mapToDigits(firstNamesArray).concat(mapToDigits(lastNameArray)),
    true,
  );
}

/**
 * calculation of the NNZ
 * @param lastNameArray an array of the characters of the last name
 */
export function calculateNNZ(lastNameArray) {
  return getCharDigit(lastNameArray[0]);
}

/**
 * calculation of the WZ
 * @param dateOfBirthArray an array of the digits of the birth date in the format ddmmyyyy
 */
export function calculateWZ(dateOfBirthArray) {
  return sumDigits(dateOfBirthArray, false);
}

/**
 * calculation of the LZ
 * @param dateOfBirthArray an array of the digits of the birth date in the format ddmmyyyy
 */
export function calculateLZ(dateOfBirthArray) {
  return sumDigits(dateOfBirthArray, true, [11, 22, 33]);
}

/**
 * calculation of the SZ
 * @param dateOfBirthArray an array of the digits of the birth date in the format ddmmyyyy
 */
export function calculateSZ(firstNamesArray, lastNameArray) {
  const nameVowels = extractVowels(firstNamesArray.concat(lastNameArray));
  // console.log(mapToDigits(nameVowels));
  return sumDigits(mapToDigits(nameVowels), true);
}

/**
 * calculation of the IZ
 * @param dateOfBirthArray an array of the digits of the birth date in the format ddmmyyyy
 */
export function calculateIZ(firstNamesArray, lastNameArray, dateOfBirthArray) {
  // getting full name
  const fullNameArray = firstNamesArray.concat(lastNameArray);

  // getting number values of full name
  const fullNameDigits = mapToDigits(fullNameArray);

  // getting most occuring digit
  const occurences = _.countBy(fullNameDigits);
  const mostOccuring = _.maxBy(Object.keys(occurences), key => occurences[key]);

  // check if maximum unique
  const isMaxUnique =
    Object.keys(occurences).filter(key => occurences[key] === occurences[mostOccuring]).length === 1;

  // if maximum is unique: IZ = maximum
  if (isMaxUnique) {
    return parseInt(mostOccuring, 10);
  }
  // if maximum is not unique -> IZ = SZ
  return calculateSZ(firstNamesArray, lastNameArray);
}

/**
 * calculation of the GZ
 * @param dateOfBirthArray an array of the digits of the birth date in the format ddmmyyyy
 */
export function calculateGZ(dateOfBirthArray) {
  // extracting birthday
  const birthDayAndMonth = dateOfBirthArray.slice(0, 4);

  // calculating sum of day and month
  return sumDigits(birthDayAndMonth, true);
}

/**
 * calculation of the GDR
 * @param dateOfBirthArray an array of the digits of the birth date in the format ddmmyyyy
 */
export function calculateGDR(dateOfBirthArray) {
  // creating gdr data structure: index 1 to 0 according to positions in scheme
  const GDR = [];

  // counting occurences of numbers in dateOfBirth
  const occurencesDateOfBirth = _.countBy(dateOfBirthArray);

  // counting occurences of numbers in lz+wz with intermediate numbers
  const lzValue = calculateLZ(dateOfBirthArray);
  const wzValue = calculateWZ(dateOfBirthArray);
  const lzWzSumsWithIntermediateArray = sumDigitsWithIntermediateValues(splitNumberIntoDigitArray(lzValue + wzValue));
  const occurenceslzWzSumWithIntermediate = _.countBy(lzWzSumsWithIntermediateArray);

  for (let index = 0; index < 9; index += 1) {
    // defining entry for gdr
    const entry = [];
    // getting number relevant for index
    const currentNumber = GDR_INDEX_NUMBER_MAPPING[index];

    // 1) calculating frequency of number in birthdate
    entry[0] = occurencesDateOfBirth[currentNumber]
      ? occurencesDateOfBirth[currentNumber]
      : 0;

    // 2) calculate frequency of number in LZ + WZ and intermediate values (recucing)
    entry[1] = occurenceslzWzSumWithIntermediate[currentNumber]
      ? occurenceslzWzSumWithIntermediate[currentNumber]
      : 0;

    // adding entry to result
    GDR[index] = entry;
  }

  return GDR.map(item => (item[0] + item[1] === 0 ? null : item[0] + item[1]));
}

/**
 * calculation of the GDR-F
 * @param gdrArray result of the GDR calculation
 */
export function calculateGDRF(gdrArray) {
  // defining result array of missing numbers in gdrArray
  const missingValues = [];

  // going through numbers, if value not present (value is null),
  // saving associated number with index
  gdrArray.forEach((item, index) => {
    if (item === null) {
      missingValues.push(GDR_INDEX_NUMBER_MAPPING[index]);
    }
  });

  return missingValues;
}

/**
 * calculation of the GDR-V
 * @param gdrArray result of the GDR calculation
 */
export function calculateGDRV(gdrArray) {
  // defining result array of present numbers in gdrArray
  const presentValues = [];

  // going through numbers, if value present,
  // saving associated number with index
  gdrArray.forEach((item, index) => {
    if (item !== null) {
      presentValues.push(GDR_INDEX_NUMBER_MAPPING[index]);
    }
  });

  return presentValues;
}

/**
 * calculation of the GDR-I
 * @param gdrArray result of the GDR calculation
 */
export function calculateGDRI(gdrArray) {
  const isolated = [];
  gdrArray.forEach((item, index) => {
    // only checking items not null themselves
    if (item !== null) {
      // bottom
      const bottomRelevant = index + 3 < 9;
      const bottomNull = bottomRelevant && gdrArray[index + 3] === null;

      // top
      const topRelevant = index - 3 > 0;
      const topNull = topRelevant && gdrArray[index - 3] === null;

      // right
      const rightRelevant = index % 3 !== 2;
      const rightNull = rightRelevant && gdrArray[index + 1] === null;

      // left
      const leftRelevant = index % 3 !== 0;
      const leftNull = leftRelevant && gdrArray[index - 1] === null;

      // not isolated if side is relevant and value is not null
      const notIsolated =
        (bottomRelevant && !bottomNull) ||
        (topRelevant && !topNull) ||
        (rightRelevant && !rightNull) ||
        (leftRelevant && !leftNull);

      // if not not isolated -> adding to isolated
      if (!notIsolated) {
        isolated.push(GDR_INDEX_NUMBER_MAPPING[index]);
      }
    }
  });

  return isolated;
}

/**
 * calculation fo the TZ
 * @param dateOfBirthArray an array of the digits of the birth date in the format ddmmyyyy
 */
export function calculateTZ(dateOfBirthArray) {
  // returning sum of digits for first name
  return sumDigits(dateOfBirthArray.slice(2, 7), true);
}

/**
 * calculation of the KZ
 * @param firstNameArray an array of the characters of the first name
 * @param middleNameArray an array of the characters of the middle name
 */
export function calculateKZ(firstNameArray, middleNameArray = null) {
  // calculating kz value from first name
  let kzValue = getCharDigit(firstNameArray[0]);

  // adding kz value from middle name if present
  if (middleNameArray) {
    kzValue += getCharDigit(middleNameArray[0]);
  }

  return kzValue;
}
/**
 * calculation of the BfZ
 * @param dateOfBirthArray an array of the digits of the birth date in the format ddmmyyyy
 */
export function calculateBfZ(dateOfBirthArray) {
  // calculating LZ
  const lzValue = calculateLZ(dateOfBirthArray);

  // calculating TZ
  const tzValue = calculateTZ(dateOfBirthArray);

  // returning BfZ as sum of digits of TZ and LZ
  return sumDigits(splitNumberIntoDigitArray(lzValue + tzValue));
}

/**
 * calculation of the VisZ
 * @param dateOfBirthArray an array of the digits of the birth date in the format ddmmyyyy
 * @param firstNameArray an array of the characters of the first name
 * @param middleNameArray an array of the characters of the middle name
 */
export function calculateVisZ(
  firstNamesArray,
  lastNameArray,
  dateOfBirthArray,
) {
  // calculating LZ
  const lzValue = calculateLZ(dateOfBirthArray);

  // calculating SZ
  const szValue = calculateSZ(firstNamesArray, lastNameArray, dateOfBirthArray);

  // calculating BfZ
  const bfzValue = calculateBfZ(dateOfBirthArray);

  // returning sum of digit of sum of values
  return sumDigits(splitNumberIntoDigitArray(lzValue + szValue + bfzValue));
}

/**
 * calculation of the IniZ
 * @param dateOfBirthArray an array of the digits of the birth date in the format ddmmyyyy
 * @param firstNameArray an array of the characters of the first name
 * @param middleNameArray an array of the characters of the middle name
 */
export function calculateIniZ(
  firstNamesArray,
  lastNameArray,
  dateOfBirthArray,
) {
  // calculating LZ
  const lzValue = calculateLZ(dateOfBirthArray);

  // calculating SZ
  const szValue = calculateSZ(firstNamesArray, lastNameArray, dateOfBirthArray);

  // calculating IZ
  const izValue = calculateIZ(firstNamesArray, lastNameArray, dateOfBirthArray);

  // returning sum of digit of sum of values
  return sumDigits(splitNumberIntoDigitArray(lzValue + szValue + izValue));
}

/**
 * calculation of the SM
 * @param firstNameArray an array of the characters of the first name
 * @param middleNameArray an array of the characters of the middle name
 */
export function calculateSM(firstNamesArray, lastNameArray) {
  // creating sm data structure
  const SM = [];

  // counting occurences of numbers in dateOfBirth
  const ocurrencesName = _.countBy(mapToDigits(firstNamesArray.concat(lastNameArray)));

  for (let index = 0; index < 9; index += 1) {
    // getting number relevant for index
    const currentNumber = index + 1;

    // calculating frequency of number in name
    SM.push(ocurrencesName[currentNumber] || null);
  }
  return SM;
}

/**
 * calculation of the SM
 * @param smArray result of the SM calculation
 */
export function calculateSMV(smArray) {
  // defining result array of present numbers in smArray
  const presentValues = [];

  // going through numbers, if value present,
  // saving associated number with index
  smArray.forEach((item, index) => {
    if (item !== null) {
      presentValues.push(index + 1);
    }
  });

  return presentValues;
}

/**
 * calculation of the KL
 * @param smArray result of the SM calculation
 */
export function calculateKL(smArray) {
  // defining result array of missing numbers in smArray
  const missingValues = [];

  // going through numbers, if value present,
  // saving associated number with index
  smArray.forEach((item, index) => {
    if (item === null) {
      missingValues.push(index + 1);
    }
  });

  return missingValues;
}

export function calculateZSA(klArray) {
  // if missing values of SM emtpy -> 0
  if (klArray.length === 0) {
    return 0;
  }

  // sum of digits of KL
  return sumDigits(klArray, true);
}

/**
 * calculation of the VZB
 * @param dateOfBirthArray an array of the digits of the birth date in the format ddmmyyyy
 */
export function calculateVZB(dateOfBirthArray) {
  return sumDigits(dateOfBirthArray.slice(2, 4), true);
}

/**
 * calculation of the VZP
 * @param dateOfBirthArray an array of the digits of the birth date in the format ddmmyyyy
 */
export function calculateVZP(dateOfBirthArray) {
  return sumDigits(dateOfBirthArray.slice(0, 2), true);
}

/**
 * calculation of the VZE
 * @param dateOfBirthArray an array of the digits of the birth date in the format ddmmyyyy
 */
export function calculateVZE(dateOfBirthArray) {
  return sumDigits(dateOfBirthArray.slice(4, 8), true);
}

/**
 * calculation of the HF
 * @param dateOfBirthArray an array of the digits of the birth date in the format ddmmyyyy
 */
export function calculateHF(dateOfBirthArray) {
  const hf1 = sumDigits(dateOfBirthArray.slice(0, 2).concat(dateOfBirthArray.slice(2, 4)));
  const hf2 = sumDigits(dateOfBirthArray.slice(0, 2).concat(dateOfBirthArray.slice(4, 8)));
  return [
    hf1,
    hf2,
    sumDigits(splitNumberIntoDigitArray(hf1 + hf2)),
    sumDigits(dateOfBirthArray.slice(2, 4).concat(dateOfBirthArray.slice(4, 8))),
  ];
}

/**
 * calculation of the HP
 * @param dateOfBirthArray an array of the digits of the birth date in the format ddmmyyyy
 */
export function calculateHP(dateOfBirthArray) {
  const hp1 = sumDigits(dateOfBirthArray.slice(0, 2).concat(dateOfBirthArray.slice(2, 4)));
  const hp2 = sumDigits(dateOfBirthArray.slice(2, 4).concat(dateOfBirthArray.slice(4, 8)));
  return [
    hp1,
    hp2,
    sumDigits(splitNumberIntoDigitArray(hp1 + hp2)),
    sumDigits(dateOfBirthArray.slice(0, 2).concat(dateOfBirthArray.slice(2, 4))),
  ];
}

/**
 * calculation of the PM
 * @param dateOfBirthArray an array of the digits of the birth date in the format ddmmyyyy
 */
export function calculatePM(dateOfBirthArray) {
  // getting LZ value
  const lzValue = calculateLZ(dateOfBirthArray);

  // getting current month and year (month is returned from 0-11 -> therefore the +1)
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  return sumDigits(splitNumberIntoDigitArray(lzValue + currentMonth + currentYear));
}

/**
 * calculation of the PT
 * @param dateOfBirthArray an array of the digits of the birth date in the format ddmmyyyy
 */
export function calculatePT(dateOfBirthArray) {
  // getting LZ value
  const lzValue = calculateLZ(dateOfBirthArray);

  // getting current month and year
  const now = new Date();
  const currentDay = now.getDate();

  return sumDigits(splitNumberIntoDigitArray(lzValue + currentDay));
}

/*----------------------------------------------------------------------------------*/

/**
 * returns a result text for the result number value calculated
 * @param numberID id of the number
 * @param resultValue value of the calculated result
 * @returns a text describing this number
 */
function getTextForResult(numberID, resultValue) {
  if (numberID === NUMBER_ID_AZ) {
    return 'Diese Menschen haben eine beschützende Ausstrahlung und Verantwortungsgefühl für ihre Mitmenschen. Aufgrund ihrer mütterlichen bzw. väterlichen Ausdruckskraft, die Sicherheit und Geborgenheit vermittelt, kommen die anderen Menschen zu ihnen, um Rat, Belehrung und Heilung zu finden. Ihr soziales Gewissen drängt sie dazu, nach Wahrheit und Gerechtigkeit zu streben. Personen mit der Ausdruckszahl 6 sind gefährdet, sich für andere Menschen, für ein wertvolles Ideal oder sich aus Liebe aufzuopfern. Doch kann ihre soziale Verantwortlichkeit auch zu Unverantwortlichkeit verkommen oder dazu führen, dass sie sich in Angelegenheiten einmischen, die sie nichts angehen.';
  } else if (numberID === NUMBER_ID_BZ) {
    return 'Diese Berufszahl weist auf Dynamik und persönliche Unabhängigkeit hin. Personen, denen die Zahl 1 zugeordnet wird, sind kreativ und können gut organisieren. Sie eignen sich für administrative Tätigkeiten und Führungspositionen, denn sie arbeiten gerne selbstständig, besitzen viel Ausdauer und verfügen über eine rasche Auffassungsgabe sowie logisches Denken. Diese Personen können gut organisieren, besitzen Ausdauer, eine rasche Auffassungsgabe und logisches Denken, arbeiten gerne selbstständig, eignen sich für administrative Tätigkeiten, Führungspositionen, Angestelltenverhältnis oder Selbstständigkeit. Berufe: LektorIn, VerlagsleiterIn, SchriftstellerIn, TheaterproduzentIn, SchauspielerIn, wissenschaftliche oder technische Berufe.';
  } else if (numberID === NUMBER_ID_NNZ) {
    return 'Das Kind wird oft in eine starre Struktur gepresst. Beide Eltern sind meist berufstätig und die Betreuung der Kinder muss gut nebenher funktionieren. Es gibt wenig Freude, Gelassenheit und Leichtigkeit. Zwei Glaubenssätze werden gelebt: „Ohne Fleiß kein Preis“ und „Das Leben ist schwer, ohne Erfolg ist keine Entwicklung möglich“. Für die Eltern ist es wichtig, die Fassade nach außen hin aufrechtzuerhalten. Diese Kinder entwickeln die Verhaltensstrategien, brav zu sein und sich anzupassen.';
  } else if (numberID === NUMBER_ID_WZ) {
    return 'Diese Zahl zeigt eine Persönlichkeit, die viel Raum braucht, um sich zu entfalten. Es ist eine Persönlichkeit, die gerne im Mittelpunkt steht und einen wichtigen Beitrag für die Gesellschaft leisten möchte. Eine Herausforderung für diese Zahl ist es, zu lernen, dass sie wirklich auf sich achtet und Momente der Einsamkeit innerlich pflegt, um sich selbst authentisch wahrnehmen zu können.';
  } else if (numberID === NUMBER_ID_IZ) {
    return 'Der Mensch mit der Meisterzahl 22/4 ist eine Person, die idealistisch und gleichzeitig pragmatisch ist. Sie verfügt über eine enorme Kraft und ist in der Lage, die eigenen Pläne und Lebensvisionen umzusetzen. Einfühlungsvermögen, Charisma und Empathie zeichnen einen solchen Charakter aus. Sensibilität und Lebenskraft machen aus diesen Menschen besonders verlässliche Führungskräfte und Mitarbeiter/innen, die sich engagiert und enthusiastisch einsetzen. Sie verfügen über eine starke Willenskraft und eine positive Lebenseinstellung. Wenn sie sich aber eingeschränkt fühlen, wirkt die große Menge an positiver Energie selbstzerstörerisch und richtet sich gegen die Person selbst. Manchmal neigt der 22/4-Mensch dazu, sich anzupassen, und führt aus dem Bedürfnis nach Liebe und Anerkennung sowie aus Rücksicht auf andere nicht das Leben, das zu ihm passt. In diesem Fall werden seine konstruktiven Kräfte zu seelischem Gift und verursachen starke Belastungen. Teilweise äußern sich diese in Zurückgezogenheit und in psychosomatischen Beschwerden. Persönlichkeiten mit dieser Lebenszahl sind intelligent und kreativ und versuchen, Klarheit und Struktur in ihrem Umfeld zu schaffen. Bezeichnend ist ein starker Sinn für Gerechtigkeit. Wenn dieser Mensch es nicht schafft, die Sicherheit, die er sucht, in sich selbst zu finden, dann hält er im Außen Ausschau nach ihr: entweder, indem er etwas schafft und leistet, oder, indem er sich stark an Prinzipien hält und einen Ehrenkodex entwickelt. Im Laufe ihres Lebens verspüren die 22/4-Personen immer wieder das Bedürfnis, sich weiter zu entfalten. In jeder Situation und durch jeden Menschen, mit denen sie in Kontakt treten, finden sie eine Chance für ihre Persönlichkeitsentwicklung sowie für die Umsetzung ihrer Pläne und Wünsche. Sie brauchen einen gewissen Druck und ein Ziel vor Augen, um sich lebendig zu fühlen. Routine und festgefahrene Gewohnheiten langweilen sie und bringen sie dazu, sich anders zu orientieren. Aus diesem Grund werden Beziehungen oder Freundschaften, die diese Menschen nicht herausfordern, uninteressant. Gerechtigkeit und Beobachtungsgabe zeichnen den Menschen mit der Meisterzahl 22/4 aus.';
  } else if (numberID === NUMBER_ID_GZ) {
    return 'Diese Menschen haben eine Gabe, Harmonie zu schaffen und für Gerechtigkeit einzutreten. Sie sind herzlich, liebenswürdig, sensibel und durch ihr freundliches, positives Wesen, ihr Einfühlungsvermögen und ihre Weitsicht sind sie ausgesprochen teamfähig. Mit ihrer bemerkenswerten Ausstrahlung gelingt es ihnen, Menschen zusammenzuführen und aufgrund ihrer natürlichen Sensibilität und Ausstrahlung eignen sie sich gut für Führungspositionen. Sie können die Folgen ihrer Entscheidungen und Aussagen sehr gut einschätzen und versuchen, immer diplomatisch zu sein. Ausgewogenheit ist für sie äußerst wichtig. Ihre Kreativität konzentriert sich oft im freien Ausdruck mit dem Körper: Singen, Tanzen, Bewegung. ';
  } else if (numberID === NUMBER_ID_GDR) {
    return '';
  } else if (numberID === NUMBER_ID_GDRV) {
    return 'Diese Person ist sehr sensibel, es fällt ihr schwer, ihre Bedürfnisse bewusst zu erfassen, Entscheidungen zu treffen, Prioritäten zu setzen und Absichten in die Tat umzusetzen. Die Herausforderung besteht darin, dem „Bauchgefühl“ zu vertrauen und mit Leichtigkeit, Freude und Gelassenheit durch das Leben zu gehen.';
  } else if (numberID === NUMBER_ID_GDRF) {
    return 'Diese Person ist sehr sensibel, es fällt ihr schwer, ihre Bedürfnisse bewusst zu erfassen, Entscheidungen zu treffen, Prioritäten zu setzen und Absichten in die Tat umzusetzen. Die Herausforderung besteht darin, dem „Bauchgefühl“ zu vertrauen und mit Leichtigkeit, Freude und Gelassenheit durch das Leben zu gehen.';
  } else if (numberID === NUMBER_ID_GDRI) {
    return 'Diese Person zeigt Selbstsicherheit, Freiheitsliebe und einen starken Wunsch nach Unabhängigkeit und Selbstbestimmung. Sie ist mit ihrer Kraft und ihrer Intuition verbunden, vermag umzusetzen, was für sie Priorität hat, verspürt das Bedürfnis, zu sich zu stehen und ist sehr sensibel, doch fällt es ihr schwer, ihre Gefühle auszudrücken.';
  } else if (numberID === NUMBER_ID_TZ) {
    return 'Diese Menschen haben eine Gabe, Harmonie zu schaffen und für Gerechtigkeit einzutreten. Sie sind herzlich, liebenswürdig, sensibel und durch ihr freundliches, positives Wesen, ihr Einfühlungsvermögen und ihre Weitsicht sind sie ausgesprochen teamfähig. Mit ihrer bemerkenswerten Ausstrahlung gelingt es ihnen, Menschen zusammenzuführen und aufgrund ihrer natürlichen Sensibilität und Ausstrahlung eignen sie sich gut für Führungspositionen. Sie können die Folgen ihrer Entscheidungen und Aussagen sehr gut einschätzen und versuchen, immer diplomatisch zu sein. Ausgewogenheit ist für sie äußerst wichtig. Ihre Kreativität konzentriert sich oft im freien Ausdruck mit dem Körper: Singen, Tanzen, Bewegung. ';
  } else if (numberID === NUMBER_ID_LZ) {
    return 'Diese Menschen haben eine Gabe, Harmonie zu schaffen und für Gerechtigkeit einzutreten. Sie sind herzlich, liebenswürdig, sensibel und durch ihr freundliches, positives Wesen, ihr Einfühlungsvermögen und ihre Weitsicht sind sie ausgesprochen teamfähig. Mit ihrer bemerkenswerten Ausstrahlung gelingt es ihnen, Menschen zusammenzuführen und aufgrund ihrer natürlichen Sensibilität und Ausstrahlung eignen sie sich gut für Führungspositionen. Sie können die Folgen ihrer Entscheidungen und Aussagen sehr gut einschätzen und versuchen, immer diplomatisch zu sein. Ausgewogenheit ist für sie äußerst wichtig. Ihre Kreativität konzentriert sich oft im freien Ausdruck mit dem Körper: Singen, Tanzen, Bewegung. ';
  } else if (numberID === NUMBER_ID_KZ) {
    return 'Diese Menschen haben eine Gabe, Harmonie zu schaffen und für Gerechtigkeit einzutreten. Sie sind herzlich, liebenswürdig, sensibel und durch ihr freundliches, positives Wesen, ihr Einfühlungsvermögen und ihre Weitsicht sind sie ausgesprochen teamfähig. Mit ihrer bemerkenswerten Ausstrahlung gelingt es ihnen, Menschen zusammenzuführen und aufgrund ihrer natürlichen Sensibilität und Ausstrahlung eignen sie sich gut für Führungspositionen. Sie können die Folgen ihrer Entscheidungen und Aussagen sehr gut einschätzen und versuchen, immer diplomatisch zu sein. Ausgewogenheit ist für sie äußerst wichtig. Ihre Kreativität konzentriert sich oft im freien Ausdruck mit dem Körper: Singen, Tanzen, Bewegung. ';
  } else if (numberID === NUMBER_ID_BFZ) {
    return 'Diese Menschen haben eine Gabe, Harmonie zu schaffen und für Gerechtigkeit einzutreten. Sie sind herzlich, liebenswürdig, sensibel und durch ihr freundliches, positives Wesen, ihr Einfühlungsvermögen und ihre Weitsicht sind sie ausgesprochen teamfähig. Mit ihrer bemerkenswerten Ausstrahlung gelingt es ihnen, Menschen zusammenzuführen und aufgrund ihrer natürlichen Sensibilität und Ausstrahlung eignen sie sich gut für Führungspositionen. Sie können die Folgen ihrer Entscheidungen und Aussagen sehr gut einschätzen und versuchen, immer diplomatisch zu sein. Ausgewogenheit ist für sie äußerst wichtig. Ihre Kreativität konzentriert sich oft im freien Ausdruck mit dem Körper: Singen, Tanzen, Bewegung. ';
  } else if (numberID === NUMBER_ID_VISZ) {
    return 'Diese Menschen haben eine Gabe, Harmonie zu schaffen und für Gerechtigkeit einzutreten. Sie sind herzlich, liebenswürdig, sensibel und durch ihr freundliches, positives Wesen, ihr Einfühlungsvermögen und ihre Weitsicht sind sie ausgesprochen teamfähig. Mit ihrer bemerkenswerten Ausstrahlung gelingt es ihnen, Menschen zusammenzuführen und aufgrund ihrer natürlichen Sensibilität und Ausstrahlung eignen sie sich gut für Führungspositionen. Sie können die Folgen ihrer Entscheidungen und Aussagen sehr gut einschätzen und versuchen, immer diplomatisch zu sein. Ausgewogenheit ist für sie äußerst wichtig. Ihre Kreativität konzentriert sich oft im freien Ausdruck mit dem Körper: Singen, Tanzen, Bewegung. ';
  } else if (numberID === NUMBER_ID_SZ) {
    return 'Diese Menschen haben eine Gabe, Harmonie zu schaffen und für Gerechtigkeit einzutreten. Sie sind herzlich, liebenswürdig, sensibel und durch ihr freundliches, positives Wesen, ihr Einfühlungsvermögen und ihre Weitsicht sind sie ausgesprochen teamfähig. Mit ihrer bemerkenswerten Ausstrahlung gelingt es ihnen, Menschen zusammenzuführen und aufgrund ihrer natürlichen Sensibilität und Ausstrahlung eignen sie sich gut für Führungspositionen. Sie können die Folgen ihrer Entscheidungen und Aussagen sehr gut einschätzen und versuchen, immer diplomatisch zu sein. Ausgewogenheit ist für sie äußerst wichtig. Ihre Kreativität konzentriert sich oft im freien Ausdruck mit dem Körper: Singen, Tanzen, Bewegung. ';
  } else if (numberID === NUMBER_ID_INIZ) {
    return 'Diese Menschen haben eine Gabe, Harmonie zu schaffen und für Gerechtigkeit einzutreten. Sie sind herzlich, liebenswürdig, sensibel und durch ihr freundliches, positives Wesen, ihr Einfühlungsvermögen und ihre Weitsicht sind sie ausgesprochen teamfähig. Mit ihrer bemerkenswerten Ausstrahlung gelingt es ihnen, Menschen zusammenzuführen und aufgrund ihrer natürlichen Sensibilität und Ausstrahlung eignen sie sich gut für Führungspositionen. Sie können die Folgen ihrer Entscheidungen und Aussagen sehr gut einschätzen und versuchen, immer diplomatisch zu sein. Ausgewogenheit ist für sie äußerst wichtig. Ihre Kreativität konzentriert sich oft im freien Ausdruck mit dem Körper: Singen, Tanzen, Bewegung. ';
  } else if (numberID === NUMBER_ID_SM_V) {
    return 'Diese Menschen haben eine Gabe, Harmonie zu schaffen und für Gerechtigkeit einzutreten. Sie sind herzlich, liebenswürdig, sensibel und durch ihr freundliches, positives Wesen, ihr Einfühlungsvermögen und ihre Weitsicht sind sie ausgesprochen teamfähig. Mit ihrer bemerkenswerten Ausstrahlung gelingt es ihnen, Menschen zusammenzuführen und aufgrund ihrer natürlichen Sensibilität und Ausstrahlung eignen sie sich gut für Führungspositionen. Sie können die Folgen ihrer Entscheidungen und Aussagen sehr gut einschätzen und versuchen, immer diplomatisch zu sein. Ausgewogenheit ist für sie äußerst wichtig. Ihre Kreativität konzentriert sich oft im freien Ausdruck mit dem Körper: Singen, Tanzen, Bewegung. ';
  } else if (numberID === NUMBER_ID_KL) {
    return 'Diese Menschen haben eine Gabe, Harmonie zu schaffen und für Gerechtigkeit einzutreten. Sie sind herzlich, liebenswürdig, sensibel und durch ihr freundliches, positives Wesen, ihr Einfühlungsvermögen und ihre Weitsicht sind sie ausgesprochen teamfähig. Mit ihrer bemerkenswerten Ausstrahlung gelingt es ihnen, Menschen zusammenzuführen und aufgrund ihrer natürlichen Sensibilität und Ausstrahlung eignen sie sich gut für Führungspositionen. Sie können die Folgen ihrer Entscheidungen und Aussagen sehr gut einschätzen und versuchen, immer diplomatisch zu sein. Ausgewogenheit ist für sie äußerst wichtig. Ihre Kreativität konzentriert sich oft im freien Ausdruck mit dem Körper: Singen, Tanzen, Bewegung. ';
  } else if (numberID === NUMBER_ID_ZSA) {
    return 'Diese Menschen haben eine Gabe, Harmonie zu schaffen und für Gerechtigkeit einzutreten. Sie sind herzlich, liebenswürdig, sensibel und durch ihr freundliches, positives Wesen, ihr Einfühlungsvermögen und ihre Weitsicht sind sie ausgesprochen teamfähig. Mit ihrer bemerkenswerten Ausstrahlung gelingt es ihnen, Menschen zusammenzuführen und aufgrund ihrer natürlichen Sensibilität und Ausstrahlung eignen sie sich gut für Führungspositionen. Sie können die Folgen ihrer Entscheidungen und Aussagen sehr gut einschätzen und versuchen, immer diplomatisch zu sein. Ausgewogenheit ist für sie äußerst wichtig. Ihre Kreativität konzentriert sich oft im freien Ausdruck mit dem Körper: Singen, Tanzen, Bewegung. ';
  } else if (numberID === NUMBER_ID_HF) {
    return 'Diese Menschen haben eine Gabe, Harmonie zu schaffen und für Gerechtigkeit einzutreten. Sie sind herzlich, liebenswürdig, sensibel und durch ihr freundliches, positives Wesen, ihr Einfühlungsvermögen und ihre Weitsicht sind sie ausgesprochen teamfähig. Mit ihrer bemerkenswerten Ausstrahlung gelingt es ihnen, Menschen zusammenzuführen und aufgrund ihrer natürlichen Sensibilität und Ausstrahlung eignen sie sich gut für Führungspositionen. Sie können die Folgen ihrer Entscheidungen und Aussagen sehr gut einschätzen und versuchen, immer diplomatisch zu sein. Ausgewogenheit ist für sie äußerst wichtig. Ihre Kreativität konzentriert sich oft im freien Ausdruck mit dem Körper: Singen, Tanzen, Bewegung. ';
  } else if (numberID === NUMBER_ID_HP) {
    return 'Diese Menschen haben eine Gabe, Harmonie zu schaffen und für Gerechtigkeit einzutreten. Sie sind herzlich, liebenswürdig, sensibel und durch ihr freundliches, positives Wesen, ihr Einfühlungsvermögen und ihre Weitsicht sind sie ausgesprochen teamfähig. Mit ihrer bemerkenswerten Ausstrahlung gelingt es ihnen, Menschen zusammenzuführen und aufgrund ihrer natürlichen Sensibilität und Ausstrahlung eignen sie sich gut für Führungspositionen. Sie können die Folgen ihrer Entscheidungen und Aussagen sehr gut einschätzen und versuchen, immer diplomatisch zu sein. Ausgewogenheit ist für sie äußerst wichtig. Ihre Kreativität konzentriert sich oft im freien Ausdruck mit dem Körper: Singen, Tanzen, Bewegung. ';
  } else if (numberID === NUMBER_ID_VZB) {
    return 'Diese Menschen haben eine Gabe, Harmonie zu schaffen und für Gerechtigkeit einzutreten. Sie sind herzlich, liebenswürdig, sensibel und durch ihr freundliches, positives Wesen, ihr Einfühlungsvermögen und ihre Weitsicht sind sie ausgesprochen teamfähig. Mit ihrer bemerkenswerten Ausstrahlung gelingt es ihnen, Menschen zusammenzuführen und aufgrund ihrer natürlichen Sensibilität und Ausstrahlung eignen sie sich gut für Führungspositionen. Sie können die Folgen ihrer Entscheidungen und Aussagen sehr gut einschätzen und versuchen, immer diplomatisch zu sein. Ausgewogenheit ist für sie äußerst wichtig. Ihre Kreativität konzentriert sich oft im freien Ausdruck mit dem Körper: Singen, Tanzen, Bewegung. ';
  } else if (numberID === NUMBER_ID_VZE) {
    return 'Diese Menschen haben eine Gabe, Harmonie zu schaffen und für Gerechtigkeit einzutreten. Sie sind herzlich, liebenswürdig, sensibel und durch ihr freundliches, positives Wesen, ihr Einfühlungsvermögen und ihre Weitsicht sind sie ausgesprochen teamfähig. Mit ihrer bemerkenswerten Ausstrahlung gelingt es ihnen, Menschen zusammenzuführen und aufgrund ihrer natürlichen Sensibilität und Ausstrahlung eignen sie sich gut für Führungspositionen. Sie können die Folgen ihrer Entscheidungen und Aussagen sehr gut einschätzen und versuchen, immer diplomatisch zu sein. Ausgewogenheit ist für sie äußerst wichtig. Ihre Kreativität konzentriert sich oft im freien Ausdruck mit dem Körper: Singen, Tanzen, Bewegung. ';
  } else if (numberID === NUMBER_ID_VZP) {
    return 'Diese Menschen haben eine Gabe, Harmonie zu schaffen und für Gerechtigkeit einzutreten. Sie sind herzlich, liebenswürdig, sensibel und durch ihr freundliches, positives Wesen, ihr Einfühlungsvermögen und ihre Weitsicht sind sie ausgesprochen teamfähig. Mit ihrer bemerkenswerten Ausstrahlung gelingt es ihnen, Menschen zusammenzuführen und aufgrund ihrer natürlichen Sensibilität und Ausstrahlung eignen sie sich gut für Führungspositionen. Sie können die Folgen ihrer Entscheidungen und Aussagen sehr gut einschätzen und versuchen, immer diplomatisch zu sein. Ausgewogenheit ist für sie äußerst wichtig. Ihre Kreativität konzentriert sich oft im freien Ausdruck mit dem Körper: Singen, Tanzen, Bewegung. ';
  }

  return null;
}

/**
 * calculates the expression level numbers
 * @param {string} firstNames the first names (and middle names) of the analysed person
 * @param {string} lastName the last name of the analysed person
 */
export function calculateExpressionLevel(firstNames, lastName) {
  // getting process array representation of strings
  const firstNamesArray = preprocessString(firstNames);
  const lastNameArray = preprocessString(lastName);

  // calculating AZ
  const azValue = calculateAZ(firstNamesArray, lastNameArray);
  // getting description for calculated value
  const azValueText = getTextForResult(NUMBER_ID_AZ, azValue);

  // caclulating BZ
  const bzValue = calculateBZ(firstNamesArray, lastNameArray);
  // getting description for calculated value
  const bzValueText = getTextForResult(NUMBER_ID_BZ, bzValue);

  // calculating NNZ
  const nnzValue = calculateNNZ(lastNameArray);
  // getting description for calculated value
  const nnzValueText = getTextForResult(NUMBER_ID_NNZ, nnzValue);

  return {
    name: 'Ausdrucksebene',
    numbers: [
      {
        name: 'Ausdruckszahl',
        type: 'row',
        id: 'AZ',
        descriptionText: azValueText,
        result: {
          type: 'number',
          value: azValue,
        },
        highlighted: false,
      },
      {
        name: 'Berufszahl',
        type: 'row',
        id: 'BZ',
        descriptionText: bzValueText,
        result: {
          type: 'number',
          value: bzValue,
        },
        highlighted: false,
      },
      {
        name: 'Nachnamenszahl',
        type: 'row',
        id: 'NNZ',
        descriptionText: nnzValueText,
        result: {
          type: 'number',
          value: nnzValue,
        },
        highlighted: false,
      },
    ],
  };
}

/**
 * calculates the personal level numbers
 * @param {string} firstNames the first names (and middle names) of the analysed person
 * @param {string} lastName the last name of the analysed person
 * @param {string} dateOfBirth the date of birth of the analysed person in the form dd.mm.yyy
 */
export function calculatePersonalLevel(firstNames, lastName, dateOfBirth) {
  // getting process array representation of strings
  const firstNamesArray = preprocessString(firstNames);
  const lastNameArray = preprocessString(lastName);

  // getting date of birth ready
  const dateOfBirthArray = preprocessDateOfBirth(dateOfBirth);

  // calculating WZ
  const wzValue = calculateWZ(dateOfBirthArray);
  // getting description for calculated value
  const wzValueText = getTextForResult(NUMBER_ID_WZ, wzValue);

  // calculating LZ
  const lzValue = calculateLZ(dateOfBirthArray);
  // getting description for calculated value
  const lzValueText = getTextForResult(NUMBER_ID_LZ, lzValue);

  // calculating Iz
  const izValue = calculateIZ(firstNamesArray, lastNameArray);
  // getting description for calculated value
  const izValueText = getTextForResult(NUMBER_ID_IZ, izValue);

  // calculating GZ
  const gzValue = calculateGZ(dateOfBirthArray);
  // getting description for calculated value
  const gzValueText = getTextForResult(NUMBER_ID_GZ, gzValue);

  // calculating GDR
  const gdrValue = calculateGDR(dateOfBirthArray);
  // getting description for calculated value
  const gdrValueText = getTextForResult(NUMBER_ID_GDR, gdrValue);

  // calculating GDRV
  const gdrvValue = calculateGDRV(gdrValue);
  // getting description for calculated value
  const gdrvValueText = getTextForResult(NUMBER_ID_GDRV, gdrvValue);

  // calculating GDRF
  const gdrfValue = calculateGDRF(gdrValue);
  // getting description for calculated value
  const gdrfValueText = getTextForResult(NUMBER_ID_GDRF, gdrfValue);

  // calculating GDRI
  const gdriValue = calculateGDRI(gdrValue);
  // getting description for calculated value
  const gdriValueText = getTextForResult(NUMBER_ID_GDRI, gdriValue);

  return {
    name: 'Persönlichkeitsebene',
    numbers: [
      {
        name: 'Wurzelzahl',
        type: 'row',
        id: 'WZ',
        descriptionText: wzValueText,
        result: {
          type: 'number',
          value: wzValue,
        },
        highlighted: false,
      },
      {
        name: 'Lebenszahl',
        type: 'row',
        id: 'LZ',
        descriptionText: lzValueText,
        result: {
          type: 'number',
          value: lzValue,
        },
        highlighted: false,
      },
      {
        name: 'Identitätszahl',
        type: 'row',
        id: 'IZ',
        descriptionText: izValueText,
        result: {
          type: 'number',
          value: izValue,
        },
        highlighted: false,
      },
      {
        name: 'Gesundheitszahl',
        type: 'row',
        id: 'GZ',
        descriptionText: gzValueText,
        result: {
          type: 'number',
          value: gzValue,
        },
        highlighted: false,
      },
      {
        name: 'Geburtsdatumsraster',
        type: 'row',
        id: 'GDR',
        descriptionText: gdrValueText,
        result: {
          type: 'matrix',
          dimensions: {
            rows: 3,
            cols: 3,
          },
          value: gdrValue,
          highlighted: [6, 8],
        },
        highlighted: false,
      },
      {
        name: 'GDR vorhandene Zahl',
        type: 'row',
        id: 'GDR-V',
        descriptionText: gdrvValueText,
        result: {
          type: 'number',
          value: gdrvValue,
        },
        highlighted: false,
      },
      {
        name: 'GDR fehlende Zahl',
        type: 'row',
        id: 'GDR-F',
        descriptionText: gdrfValueText,
        result: {
          type: 'number',
          value: gdrfValue,
        },
        highlighted: false,
      },
      {
        name: 'GDR isolierte Zahlen',
        type: 'row',
        id: 'GDR-I',
        descriptionText: gdriValueText,
        result: {
          type: 'number',
          value: gdriValue,
        },
        highlighted: false,
      },
    ],
  };
}

/**
 * calculates the development level numbers
 * @param {string} firstNames the first names (and middle names) of the analysed person
 * @param {string} lastName the last name of the analysed person
 * @param {string} dateOfBirth the date of birth of the analysed person in the form dd.mm.yyy
 */
export function calculateDevelopmentLevel(firstNames, lastName, dateOfBirth) {
  // getting process array representation of strings
  const firstNamesArray = preprocessString(firstNames);
  const lastNameArray = preprocessString(lastName);

  // getting date of birth ready
  const dateOfBirthArray = preprocessDateOfBirth(dateOfBirth);

  // calculating TZ
  const tzValue = calculateTZ(dateOfBirthArray);
  // getting description for calculated value
  const tzValueText = getTextForResult(NUMBER_ID_TZ, tzValue);

  // calculating KZ
  const kzValue = calculateKZ(firstNamesArray);
  // getting description for calculated value
  const kzValueText = getTextForResult(NUMBER_ID_KZ, kzValue);

  // calculating BfZ
  const bfzValue = calculateBfZ(dateOfBirthArray);
  // getting description for calculated value
  const bfzValueText = getTextForResult(NUMBER_ID_BFZ, bfzValue);

  // calculating BfZ
  const viszValue = calculateVisZ(
    firstNamesArray,
    lastNameArray,
    dateOfBirthArray,
  );
  // getting description for calculated value
  const viszValueText = getTextForResult(NUMBER_ID_VISZ, viszValue);

  return {
    name: 'Entfaltungspotential',
    numbers: [
      {
        name: 'Talenzahl',
        type: 'row',
        id: 'TZ',
        descriptionText: tzValueText,
        result: {
          type: 'number',
          value: tzValue,
        },
        highlighted: false,
      },
      {
        name: 'Kreativitätszahl',
        type: 'row',
        id: 'KZ',
        descriptionText: kzValueText,
        result: {
          type: 'number',
          value: kzValue,
        },
        highlighted: false,
      },
      {
        name: 'Berufungszahl',
        type: 'row',
        id: 'BfZ',
        descriptionText: bfzValueText,
        result: {
          type: 'number',
          value: bfzValue,
        },
        highlighted: false,
      },
      {
        name: 'Visionszahl',
        type: 'row',
        id: 'VisZ',
        descriptionText: viszValueText,
        result: {
          type: 'number',
          value: viszValue,
        },
        highlighted: false,
      },
    ],
  };
}

/**
 * calculates the soul level numbers
 * @param {string} firstNames the first names (and middle names) of the analysed person
 * @param {string} lastName the last name of the analysed person
 * @param {string} dateOfBirth the date of birth of the analysed person in the form dd.mm.yyy
 */
export function calculateSoulLevelNumbers(firstNames, lastName, dateOfBirth) {
  // getting process array representation of strings
  const firstNamesArray = preprocessString(firstNames);
  const lastNameArray = preprocessString(lastName);

  // getting date of birth ready
  const dateOfBirthArray = preprocessDateOfBirth(dateOfBirth);

  // calculating SZ
  const szValue = calculateSZ(firstNamesArray, lastNameArray);
  // getting description for calculated value
  const szValueText = getTextForResult(NUMBER_ID_SZ, szValue);

  // calculating IniZ
  const inizValue = calculateIniZ(
    firstNamesArray,
    lastNameArray,
    dateOfBirthArray,
  );
  // getting description for calculated value
  const inizValueText = getTextForResult(NUMBER_ID_INIZ, inizValue);

  // calculating SM
  const smValue = calculateSM(firstNamesArray, lastNameArray);

  // calculating SM-V
  const smvValue = calculateSMV(smValue);
  // getting description for calculated value
  const smvValueText = getTextForResult(NUMBER_ID_SM_V, smvValue);

  // calculating KL
  const klValue = calculateKL(smValue);
  // getting description for calculated value
  const klValueText = getTextForResult(NUMBER_ID_KL, klValue);

  // calculating ZSA
  const zsaValue = calculateZSA(klValue);
  // getting description for calculated value
  const zsaValueText = getTextForResult(NUMBER_ID_ZSA, zsaValue);

  return {
    name: 'Seelische Ebene',
    numbers: [
      {
        name: 'Seelenzahl',
        type: 'row',
        id: 'SZ',
        descriptionText: szValueText,
        result: {
          type: 'number',
          value: szValue,
        },
        highlighted: false,
      },
      {
        name: 'Initiationszahl',
        type: 'row',
        id: 'IniZ',
        descriptionText: inizValueText,
        result: {
          type: 'number',
          value: inizValue,
        },
        highlighted: false,
      },
      {
        name: 'Seelische Matrix',
        type: 'row',
        id: 'SM',
        descriptionText: '',
        result: {
          type: 'matrix',
          dimensions: {
            rows: 3,
            cols: 3,
          },
          values: smValue,
          highlighted: [],
        },
        highlighted: false,
      },
      {
        name: 'SM vorhandene Zahl',
        type: 'row',
        id: 'SM-V',
        descriptionText: smvValueText,
        result: {
          type: 'number',
          value: smvValue,
        },
        highlighted: false,
      },
      {
        name: 'Karmische Lektion',
        type: 'row',
        id: 'KL',
        descriptionText: klValueText,
        result: {
          type: 'list',
          list: klValue,
        },
        highlighted: false,
      },
      {
        name: 'Zahl des seelischen Ausgleichs',
        type: 'row',
        id: 'ZSA',
        descriptionText: zsaValueText,
        result: {
          type: 'number',
          value: zsaValue,
        },
        highlighted: false,
      },
    ],
  };
}

/**
 * calculates the time level numbers
 * @param {string} firstNames the first names (and middle names) of the analysed person
 * @param {string} lastName the last name of the analysed person
 * @param {string} dateOfBirth the date of birth of the analysed person in the form dd.mm.yyy
 */
export function calculateTimeLevelNumbers(firstNames, lastName, dateOfBirth) {
  // getting process array representation of strings
  const firstNamesArray = preprocessString(firstNames);
  const lastNameArray = preprocessString(lastName);

  // getting date of birth ready
  const dateOfBirthArray = preprocessDateOfBirth(dateOfBirth);

  // calculating VZ-B
  const vzbValue = calculateVZB(dateOfBirthArray);
  // getting description for calculated value
  const vzbValueText = getTextForResult(NUMBER_ID_VZB, vzbValue);

  // calculating VZ-P
  const vzpValue = calculateVZP(dateOfBirthArray);
  // getting description for calculated value
  const vzpValueText = getTextForResult(NUMBER_ID_VZP, vzpValue);

  // calculating VZ-E
  const vzeValue = calculateVZE(dateOfBirthArray);
  // getting description for calculated value
  const vzeValueText = getTextForResult(NUMBER_ID_VZE, vzeValue);

  // calculating HF/HP
  const hfValue = calculateHF(dateOfBirthArray);
  const hpValue = calculateHP(dateOfBirthArray);
  // getting description for calculated value
  const hfValueText = getTextForResult(NUMBER_ID_HF, hfValue);
  const hpValueText = getTextForResult(NUMBER_ID_HP, hpValue);

  return [
    {
      name: 'Vibratorische Zyklen',
      headings: ['Vibratorische Zyklen', 'VZ', null, 'Alter', null],
      numbers: [
        {
          type: 'customRow',
          id: 'VZ_B',
          values: ['Bildungszyklus', 'VZ-B', vzbValue, 'Geb', vzbValueText],
          highlighted: false,
          descriptionTextIndex: 4,
          nameIndex: 0,
          valueIndex: 2,
        },
        {
          type: 'customRow',
          id: 'VZ_P',
          values: [
            'Produktivitätszyklus',
            'VZ-P',
            vzpValue,
            'ab 24',
            vzpValueText,
          ],
          highlighted: true,
          descriptionTextIndex: 4,
          nameIndex: 0,
          valueIndex: 2,
        },
        {
          type: 'customRow',
          id: 'VZ-E',
          values: ['Erntezyklus', 'VZ-E', vzeValue, 'ab 60', vzeValueText],
          highlighted: false,
          descriptionTextIndex: 4,
          nameIndex: 0,
          valueIndex: 2,
        },
      ],
    },
    {
      name: 'Herausforderungen und Höhepunkte',
      headings: ['Herausforderungen und Höhepunkte', 'HF/HP', 'HF', 'HP', null],
      numbers: [
        {
          type: 'customRow',
          id: 'cRowHerausfo1',
          values: [
            '1. Herausforderung',
            '1.',
            `${hfValue[0]} (2003 | 27 J.)`,
            hpValue,
            hpValueText,
          ],
          highlighted: false,
          descriptionTextIndex: 4,
          nameIndex: 0,
          valueIndex: 3,
        },
        {
          type: 'customRow',
          id: 'cRowHerausfo2',
          values: [
            '2. Herausforderung',
            '2.',
            `${hfValue[0]} (2012 | 36 J.)`,
            hpValue,
            hpValueText,
          ],
          highlighted: false,
          descriptionTextIndex: 4,
          nameIndex: 0,
          valueIndex: 3,
        },
        {
          type: 'customRow',
          id: 'cRowHerausfo3',
          values: [
            '3. Herausforderung',
            '3.',
            `${hfValue[0]} (2021 | 45 J.)`,
            hpValue,
            hpValueText,
          ],
          highlighted: true,
          descriptionTextIndex: 4,
          nameIndex: 0,
          valueIndex: 3,
        },
        {
          type: 'customRow',
          id: 'cRowHerausfo4',
          values: [
            '4. Herausforderung',
            '4.',
            `${hfValue[0]} (2030 | 54 J.)`,
            hpValue,
            hpValueText,
          ],
          highlighted: false,
          descriptionTextIndex: 4,
          nameIndex: 0,
          valueIndex: 3,
        },
      ],
    },
  ];
}

/*
 * mocks server call for the groups for a user
 */
export function getUserGroups() {
  return [
    'Familie',
    'Stammfamilie',
    'Verwandte',
    'Freunde',
    'Beruf',
    'Freizeit',
    'Sonstige',
  ];
}
