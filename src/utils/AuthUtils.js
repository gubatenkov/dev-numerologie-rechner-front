import { AUTH_ENDPOINT } from "../utils/Configuration";

const AUTH_TOKEN = "auth-token";
const AUTH_EMAIL = "auth-email";

export function isUserAuthenticated() {
  return localStorage.getItem(AUTH_TOKEN) && localStorage.getItem(AUTH_EMAIL);
}

export function getUserAuthData() {
  return {
    email: localStorage.getItem(AUTH_EMAIL),
    token: localStorage.getItem(AUTH_TOKEN)
  };
}

export function setUserAuthData(authData) {
  localStorage.setItem(AUTH_TOKEN, authData.token);
  localStorage.setItem(AUTH_EMAIL, authData.email);
}

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
  const response = await fetch(AUTH_ENDPOINT + url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const jsonResponse = await response.json();
    const error =
      typeof jsonResponse.error === "string"
        ? jsonResponse.error
        : jsonResponse.error.join("; ");
    throw new Error(error || "Unknown error");
  }

  return response.json();
}
