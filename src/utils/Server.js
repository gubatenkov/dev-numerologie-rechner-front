/**
 * calculates the personal level numbers
 * @param {*} firstNames
 * @param {*} lastName
 * @param {*} dateOfBirth
 */
export function calculatePersonalLevel(firstNames, lastName, dateOfBirth) {
  return {
    name: 'Persönlichkeitsebene',
    numbers: [
      {
        name: 'Wurzelzahl',
        type: 'row',
        id: 'WZ',
        textShort:
          'Diese Zahl zeigt eine Persönlichkeit, die viel Raum braucht, um sich zu entfalten. Es ist eine Persönlichkeit, die gerne im Mittelpunkt steht und einen wichtigen Beitrag für die Gesellschaft leisten möchte. Eine Herausforderung für diese Zahl ist es, zu lernen, dass sie wirklich auf sich achtet und Momente der Einsamkeit innerlich pflegt, um sich selbst authentisch wahrnehmen zu können.',
        result: {
          type: 'number',
          value: 19,
        },
        highlighted: false,
      },
      {
        name: 'Lebenszahl',
        type: 'row',
        id: 'LZ',
        textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
        result: {
          type: 'number',
          value: '27/9',
        },
        highlighted: false,
      },
      {
        name: 'Identitätszahl',
        type: 'row',
        id: 'IZ',
        textShort:
          'Der Mensch mit der Meisterzahl 22/4 ist eine Person, die idealistisch und gleichzeitig pragmatisch ist. Sie verfügt über eine enorme Kraft und ist in der Lage, die eigenen Pläne und Lebensvisionen umzusetzen. Einfühlungsvermögen, Charisma und Empathie zeichnen einen solchen Charakter aus. Sensibilität und Lebenskraft machen aus diesen Menschen besonders verlässliche Führungskräfte und Mitarbeiter/innen, die sich engagiert und enthusiastisch einsetzen. Sie verfügen über eine starke Willenskraft und eine positive Lebenseinstellung. Wenn sie sich aber eingeschränkt fühlen, wirkt die große Menge an positiver Energie selbstzerstörerisch und richtet sich gegen die Person selbst. Manchmal neigt der 22/4-Mensch dazu, sich anzupassen, und führt aus dem Bedürfnis nach Liebe und Anerkennung sowie aus Rücksicht auf andere nicht das Leben, das zu ihm passt. In diesem Fall werden seine konstruktiven Kräfte zu seelischem Gift und verursachen starke Belastungen. Teilweise äußern sich diese in Zurückgezogenheit und in psychosomatischen Beschwerden. Persönlichkeiten mit dieser Lebenszahl sind intelligent und kreativ und versuchen, Klarheit und Struktur in ihrem Umfeld zu schaffen. Bezeichnend ist ein starker Sinn für Gerechtigkeit. Wenn dieser Mensch es nicht schafft, die Sicherheit, die er sucht, in sich selbst zu finden, dann hält er im Außen Ausschau nach ihr: entweder, indem er etwas schafft und leistet, oder, indem er sich stark an Prinzipien hält und einen Ehrenkodex entwickelt. Im Laufe ihres Lebens verspüren die 22/4-Personen immer wieder das Bedürfnis, sich weiter zu entfalten. In jeder Situation und durch jeden Menschen, mit denen sie in Kontakt treten, finden sie eine Chance für ihre Persönlichkeitsentwicklung sowie für die Umsetzung ihrer Pläne und Wünsche. Sie brauchen einen gewissen Druck und ein Ziel vor Augen, um sich lebendig zu fühlen. Routine und festgefahrene Gewohnheiten langweilen sie und bringen sie dazu, sich anders zu orientieren. Aus diesem Grund werden Beziehungen oder Freundschaften, die diese Menschen nicht herausfordern, uninteressant. Gerechtigkeit und Beobachtungsgabe zeichnen den Menschen mit der Meisterzahl 22/4 aus. ',
        result: {
          type: 'number',
          value: 3,
        },
        highlighted: false,
      },
      {
        name: 'Gesundheitszahl',
        type: 'row',
        id: 'GZ',
        textShort: '',
        result: {
          type: 'number',
          value: 4,
        },
        highlighted: false,
      },
      {
        name: 'Geburtsdatumsraster',
        type: 'row',
        id: 'GDR',
        textShort: '',
        result: {
          type: 'matrix',
          dimensions: {
            rows: 3,
            cols: 3,
          },
          values: [3, 6, 9, null, null, null, 11, null, 7],
          highlighted: [6, 8],
        },
        highlighted: false,
      },
      {
        name: 'GDR vorhandene Zahl',
        type: 'row',
        id: 'GDR-V',
        textShort:
          'Dieser Mensch besitzt ein natürliches Gefühl für Schönheit, eine ausgeprägte Empathie und fühlt sich seinem Umfeld tief verbunden. Daher ist ihm das Wohlbefinden der Mitmenschen sehr am Herzen. Die Lernaufgabe besteht darin, das Leben im Allgemeinen und seine Mitmenschen im Besonderen mit größerem Realitätssinn zu betrachten. ',
        result: {
          type: 'number',
          value: 2,
        },
        highlighted: false,
      },
      {
        name: 'GDR fehlende Zahl',
        type: 'row',
        id: 'GDR-F',
        textShort:
          'Diese Person ist sehr sensibel, es fällt ihr schwer, ihre Bedürfnisse bewusst zu erfassen, Entscheidungen zu treffen, Prioritäten zu setzen und Absichten in die Tat umzusetzen. Die Herausforderung besteht darin, dem „Bauchgefühl“ zu vertrauen und mit Leichtigkeit, Freude und Gelassenheit durch das Leben zu gehen.',
        result: {
          type: 'number',
          value: 3,
        },
        highlighted: false,
      },
      {
        name: 'GDR isolierte Zahlen',
        type: 'row',
        id: 'GDR-I',
        textShort:
          'Diese Person zeigt Selbstsicherheit, Freiheitsliebe und einen starken Wunsch nach Unabhängigkeit und Selbstbestimmung. Sie ist mit ihrer Kraft und ihrer Intuition verbunden, vermag umzusetzen, was für sie Priorität hat, verspürt das Bedürfnis, zu sich zu stehen und ist sehr sensibel, doch fällt es ihr schwer, ihre Gefühle auszudrücken. ',
        result: {
          type: 'number',
          value: 1,
        },
        highlighted: false,
      },
    ],
  };
}

