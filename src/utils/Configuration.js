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
export const PERSONAL_RESULT_CONFIGURATION_IDS = {
  LEVELS: 'LEVELS',
  STARTER: 'STARTER',
};

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
          showTitle: true,
        },
        {
          name: 'Herausforderungen',
          numberIds: ['hfhp.hf1', 'hfhp.hf2', 'hfhp.hf3', 'hfhp.hf4'],
          showTitle: true,
        },
        {
          name: 'Höhepunkte',
          numberIds: ['hfhp.hp1', 'hfhp.hp2', 'hfhp.hp3', 'hfhp.hp4'],
          showTitle: true,
        },
        {
          name: 'Persönliches Jahr',
          numberIds: ['pj.pj', 'pj.pjnj'],
          showTitle: true,
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
          showTitle: true,
        },
        {
          name: 'Herausforderungen',
          numberIds: ['hfhp.hf1', 'hfhp.hf2', 'hfhp.hf3', 'hfhp.hf4'],
          showTitle: true,
        },
        {
          name: 'Höhepunkte',
          numberIds: ['hfhp.hp1', 'hfhp.hp2', 'hfhp.hp3', 'hfhp.hp4'],
          showTitle: true,
        },
        {
          name: 'Persönliches Jahr',
          numberIds: ['pj.pj', 'pj.pjnj'],
          showTitle: true,
        },
      ],
    },
  ],
};

export const getConfigurationForId = (configurationId) => PERSONAL_RESULT_CONFIGURATIONS[configurationId.toUpperCase()];

export const PERSONAL_RESULT_CONFIGURATION_DEFAULT_ID = PERSONAL_RESULT_CONFIGURATION_IDS.STARTER;

export const PERSONAL_RESULT_CONFIGURATION_DEFAULT = PERSONAL_RESULT_CONFIGURATIONS[PERSONAL_RESULT_CONFIGURATION_DEFAULT_ID];
