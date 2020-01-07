import React, { useState, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';

import CreditsBuyWait from './CreditsBuyWait';
import {
  createWindowTokenMutation,
} from '../graphql/Mutations';

import '../styles/CreditsBuyModal.css';

// webshop product ids and price of short and long personal analysis credit
const CREDIT_PERSONAL_SHORT_WPID = 364;
const CREDIT_PERSONAL_LONG_WPID  = 365;
const PRICE_PERSONAL_SHORT = 29;
const PRICE_PERSONAL_LONG = 59;

// baseURL of the shop
const baseUrl = 'https://www.bios-shop.eu';

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
export function buyCredits(personalShorts = 0, personalLongs = 0, wpAccessToken, windowToken) {
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

const CreditsBuyModal = ({ credits, wpAccessToken, show, onHide, onSuccessfulPurchase, onBuy, createWindowToken }) => {
  const [personalShorts, setPersonalShorts] = useState(1);
  const [personalLongs, setPersonalLongs] = useState(1);
  const [windowToken, setWindowToken] = useState(null);
  const [isWaitingCallback, setWaitingCallback] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const totalPrice = PRICE_PERSONAL_SHORT * personalShorts + PRICE_PERSONAL_LONG * personalLongs;

  const initiateBuy = async () => {
    const { data: { windowToken } } = await createWindowToken();
    buyCredits(personalShorts, personalLongs, wpAccessToken, windowToken.windowToken);
    setWindowToken(windowToken.windowToken);
    setWaitingCallback(true);
  };

  const handleBuySuccess = () => {
    setWaitingCallback(false);
    setSuccess(true);
    onSuccessfulPurchase();
  };

  return (
    <Fragment>
      {isWaitingCallback && <CreditsBuyWait onSuccess={handleBuySuccess} windowToken={windowToken} />}
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Guthaben kaufen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSuccess && (
            <Alert variant="success">
              <strong>Gratuliere!</strong> Der Guthaben-Kauf war erfolgreich!
              Sie können dieses Fenster nun schließen.
            </Alert>
          )}
          {
            !isSuccess
            &&
            (!credits || credits.length === 0 || credits.filter(c => c.total > 0).length === 0)
            && (
            <p>Das Erstellen eines Numeroskop-PDFs ist ein kostenpflichtiger Premium Service.<br />
            Derzeit haben Sie dafür kein Guthaben zur Verfügung. Sie haben die Möglichkeit,
            folgende Arten von Guthaben zu erwerben:</p>
          )}
          <Table>
            <thead>
              <tr>
                <td>Analyseart</td>
                <td>Preis kurze Version</td>
                <td className="buyModalNumberCell">Anzahl</td>
                <td>Preis lange Version</td>
                <td className="buyModalNumberCell">Anzahl</td>
                <td>Gesamt</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Persönlichkeitsnumeroskop</td>
                <td>€ {PRICE_PERSONAL_SHORT}</td>
                <td className="buyModalNumberCell">
                  <input
                    disabled={isSuccess}
                    className="buyModalNumber"
                    type="number"
                    size={2}
                    value={personalShorts}
                    onChange={(e) => setPersonalShorts(e.target.value)}
                  />
                </td>
                <td>€ {PRICE_PERSONAL_LONG}</td>
                <td className="buyModalNumberCell">
                  <input
                    disabled={isSuccess}
                    className="buyModalNumber"
                    type="number"
                    size={2}
                    value={personalLongs}
                    onChange={(e) => setPersonalLongs(e.target.value)}
                  />
                </td>
                <td>€ {totalPrice}</td>
              </tr>
              <tr>
                <td colSpan={5}>Gesamt</td>
                <td><strong>€ {totalPrice}</strong></td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Abbrechen
          </Button>
          {!isSuccess && (
            <Button variant="primary" onClick={initiateBuy}>
              Kaufen
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default compose(
  graphql(createWindowTokenMutation, { name: 'createWindowToken' })
)(CreditsBuyModal);