/**
 * calculates the development level numbers
 * @param {*} firstNames
 * @param {*} lastName
 * @param {*} dateOfBirth
 */
export function calculateDevelopmentLevel(firstNames, lastName, dateOfBirth) {
  return {
    name: 'Entfaltungspotential',
    numbers: [
      {
        name: 'Talenzahl',
        type: 'row',
        id: 'TZ',
        textShort:
          'Diese Menschen haben eine Gabe, Harmonie zu schaffen und für Gerechtigkeit einzutreten. Sie sind herzlich, liebenswürdig, sensibel und durch ihr freundliches, positives Wesen, ihr Einfühlungsvermögen und ihre Weitsicht sind sie ausgesprochen teamfähig. Mit ihrer bemerkenswerten Ausstrahlung gelingt es ihnen, Menschen zusammenzuführen und aufgrund ihrer natürlichen Sensibilität und Ausstrahlung eignen sie sich gut für Führungspositionen. Sie können die Folgen ihrer Entscheidungen und Aussagen sehr gut einschätzen und versuchen, immer diplomatisch zu sein. Ausgewogenheit ist für sie äußerst wichtig. Ihre Kreativität konzentriert sich oft im freien Ausdruck mit dem Körper: Singen, Tanzen, Bewegung. ',
        result: {
          type: 'number',
          value: 8,
        },
        highlighted: false,
      },
      {
        name: 'Kreativitätszahl',
        type: 'row',
        id: 'KZ',
        textShort:
          'Diese Person braucht Abwechslung im Leben, da ihr schnell langweilig wird.  Unterwegs zu sein ist für sie mit einer kindlichen Freude fürs Abenteuer verbunden Ihren kreativen Ausdruck erleben sie beim Tanzen oder Malen. Sie lieben das Wasser und sollten daher an einem See, Fluss oder am Meer regelmäßig sich aufhalten oder sogar wohnen.',
        result: {
          type: 'number',
          value: 5,
        },
        highlighted: false,
      },
      {
        name: 'Berufungszahl',
        type: 'row',
        id: 'BfZ',
        textShort: '',
        result: {
          type: 'number',
          value: 8,
        },
        highlighted: false,
      },
      {
        name: 'Visionszahl',
        type: 'row',
        id: 'VisZ',
        textShort: '',
        result: {
          type: 'number',
          value: 3,
        },
        highlighted: false,
      },
    ],
  };
}

