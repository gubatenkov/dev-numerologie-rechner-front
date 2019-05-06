// graphql endpoint url configuration
export const GRAPHQL_HOST = process.env.REACT_APP_BACKEND_HOST || 'https://prd-numerologie-rechner.herokuapp.com';
export const GRAPHQL_ENDPOINT = `${GRAPHQL_HOST}/graphql`;
export const AUTH_ENDPOINT = `${GRAPHQL_HOST}/auth`;