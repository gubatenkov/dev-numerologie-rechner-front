export const AUTH_TOKEN = 'auth-token';

export function isUserAuthenticated() {
  console.log('Check Login');
  return localStorage.getItem(AUTH_TOKEN);
}
