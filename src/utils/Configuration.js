// graphql endpoint url configuration
export const GRAPHQL_HOST =
  process.env.REACT_APP_BACKEND_HOST ||
  "https://prd-numerologie-rechner.herokuapp.com";
export const GRAPHQL_ENDPOINT = `${GRAPHQL_HOST}/graphql`;
export const AUTH_ENDPOINT = `${GRAPHQL_HOST}/auth`;

/*
  Describes the structure of a analysis (configuration from backend)
  LEVELS = Fortgeschritten, STARTER = Standard
*/
export const PERSONAL_RESULT_CONFIGURATION_IDS = {
  LEVELS: "LEVELS",
  STARTER: "STARTER"
};

export const PERSONAL_RESULT_CONFIGURATION_DEFAULT_ID =
  PERSONAL_RESULT_CONFIGURATION_IDS.STARTER;
