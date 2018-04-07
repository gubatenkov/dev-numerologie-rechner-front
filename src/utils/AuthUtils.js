export const AUTH_TOKEN = 'auth-token';

const AUTH_URL = 'http://localhost:4000/auth';

/**
 * checks if user is authenticated
 */
export function isUserAuthenticated() {
  return localStorage.getItem(AUTH_TOKEN);
}

/**
 * execute post call with JSON body to server
 * @param url the url to post to relative to the auth url
 * @param data the data to be sent as json body
 * @returns the json response or a json error
 */
export async function postJsonData(url, data) {
  const response = await fetch(AUTH_URL + url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const jsonResponse = await response.json();
    throw new Error(jsonResponse.message || 'Unknown error');
  }

  return response.json();
}
