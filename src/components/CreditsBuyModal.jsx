import React, { useState, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { graphql, compose } from 'react-apollo';

import CreditsBuyWait from './CreditsBuyWait';

import buyCredits from '../utils/buyCredits';
import {
  createWindowTokenMutation,
} from '../graphql/Mutations';

const PRICE_PERSONAL_SHORT = 25;
const PRICE_PERSONAL_LONG = 49;

const CreditsBuyModal = ({ wpAccessToken, show, onHide, onBuy, createWindowToken }) => {
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
  }

  return (
    <Fragment>
      {isWaitingCallback && <CreditsBuyWait onSuccess={handleBuySuccess} windowToken={windowToken} />}
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Buy credits</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSuccess && (
            <Alert variant="success">
              <strong>Success!</strong> You have successfully purchased credits.
              You can close this window now.
            </Alert>
          )}
          <Table>
            <thead>
              <tr>
                <td>Analysis type</td>
                <td>Kurz Preis</td>
                <td>Kurz PDF</td>
                <td>Lang Preis</td>
                <td>Lang PDF</td>
                <td>Gesamt</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Personal, Personal Comp</td>
                <td>€ {PRICE_PERSONAL_SHORT}</td>
                <td>
                  <input
                    type="number"
                    size={4}
                    value={personalShorts}
                    onChange={(e) => setPersonalShorts(e.target.value)}
                  />
                </td>
                <td>€ {PRICE_PERSONAL_LONG}</td>
                <td>
                  <input
                    type="number"
                    size={4}
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
            Close
          </Button>
          {!isSuccess && (
            <Button variant="primary" onClick={initiateBuy}>
              Buy
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default compose(
  graphql(createWindowTokenMutation, { name: 'createWindowToken' })
)(CreditsBuyModal);