/**
 * calculates the soul level numbers
 * @param {*} firstNames
 * @param {*} lastName
 * @param {*} dateOfBirth
 */
export function calculateSoulLevelNumbers(firstNames, lastName, dateOfBirth) {
  return {
    name: 'Seelische Ebene',
    numbers: [
      {
        name: 'Seelenzahl',
        type: 'row',
        id: 'SZ',
        textShort:
          'Ihr Heim und ihre Familie sind für Menschen mit der Seelenzahl 6 das Wichtigste im Leben. Dort leben sie alles aus, was sie an Verantwortungsgefühl, Fürsorge, Mitgefühl und Treue zu bieten haben. Sie müssen sich allerdings hüten, überfürsorglich oder zu bestimmend zu sein. Diese sensible und empathische Natur will in ihrem Leben vor allem jene Dimension der Liebe erfahren, die auf Verantwortung, Selbstlosigkeit und Harmonie basiert. Solche Menschen suchen eine Möglichkeit, anderen Personen zu helfen, und sie brennen danach, Liebe zu leben und Liebe zu geben. Ihre wärmende sowie positive Ausstrahlung lässt Güte, Zärtlichkeit und eine liebevolle Geduld spüren.',
        result: {
          type: 'number',
          value: 6,
        },
        highlighted: false,
      },
      {
        name: 'Initiationszahl',
        type: 'row',
        id: 'IniZ',
        textShort:
          'Diese Personen fühlen, dass die spirituelle Aufgabe in ihrem Leben damit zu tun hat, für andere da zu sein, sie zu unterstützen und sich der Liebe zu öffnen. Sie  haben keinen theoretischen Zugang zur Spiritualität, sondern fühlen sich dazu berufen, auf einfache und unaufdringliche Weise Hilfe anzubieten. Ihre spirituelle Aufgabe zeigt sich, indem diese Persönlichkeiten gute LebensberaterInnen sind. Mit ihrer einfachen und liebevollen Art schenken sie Hoffnung und Trost. Sie treffen immer wieder Menschen, die ihnen die Beraterrolle übertragen. Blickt man auf das Leben dieser Personen, so hat man das Gefühl, dass sie eine innere Weisheit besitzen. Es ist so, als würde diese Seele inkarnieren, um die Grundthemen der Menschen zu beobachten und die Zusammenhänge zu erkennen.',
        result: {
          type: 'number',
          value: 1,
        },
        highlighted: false,
      },
      {
        name: 'Seelische Matrix',
        type: 'row',
        id: 'SM',
        textShort: '',
        result: {
          type: 'matrix',
          dimensions: {
            rows: 3,
            cols: 3,
          },
          values: [1111, 2, null, 4, 555, null, null, 88, 99],
          highlighted: [],
        },
        highlighted: false,
      },
      {
        name: 'SM vorhandene Zahl',
        type: 'row',
        id: 'SM-V',
        textShort:
          'Im Erfahrungsbereich der Zahl 8 wird die Seele mit dem Auftrag geboren, ihre innere Weisheit, Intelligenz und Intuition auszuleben. Diese drei Eigenschaften sind ausgeprägt vorhanden, weshalb es der Person leichtfällt, Dinge sehr rasch in die Tat umzusetzen – aus demselben Grund gestaltet sich ihr Leben in einer hohen Geschwindigkeit. Bei ihnen ist die Sehnsucht danach vorhanden, ihre Kraft und Macht im positiven Sinne einsetzen zu können, also bei Aufgaben, welche die Fähigkeit erfordern, aus Ideen Realität zu formen. ',
        result: {
          type: 'number',
          value: 8,
        },
        highlighted: false,
      },
      {
        name: 'Karmische Lektion',
        type: 'row',
        id: 'KL',
        textShort:
          'Die Themen sind Macht, Selbstverwirklichung und Selbstständigkeit. Sie tragen das Bestreben, den „eigenen Weg“ gehen zu wollen, in sich. ',
        result: {
          type: 'list',
          values: [3, 6, 7],
        },
        highlighted: false,
      },
      {
        name: 'Zahl des seelischen Ausgleichs',
        type: 'row',
        id: 'ZSA',
        textShort:
          'Diese Persönlichkeit lebte höchstwahrscheinlich in ihren früheren Leben in einem Kloster und wollte dort Ruhe vor der Außenwelt finden. Die Auseinandersetzung mit Spiritualität gestaltete sich zwar intensiv, jedoch hauptsächlich mit dem Verstand und nicht mit dem Herzen. In ihrem gegenwärtigen Leben ist es für die Person wichtig, ihr spirituelles Wissen mit der Öffentlichkeit zu teilen. Sie muss das Wagnis eingehen, im Außen ihre persönliche spirituelle Wahrheit zu leben und auch ihrer eigenen Berufung treu zu sein. Wichtige Themen sind die Verwirklichung der eigenen Wünsche und die Selbstständigkeit auch gegen den Willen der anderen, etwa der Familie. Dieser Mensch benötigt viel Freiheit und soll lernen, sich den anderen mitzuteilen und nicht seinem Bedürfnis nach Rückzug zu folgen. Eine sehr gute Hilfestellung besteht darin, dass dieser Mensch ganz bewusst und klar für sich selbst definiert, was er benötigt, damit er sich frei fühlen kann. Ebenso ist es wichtig, das Leben auch nach dieser Bestimmung von Freiheit auszurichten. Eine Hilfestellung besteht darin, dass sich dieser Mensch regelmäßig Zeit für sich selbst nimmt, in der er mit sich allein sein kann. Stille und Einsamkeit stellen einen wichtigen Regenerationsprozess dar, der auch für Personen mit der Lebenszahl 7 sehr bedeutsam ist.',
        result: {
          type: 'number',
          value: 7,
        },
        highlighted: false,
      },
    ],
  };
}

