// key used to obtain intro text for whole analysis result
export const OVERALL_INTRO_KEY = configurationId =>
  `Einführung_${configurationId}`;

// ids of ci colors
export const CI_COLOR_IDS = {
  RED_ORANGE_YELLOW: 'RED_ORANGE_YELLOW',
  RED: 'RED',
  ORANGE: 'ORANGE',
  YELLOW: 'YELLOW',
  GREEN: 'GREEN',
  BLUE: 'BLUE',
  PURPLE: 'PURPLE',
  SILVER: 'SILVER',
  GREY: 'GREY',
  BLACK: 'BLACK',
  WHITE: 'WHITE',
};

// used colors (mapping from color ids)
export const CI_COLORS = {
  RED_ORANGE_YELLOW: '#fb2c2c',
  RED: '#fb2c2c',
  ORANGE: '#f88000',
  YELLOW: '#e7c900',
  GREEN: '#8ebe31',
  BLUE: '#00b3d4',
  PURPLE: '#bb00eb',
  SILVER: '#afafaf',
  GREY: '#969696',
  BLACK: '#262626',
  WHITE: '#FFFFFF',
};

// identifiers for results
export const TYPE_ID_NUMBER = 'number';
export const TYPE_ID_LIST = 'list';
export const TYPE_ID_MATRIX = 'matrix';

// threshold for switching to the mobile optimized styling
// this refers to horizontal pixels of the resulotion of the users device
export const MOBILE_RESOLUTION_THRESHOLD = 767;
