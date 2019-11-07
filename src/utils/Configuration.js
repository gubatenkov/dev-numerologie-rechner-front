import { CI_COLOR_IDS } from './Constants';

// graphql endpoint url configuration
export const GRAPHQL_HOST = process.env.REACT_APP_BACKEND_HOST
  || 'https://prd-numerologie-rechner.herokuapp.com';
export const GRAPHQL_ENDPOINT = `${GRAPHQL_HOST}/graphql`;
export const AUTH_ENDPOINT = `${GRAPHQL_HOST}/auth`;

// result configurations defining the order and structuring of numbers for the personal result
// this is structured in two levels
// a) sections (top level) structuring results with the following properties:
//    - name: name of the section displayed in the table of contents and as a panel in the results
//    - color: color associated with the section (and used in a generated pdf)
// b) tables: list of tables to carry number information with the following properties
//   - name: name of the table displayed in the table header
//   - headings: table headings to be displayed
//   - numberIds: list of number ids to display in the table
export const PERSONAL_RESULT_CONFIGURATIONS = {
  LEVELS: [
    {
      name: 'Ausdrucksebene',
      color: CI_COLOR_IDS.RED_ORANGE_YELLOW,
      tables: [
        {
          name: 'Ausdrucksebene',
          headings: null,
          numberIds: ['az', 'bz', 'nnz'],
        },
      ],
    },
    {
      name: 'Persönlichkeitsebene',
      color: CI_COLOR_IDS.GREEN,
      tables: [
        {
          name: 'Persönlichkeitsebene',
          numberIds: [
            'wz',
            'lz',
            'iz',
            'gz',
            'gdr.gdr',
            'gdr.gdrv',
            'gdr.gdrf',
            'gdr.gdri',
          ],
          headings: null,
        },
      ],
    },
    {
      name: 'Entfaltungspotenzial',
      color: CI_COLOR_IDS.BLUE,
      tables: [
        {
          name: 'Entfaltungspotenzial',
          numberIds: ['tz', 'kz', 'bfz', 'visz'],
          headings: null,
        },
      ],
    },
    {
      name: 'Seelische Ebene',
      color: CI_COLOR_IDS.PURPLE,
      tables: [
        {
          name: 'Seelische Ebene',
          numberIds: ['sz', 'iniz', 'sm', 'smv', 'kl', 'zsa'],
          headings: null,
        },
      ],
    },
    {
      name: 'Zeitliche Ebene',
      color: CI_COLOR_IDS.SILVER,
      tables: [
        {
          name: 'Vibratorische Zyklen',
          numberIds: ['vz.vzb', 'vz.vzp', 'vz.vze'],
          headings: [
            'Vibratorische Zyklen',
            'VZ',
            'Wert',
            'Alter',
            'Beschreibung',
            'Referenz im Buch',
          ],
        },
        {
          name: 'Herausforderungen und Höhepunkte',
          numberIds: ['hfhp.hfHp1', 'hfhp.hfHp2', 'hfhp.hfHp3', 'hfhp.hfHp4'],
          headings: [
            'Herausforderungen und Höhepunkte',
            'HF/HP',
            'HF',
            'HP',
            'Zeitpunkt',
            'Beschreibung',
            'Referenz im Buch',
          ],
        },
        {
          name: 'Persönliches Jahr',
          numberIds: ['pj.pj', 'pj.pjnj'],
          headings: [
            'Persönliches Jahr',
            'PJ',
            'Wert',
            'Zeitraum',
            'Beschreibung',
            'Referenz im Buch',
          ],
        },
      ],
    },
  ],
  STARTER: [
    {
      name: 'Persönlichkeit',
      color: CI_COLOR_IDS.GREEN,
      tables: [
        {
          name: 'Persönlichkeit',
          headings: null,
          numberIds: ['lz', 'wz', 'nnz', 'gz'],
        },
      ],
    },
    {
      name: 'Seele und Unbewusstes',
      color: CI_COLOR_IDS.PURPLE,
      tables: [
        {
          name: 'Seele und Unbewusstes',
          headings: null,
          numberIds: ['sz', 'iniz', 'iz'],
        },
      ],
    },
    {
      name: 'Potenzial und Berufung',
      color: CI_COLOR_IDS.BLUE,
      tables: [
        {
          name: 'Potenzial und Berufung',
          headings: null,
          numberIds: ['tz', 'az', 'kz', 'bz', 'visz', 'bfz'],
        },
      ],
    },
    {
      name: 'Facetten der Persönlichkeit und Erfahrungsbereiche',
      color: CI_COLOR_IDS.RED_ORANGE_YELLOW,
      tables: [
        {
          name: 'Facetten der Persönlichkeit und Erfahrungsbereiche',
          headings: null,
          numberIds: [
            'gdr.gdr',
            'gdr.gdrv',
            'gdr.gdrf',
            'gdr.gdri',
            'sm',
            'smv',
            'kl',
            'zsa',
          ],
        },
      ],
    },
    {
      name: 'Lebensabschnitte und Prüfungen im Leben',
      color: CI_COLOR_IDS.SILVER,
      tables: [
        {
          name: 'Vibratorische Zyklen',
          numberIds: ['vz.vzb', 'vz.vzp', 'vz.vze'],
          headings: [
            'Vibratorische Zyklen',
            'VZ',
            'Wert',
            'Alter',
            'Beschreibung',
            'Referenz im Buch',
          ],
        },
        {
          name: 'Herausforderungen und Höhepunkte',
          numberIds: ['hfhp.hfHp1', 'hfhp.hfHp2', 'hfhp.hfHp3', 'hfhp.hfHp4'],
          headings: [
            'Herausforderungen und Höhepunkte',
            'HF/HP',
            'HF',
            'HP',
            'Zeitpunkt',
            'Beschreibung',
            'Referenz im Buch',
          ],
        },
        {
          name: 'Persönliches Jahr',
          numberIds: ['pj.pj', 'pj.pjnj'],
          headings: [
            'Persönliches Jahr',
            'PJ',
            'Wert',
            'Zeitraum',
            'Beschreibung',
            'Referenz im Buch',
          ],
        },
      ],
    },
  ],
};
