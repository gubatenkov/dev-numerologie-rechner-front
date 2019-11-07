import React, { useState, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';

import CreditsBuyWait from './CreditsBuyWait';

import {buyCredits} from '../utils/BuyCredits';
import {
  createWindowTokenMutation,
} from '../graphql/Mutations';

import '../styles/CreditsBuyModal.css';

const PRICE_PERSONAL_SHORT = 29;
const PRICE_PERSONAL_LONG = 59;

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
  }

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
}

export default compose(
  graphql(createWindowTokenMutation, { name: 'createWindowToken' })
)(CreditsBuyModal);
