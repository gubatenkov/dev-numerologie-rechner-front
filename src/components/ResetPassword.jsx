import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import ToastNotifications from 'cogo-toast';
import LoadingIndicator from './LoadingIndicator';

import { postJsonData } from '../utils/AuthUtils';

import Panel from './Panel';
import InputField from './InputField';

import logo from '../images/logo_weiss_trans.png';
import '../styles/InputForm.css';

// delay after which the user is redirected upon successful reset
const DELAY_REDIRECT_AFTER_RESET = 3000;

const ResetPassword = (props) => {
  // getting prop elements
  const { history } = props;

  // email address and loading state
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // WORKAROUND: setting background of whole doc upon mount/unmount
  useEffect(() => {
    // setting background dynamically
    document.body.style.backgroundColor = '#00b3d4';

    return () => {
      // resetting background dynamically
      document.body.style.backgroundColor = null;
    };
  });

  // attempt to reset password on server
  const resetPassword = async () => {
    // sending request to server
    try {
      // setting loading indicator
      setLoading(true);

      // making request to server
      await postJsonData('/reset-password', {
        email,
      });

      ToastNotifications.success(
        'Ein Email mit einer Anleitung zum Zurücksetzten des Passworts wurde versendet.',
        { position: 'top-right' },
      );

      // redirecting to user home after delay
      setTimeout(() => history.push('/login'), DELAY_REDIRECT_AFTER_RESET);
    } catch (error) {
      ToastNotifications.error(
        'Rücksetzen fehlgeschlagen. Bitte versuchen Sie es erneut.',
        { position: 'top-right' },
      );
    } finally {
      setLoading(false);
    }
  };

  // if loading => Showing indicator to user
  if (loading) {
    return <LoadingIndicator text="Sende Email..." />;
  }

  return (
    <div className="page-register-v3 layout-full">
      <div className="page vertical-align">
        <div className="page-content">
          <div className="text-center">
            <a href="https://www.psychologischenumerologie.eu/">
              <img
                className="brand-img logo"
                height="250"
                src={logo}
                alt="logo"
              />
            </a>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-lg-4">
              <Panel title="Passwort Zurücksetzen">
                <InputField
                  icon="wb-user"
                  fieldName="Email-Adresse"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={resetPassword}
                >
                  Passwort Zurücksetzen
                </button>
                <div className="InputForm__options">
                  <Link to="/login">
                    <h6>Anmelden</h6>
                  </Link>
                  <Link to="/register">
                    <h6>Registrieren</h6>
                  </Link>
                </div>
              </Panel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ResetPassword);
