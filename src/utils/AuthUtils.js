const AUTH_TOKEN = 'auth-token';
const AUTH_EMAIL = 'auth-email';

const AUTH_URL = 'http://localhost:4000/auth';

/**
 * checks if user is authenticated
 */
export function isUserAuthenticated() {
  return localStorage.getItem(AUTH_TOKEN) && localStorage.getItem(AUTH_EMAIL);
}

/**
 * returns the user auth item stored locally
 */
export function getUserAuthData() {
  return {
    email: localStorage.getItem(AUTH_EMAIL),
    token: localStorage.getItem(AUTH_TOKEN),
  };
}

/**
 * sets the user auth data item stored locally
 */
export function setUserAuthData(authData) {
  localStorage.setItem(AUTH_TOKEN, authData.token);
  localStorage.setItem(AUTH_EMAIL, authData.email);
}

/**
 * deletes the user auth data item stored locally
 */
export function deleteUserAuthData() {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(AUTH_EMAIL);
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
