import { CI_COLORS } from './Constants';

// graphql endpoint url configuration
export const GRAPHQL_HOST = process.env.REACT_APP_BACKEND_HOST
  || 'https://prd-numerologie-rechner.herokuapp.com';
export const GRAPHQL_ENDPOINT = `${GRAPHQL_HOST}/graphql`;
export const AUTH_ENDPOINT = `${GRAPHQL_HOST}/auth`;

// result configurations defining the order and structuring of numbers for the personal result
export const PersonalResultConfiguration = {
  LEVELS: [
    {
      name: 'Ausdrucksebene',
      color: CI_COLORS.RED,
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
      color: CI_COLORS.GREEN,
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
      color: CI_COLORS.BLUE,
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
      color: CI_COLORS.PURPLE,
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
      color: CI_COLORS.SILVER,
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
  STARTER: [],
};
