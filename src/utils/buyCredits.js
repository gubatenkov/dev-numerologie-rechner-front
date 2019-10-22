// webshop product ids of short and long personal analysis credit
const CREDIT_PERSONAL_SHORT_WPID = 364;
const CREDIT_PERSONAL_LONG_WPID  = 365;

const baseUrl = 'https://www.bios-shop.eu';
// const loginUri = `${baseUrl}/?remote_login=true`;

/**
 * Authenticates the user in the woocommerce webshop and redirects to the
 * provided URI after authentication has been successful. NOTE: This is not working
 * yet and therefore was removed for now.
 * @param {*} redirectUri the URI to redirect to after authentication
 * @param {*} wpAccessToken the user wordpress access token to authenticate
 * @param {*} windowToken TBA
 */
/* function authenticateAndRedirectToUrl(redirectUri, wpAccessToken, windowToken) {
  const url = `${loginUri}&window_token=${windowToken}&access_token=${wpAccessToken}&redirect_uri=${redirectUri}`;
  const win = window.open(url, '_blank');
  win.focus();
} */

/**
 * Opens a browser window with shop, add the products identified
 * by passed ids to cart and navigate to cart
 * @param {Array} productIds An array of product id strings of all products to add to the cart. 
 * e.g. ['42', '42', '55', '63'].
 * @param {String} windowToken A unique token identifying the new shop window. This is used by the shop to match the window
 * with an order number upon completion in the database. So windowToken and wpOrderId will be matched in the db
 */
function addProductsToShopCart(productIds, windowToken) {
  // generating string of productIds to add include in the URI
  const productIDsURI = encodeURIComponent(productIds.join(','));

  // generating add to cart URL for products
  const addToCartURI = `${baseUrl}/warenkorb/?add_to_cart_multiple=${productIDsURI}&window_token=${windowToken}`;

  // opening and focusing link
  const shopWindow = window.open(addToCartURI, '_blank');
  if (shopWindow) {
    shopWindow.focus();
  }
}

/**
 * opens a browser window for the shop and adds the selected credits to the shop
 * @param {Integer} personalShorts Number of short credits to buy in the shop
 * @param {Integer} personalLongs Number of long credits to buy in the shop
 * @param {*} wpAccessToken A wordpress access token to log the user in on the webshop (not yet implemented)
 * @param {*} windowToken A unique window token for the shop to match with an order ID upon completion.
 * Once a purchase is completed, this windowId will be matched with an wpOrderId in the db marking completion
 * of the purchase.
 */
export default function buyCredits(personalShorts = 0, personalLongs = 0, wpAccessToken, windowToken) {
  // getting array of ids for short and long credit products
  const idsPersonalShorts = Array(parseInt(personalShorts, 10)).fill(CREDIT_PERSONAL_SHORT_WPID);
  const idsPersonalLongs = Array(parseInt(personalLongs, 10)).fill(CREDIT_PERSONAL_LONG_WPID);

  // constructing array of all product ids
  const ids = [];
  if (idsPersonalShorts) {
    ids.push(...idsPersonalShorts);
  }
  if (idsPersonalLongs) {
    ids.push(...idsPersonalLongs);
  }

  // opening shop window and adding products to cart
  addProductsToShopCart(ids, windowToken);
}
