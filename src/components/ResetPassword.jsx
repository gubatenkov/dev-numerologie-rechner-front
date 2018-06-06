import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';

import { postJsonData } from '../utils/AuthUtils';

import Panel from './Panel';
import InputField from './InputField';

import logo from '../logo.png';
import '../styles/InputForm.css';

/**
 * Login Form component
 */
class ResetPassword extends Component {
  /**
   * default constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);

    // members for authentication
    this.email = null;
  }

  componentWillMount() {
    // setting background dynamically
    document.body.style.backgroundColor = '#00b3d4';
  }

  componentWillUnmount() {
    // unsetting background dynamically
    document.body.style.backgroundColor = null;
  }

  /**
   * attempts to reset password
   */
  resetPassword = async () => {
    // sending request to server
    try {
      await postJsonData('/reset-password', {
        email: this.email,
      });

      NotificationManager.success('Ein Email mit einer Anleitung zum Zurücksetzten des Passworts wurde versendet.');

      // redirecting to user home after 3 seconds
      setTimeout(() => this.props.history.push('/login'), 3000);
    } catch (error) {
      NotificationManager.error('Rücksetzen fehlgeschlagen. Bitte versuchen Sie es erneut.');
    }
  };

  /**
   * default render method
   */
  render() {
    return (
      <div className="page-register-v3 layout-full">
        <div className="page vertical-align">
          <div className="page-content">
            <div className="text-center">
              <a href="https://www.psychologischenumerologie.eu/">
                <img
                  className="brand-img logo"
                  height="150"
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
                    onChange={(event) => {
                      this.email = event.target.value;
                    }}
                  />
                  <button
                    className="btn btn-primary btn-block"
                    onClick={this.resetPassword}
                  >
                    Zurücksetzen
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
        <NotificationContainer />
      </div>
    );
  }
}

export default withRouter(ResetPassword);
