import React, { useState, Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";
import { useTranslation } from "react-i18next";

import { useBuyModal } from "../../contexts/BuyModalContext";
import { CreditsBuyModalBodyMobile } from "./CreditsBuyModalBodyMobile";
import CreditsBuyWait from "../CreditsBuyWait";
import { createWindowTokenMutation } from "../../graphql/Mutations";
import { useMediaQuery } from "../../utils/useMediaQuery";

import "../../styles/CreditsBuyModal.css";
import { useEffect } from "react";
import { useUser } from "../../contexts/UserContext";

// webshop product ids and price of short and long personal analysis credit
const CREDIT_PERSONAL_SHORT_WPID = 364;
const CREDIT_PERSONAL_LONG_WPID = 365;
const PRICE_PERSONAL_SHORT = 29;
const PRICE_PERSONAL_LONG = 59;

const baseUrl = "https://www.bios-shop.eu";

const CreditsBuyModal = props => {
  const { createWindowToken } = props;
  const [personalShorts, setPersonalShorts] = useState(1);
  const [personalLongs, setPersonalLongs] = useState(1);
  const [windowToken, setWindowToken] = useState(null);
  const [isWaitingCallback, setWaitingCallback] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const { isOpen, setIsOpen } = useBuyModal();
  const isMobile = useMediaQuery(1000);
  const User = useUser();
  const { t } = useTranslation();

  const totalPrice =
    PRICE_PERSONAL_SHORT * personalShorts + PRICE_PERSONAL_LONG * personalLongs;

  useEffect(() => {
    setTimeout(async () => {
      try {
        const {
          data: { windowToken }
        } = await createWindowToken();
        setWindowToken(windowToken.windowToken);
      } catch (e) {
        console.log("createWindowToken error:", e.message);
      }
    }, 0);
  }, [createWindowToken]);

  if (User.isFetching || !User.user) {
    return null;
  }

  /**
   * Opens a browser window with shop, add the products identified
   * by passed ids to cart and navigate to cart
   * @param {Array} productIds An array of product id strings of all products to add to the cart.
   * e.g. ['42', '42', '55', '63'].
   * @param {String} windowToken A unique token identifying the new shop window. This is used by the shop to match the window
   * with an order number upon completion in the database. So windowToken and wpOrderId will be matched in the db
   * @param {*} wpAccessToken the user wordpress access token to authenticate
   */
  function addProductsToShopCart(productIds, windowToken, wpAccessToken) {
    const productIDsURI = encodeURIComponent(productIds.join(","));

    const addToCartURI = `${baseUrl}/warenkorb/?add_to_cart_multiple=${productIDsURI}&window_token=${windowToken}&remote_login=true&access_token=${wpAccessToken}`;

    const shopWindow = window.open(addToCartURI, "", "_blank");
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
  function buyCredits(
    personalShorts = 0,
    personalLongs = 0,
    wpAccessToken,
    windowToken
  ) {
    const idsPersonalShorts = Array(parseInt(personalShorts, 10)).fill(
      CREDIT_PERSONAL_SHORT_WPID
    );
    const idsPersonalLongs = Array(parseInt(personalLongs, 10)).fill(
      CREDIT_PERSONAL_LONG_WPID
    );

    const ids = [];
    if (idsPersonalShorts) {
      ids.push(...idsPersonalShorts);
    }
    if (idsPersonalLongs) {
      ids.push(...idsPersonalLongs);
    }

    addProductsToShopCart(ids, windowToken, wpAccessToken);
  }

  const initiateBuy = () => {
    buyCredits(
      personalShorts,
      personalLongs,
      User.user.currentUser.wpAccessToken,
      windowToken
    );
    setWaitingCallback(true);
  };

  const handleBuySuccess = async () => {
    await User.fetchUser();
    setWaitingCallback(false);
    setSuccess(true);
  };

  const renderMobile = () => {
    return (
      <CreditsBuyModalBodyMobile
        personalLongs={personalLongs}
        setPersonalLongs={setPersonalLongs}
        personalShorts={personalShorts}
        setPersonalShorts={setPersonalShorts}
        PRICE_PERSONAL_SHORT={PRICE_PERSONAL_SHORT}
        PRICE_PERSONAL_LONG={PRICE_PERSONAL_LONG}
        totalPrice={totalPrice}
      />
    );
  };

  const renderTable = () => {
    return (
      <Table responsive={true}>
        <thead>
          <tr>
            <td>{t("ANALYSIS_TYPE")}</td>
            <td>{t("BUY_MODAL.SHORT_VERSION_PRICE")}</td>
            <td className="buyModalNumberCell">{t("BUY_MODAL.AMOUNT")}</td>
            <td>{t("BUY_MODAL.LONG_VERSION_PRICE")}</td>
            <td className="buyModalNumberCell">{t("BUY_MODAL.AMOUNT")}</td>
            <td>{t("BUY_MODAL.TOTAL")}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t("PERSONALITY_NUMEROLOSCOPE")}</td>
            <td>€ {PRICE_PERSONAL_SHORT}</td>
            <td className="buyModalNumberCell">
              <input
                disabled={isSuccess}
                className="buyModalNumber"
                type="number"
                size={2}
                value={personalShorts}
                onChange={e => setPersonalShorts(e.target.value)}
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
                onChange={e => setPersonalLongs(e.target.value)}
              />
            </td>
            <td>€ {totalPrice}</td>
          </tr>
          <tr>
            <td colSpan={5}>{t("BUY_MODAL.TOTAL")}</td>
            <td>
              <strong>€ {totalPrice}</strong>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  };

  return (
    <Fragment>
      {isWaitingCallback && (
        <CreditsBuyWait
          onSuccess={handleBuySuccess}
          windowToken={windowToken}
        />
      )}
      <Modal show={isOpen} onHide={() => setIsOpen(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{t("BUY_MODAL.BUY_CREDITS")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSuccess && (
            <Alert variant="success">
              <strong>{t("BUY_MODAL.CONGRATS!")}</strong>
              {t("BUY_MODAL.SUCCESSFUL_PURCHASE")}
            </Alert>
          )}
          {!isSuccess &&
            User.user.currentUser &&
            (!User.user.currentUser.credits ||
              User.user.currentUser.credits.length === 0 ||
              User.user.currentUser.credits.filter(c => c.total > 0).length ===
                0) && (
              <p>
                {t("BUY_MODAL.PREMIUM_SERVICE_INFO")}
                <br />
                {t("BUY_MODAL.BUY_OPPORTUNITY_INFO")}
              </p>
            )}
          {isMobile ? renderMobile() : renderTable()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            {t("CANCEL")}
          </Button>
          {!isSuccess && (
            <Button
              variant="primary"
              onClick={initiateBuy}
              disabled={personalLongs === 0 && personalShorts === 0}
            >
              {t("BUY")}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default compose(
  graphql(createWindowTokenMutation, { name: "createWindowToken" })
)(CreditsBuyModal);
