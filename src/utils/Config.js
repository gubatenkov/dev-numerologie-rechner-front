// graphql endpoint url configuration
export const GRAPHQL_HOST = process.env.BACKEND_HOST || 'http://localhost:4000';
// export const GRAPHQL_HOST = 'https://dev-numerologie-rechner.herokuapp.com';
export const GRAPHQL_ENDPOINT = `${GRAPHQL_HOST}/graphql`;
export const AUTH_ENDPOINT = `${GRAPHQL_HOST}/auth`;