/**
 * calculates the soul level numbers
 * @param {*} firstNames
 * @param {*} lastName
 * @param {*} dateOfBirth
 */
export function calculateTimeLevelNumbers(firstNames, lastName, dateOfBirth) {
  return [
    {
      name: 'Vibratorische Zyklen',
      headings: ['Vibratorische Zyklen', 'VZ', null, 'Alter', null],
      numbers: [
        {
          type: 'customRow',
          id: 'VZ_B',
          values: [
            'Bildungszyklus',
            'VZ-B',
            3,
            'Geb',
            'In diesem Bildungszyklus zeigt das Kind eine ausgeprägte Lebensfreude und ist künstlerisch ausgesprochen begabt. Seine vielfältigen künstlerischen und musischen Talente zu entwickeln und zu fördern, sollte ein wichtiges Anliegen darstellen. Diese Kinder schätzen es, wenn sie immer wieder Abwechslung in ihrem Leben haben und ihre Lernfähigkeiten auf spielerische Art und Weise entfalten können. Die Erwachsenen im Umfeld des Kindes – Begleitpersonen bzw. Erziehungsberechtigte – sollten viel Zeit mit ihm verbringen und ihm alles, was es lernen will, spielerisch vermitteln. Es ist wesentlich, das Kind in seiner schnellen Entwicklung zu unterstützen. Vor allem sollte ihm eine gewisse Konsequenz und Zielstrebigkeit vermittelt werden, da es dazu neigt, sich zu verzetteln. Es ist wesentlich, das Kind in seiner schnellen Entwicklung zu unterstützen. Vor allem sollte ihm eine gewisse Konsequenz und Zielstrebigkeit vermittelt werden, da es dazu neigt, sich zu verzetteln.',
          ],
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
            1,
            'ab 24',
            'In dieser Schwingung hat die Person eine sehr große Fähigkeit, ihre eigene Vision zu leben und ihre Träume zu verwirklichen. Mit viel Kraft und hoher Geschwindigkeit beschreitet sie ihren eigenen Weg. Manchmal jedoch vernachlässigt diese Persönlichkeit die anderen in ihrem Umfeld – speziell Familienangehörige, und zuweilen vergisst sie auch, die eigenen Visionen und Bedürfnisse zu verwirklichen. Grundsätzlich weiß sie allerdings, was sie will, und kann die eigenen Vorstellungen sehr schnell umsetzen. Diplomatie und Rücksicht sind in diesem produktiven Zyklus angebracht, auch sollte sich die Person für Regenerationsphasen sowie für FreundInnen und andere Mitmenschen Zeit nehmen. ',
          ],
          highlighted: true,
          descriptionTextIndex: 4,
          nameIndex: 0,
          valueIndex: 2,
        },
        {
          type: 'customRow',
          id: 'VZ-E',
          values: [
            'Erntezyklus',
            'VZ-E',
            5,
            'ab 60',
            'In diesem Zyklus werden viele Veränderungen und Reisen den letzten Lebensabschnitt eines Menschen begleiten. Diese Persönlichkeiten haben das starke Bedürfnis, zu reisen und das nachzuholen, was in früheren Jahren nicht möglich war. Man sollte jedoch nicht nur im Außen genießen, indem man viel Bewegung macht und ein dynamisches Leben führt, sondern sich auch der inneren Klärung und Spiritualität zuwenden. Bisweilen überraschen in dieser Phase des Lebens plötzliche Veränderungen: Es taucht eine neue Liebe auf, eine neue Beziehung, es ergeben sich neue Freundschaften. Doch ist es wesentlich, sich und die Situation genau zu überprüfen, um nicht aus einer gewissen Alltagsmüdigkeit heraus das Alte für das Neue zu verlassen. Denn es ist durchaus möglich, mittels neuer Impulse und Authentizität das Althergebrachte wieder zu beleben. ',
          ],
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
            '4 (2003 | 27 J.)',
            4,
            'Diese Herausforderung erfordert ein klares und strukturiertes Vorgehen wie auch viel Arbeit.  Da der Mensch im persönlichen Umfeld und im Beruf unablässig beschäftigt ist, findet er kaum Zeit, um sich selbst zu spüren oder Freude und Zeit für sich zu genießen. Um in diesen neun Jahren wachsen zu können, sind sowohl Flexibilität als auch die Bereitschaft, aus Fehlern zu lernen, notwendig. Die Fähigkeiten, Geduld zu entwickeln und die Ruhe zu bewahren, um die Zeit für sich arbeiten zu lassen, sind in dieser Phase sehr wichtig. ',
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
            '6 (2012 | 36 J.)',
            8,
            'Die Zahl 8 als erste Herausforderung bezeichnet eine Zeitspanne von 9 Jahren, die sich als reich an Veränderungen und Überraschungen von außen erweist sowie eine Vielzahl an beruflichen und persönlichen Entwicklungsmöglichkeiten mit sich bringt. In dieser Phase sieht sich die Person dazu berufen, bereits in jungen Jahren einen klaren Platz im Leben zu finden und auf ihre eigene Kraft zu vertrauen, auch wenn ihr das Umfeld kein Vertrauen und keine Unterstützung zu schenken scheint. Um die gesteckten Ziele zu erreichen, ist es notwendig, die eigenen Talente auf eine erfüllende Art und Weise zu entfalten. ',
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
            '1 (2021 | 45 J.)',
            3,
            'In dieser Lebensphase wird die Partnerschaft einer starken Prüfung unterzogen; einerseits fühlt man sich sehr mit dem/der PartnerIn verbunden, andererseits drängt sich das Bedürfnis in den Vordergrund, sich anderweitig umzusehen. Die Jahre, in denen diese Lebensphase stattfindet, vergehen sehr rasch und die Leitthemen der Entwicklung sind Klarheit, Ehrlichkeit zu sich selbst und Authentizität. ',
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
            '8 (2030 | 54 J.)',
            6,
            'Die neun Jahre dieser Herausforderung werden von vielen Prüfungen im Bereich der zwischenmenschlichen und familiären Beziehungen begleitet. Der schwierigste Aspekt dieser Herausforderung besteht für diese Persönlichkeit konkret darin, sich von ihrem Umfeld – vor allem von der Stammfamilie – abzugrenzen und Nein zu sagen. Die Person ist frei, wenn sie für sich selbst die Bedürfnisse ihres inneren Kindes geklärt hat und ohne Schuldgefühle ein Gleichgewicht erreicht zwischen der Aufgabe, sowohl für die Eltern und ihre eigene Familie da zu sein, und jener, ein eigenes Leben zu führen.',
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
function sumDigits(digits, reduce, exceptedFromReduction) {
  // calculating sum of digits
  const sum = digits.reduce((a, b) => a + b);

  // if more than one digit -> reduce if set
  if (reduce && sum > 9) {
    // if current sum value is excepted -> returning without reduction
    if (exceptedFromReduction.includes(sum)) {
      return sum;
    }

    // calling recursively to reduce (pot. multiple times: 19 > 10 > 1)
    return sumDigits(sum);
  }

  return sum;
}

function sanitizeDateOfBirth(dateofBirth) {
  return true;
}

/**
 * sanitizes and removes unwanted characters from date of birth.
 * returns an array of digits as contained in the date in the formst dd.mm.yyyy.
 * e.g. 18.03.2009 => [1,8,0,3,2,0,0,9]
 * @param dateOfBirth a string in the format dd.mm.yyyy representing the date
 */
function preprocessDateOfBirth(dateOfBirth) {
  // returning null if sanitization fails
  if (!sanitizeDateOfBirth(dateOfBirth)) {
    return null;
  }
  // replacing all dots -> splitting into chars and
  // removing emtpy elements and spaces
  return dateOfBirth
    .replace(/\./g, '')
    .split('')
    .filter(item => item !== ' ' && item.length > 0);
}

export function splitIntoArray(input) {
  return input.split('').filter(item => item !== ' ' && item.length > 0);
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
  return splitIntoArray(nameWithoutUmlauts);
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
 * calculation of LZ
 * @param {array(digits)} dateOfBirthArray an array of the digits of the birth date
 * @returns returns the digit sum of the date birth digits
 */
export function calculateLZ(dateOfBirthArray) {
  // summing up digits and reducing to one digit except for 11, 22 and 33
  return sumDigits(dateOfBirthArray, true, [11, 22, 33]);
}

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
 * @param {array(char)} firstNameArqqray an array of the characters of the first name
 * @param lastNameArray an array of the characters of the last name
 * @returns the digit sum of the merge of the first name and last name digits
 */
export function calculateBZ(firstNameArray, lastNameArray) {
  return sumDigits(mapToDigits(firstNameArray).concat(mapToDigits(lastNameArray)));
}

/**
 * calculation of the NNZ
 * @param lastNameArray an array of the characters of the last name
 * @returns the digit representing the first char of the last name
 */
export function calculateNNZ(lastNameArray) {
  return mapToDigits(lastNameArray[0]);
}

/*----------------------------------------------------------------------------------*/

/**
 * calculates the expression level numbers
 * @param {string} firstNames
 * @param {string} lastName
 */
export function calculateExpressionLevel(firstNames, lastName) {
  console.log('!!!!!!!!!!!!!');
  // getting process array representation of strings
  const firstNamesArray = preprocessString(firstNames);
  const lastNameArray = preprocessString(lastName);

  // calculating AZ
  const azValue = calculateAZ(firstNamesArray, lastNameArray);
  // TODO getting description for calculated value
  const azValueText =
    'ÄÄÄÄÄÄÄÄDiese Menschen haben eine beschützende Ausstrahlung und Verantwortungsgefühl für ihre Mitmenschen. Aufgrund ihrer mütterlichen bzw. väterlichen Ausdruckskraft, die Sicherheit und Geborgenheit vermittelt, kommen die anderen Menschen zu ihnen, um Rat, Belehrung und Heilung zu finden. Ihr soziales Gewissen drängt sie dazu, nach Wahrheit und Gerechtigkeit zu streben. Personen mit der Ausdruckszahl 6 sind gefährdet, sich für andere Menschen, für ein wertvolles Ideal oder sich aus Liebe aufzuopfern. Doch kann ihre soziale Verantwortlichkeit auch zu Unverantwortlichkeit verkommen oder dazu führen, dass sie sich in Angelegenheiten einmischen, die sie nichts angehen.';

  // caclulating BZ
  const bzValue = calculateBZ(firstNamesArray, lastNameArray);
  // TODO getting description for calculated value
  const bzValueText =
    'Diese Berufszahl weist auf Dynamik und persönliche Unabhängigkeit hin. Personen, denen die Zahl 1 zugeordnet wird, sind kreativ und können gut organisieren. Sie eignen sich für administrative Tätigkeiten und Führungspositionen, denn sie arbeiten gerne selbstständig, besitzen viel Ausdauer und verfügen über eine rasche Auffassungsgabe sowie logisches Denken. Diese Personen können gut organisieren, besitzen Ausdauer, eine rasche Auffassungsgabe und logisches Denken, arbeiten gerne selbstständig, eignen sich für administrative Tätigkeiten, Führungspositionen, Angestelltenverhältnis oder Selbstständigkeit. Berufe: LektorIn, VerlagsleiterIn, SchriftstellerIn, TheaterproduzentIn, SchauspielerIn, wissenschaftliche oder technische Berufe.';

  // calculating NNZ
  const nnzValue = calculateNNZ(lastNameArray);
  // TODO getting description for calculated value
  const nnzValueText =
    'Das Kind wird oft in eine starre Struktur gepresst. Beide Eltern sind meist berufstätig und die Betreuung der Kinder muss gut nebenher funktionieren. Es gibt wenig Freude, Gelassenheit und Leichtigkeit. Zwei Glaubenssätze werden gelebt: „Ohne Fleiß kein Preis“ und „Das Leben ist schwer, ohne Erfolg ist keine Entwicklung möglich“. Für die Eltern ist es wichtig, die Fassade nach außen hin aufrechtzuerhalten. Diese Kinder entwickeln die Verhaltensstrategien, brav zu sein und sich anzupassen.';

  return {
    name: 'Ausdrucksebene',
    numbers: [
      {
        name: 'Ausdruckszahl',
        type: 'row',
        id: 'AZ',
        textShort: azValueText,
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
        textShort: bzValueText,
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
        textShort: nnzValueText,
        result: {
          type: 'number',
          value: nnzValue,
        },
        highlighted: false,
      },
    ],
  };
}
