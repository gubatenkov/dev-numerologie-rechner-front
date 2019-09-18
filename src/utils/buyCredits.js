const CREDIT_PERSONAL_SHORT_WPID = 364;
const CREDIT_PERSONAL_LONG_WPID  = 365;

const baseUrl = 'https://www.bios-shop.eu';
const loginUri = `${baseUrl}/?remote_login=true`;

/**
 * Opens a browser window with shop, add the products identified
 * by passed ids to cart and navigate to cart
 * @param {Array} productIds An array of product id strings of all products to add to the cart. 
 * e.g. ['42', '42', '55', '63'].
 */
function addProductsToShopCart(productIds) {
  // generating string of productIds to add include in the URI
  const productIDsURI = encodeURIComponent(productIds.join(','));

  // generating add to cart URL for products
  const addToCartURI = `${baseUrl}/warenkorb/?add_to_cart_multiple=${productIDsURI}`;

  // opening and focusing link
  const shopWindow = window.open(addToCartURI, '_blank');
  shopWindow.focus();
}

/**
 * Authenticates the user in the woocommerce webshop and redirects to the
 * provided URI after authentication has been successful. NOTE: This is not working
 * yet and therefore was removed for now.
 * @param {*} redirectUri the URI to redirect to after authentication
 * @param {*} wpAccessToken the user wordpress access token to authenticate
 * @param {*} windowToken TBA
 */
/* function authenticateAndRedirectToUrl(redirectUri, wpAccessToken, windowToken) {
  const url = `${loginUri}&window_token=${windowToken}&access_token=
  ${wpAccessToken}&redirect_uri=${redirectUri}`;
  const win = window.open(url, '_blank');
  win.focus();
} */

export default function buyCredits(personalShorts = 0, personalLongs = 0, wpAccessToken, windowToken) {
  const idsPersonalShorts = Array(parseInt(personalShorts, 10)).fill(CREDIT_PERSONAL_SHORT_WPID);
  const idsPersonalLongs = Array(parseInt(personalLongs, 10)).fill(CREDIT_PERSONAL_LONG_WPID);
  const ids = [];

  if (idsPersonalShorts) {
    ids.push(...idsPersonalShorts);
  }
  if (idsPersonalLongs) {
    ids.push(...idsPersonalLongs);
  }

  addProductsToShopCart(ids);
}
