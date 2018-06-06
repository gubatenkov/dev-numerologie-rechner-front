import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';

import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';

import Panel from './Panel';
import InputField from './InputField';

import logo from '../logo.png';

import { setUserAuthData, postJsonData } from '../utils/AuthUtils';
import '../styles/InputForm.css';
import '../styles/Register.css';

/**
 * Login Form component
 */
class Register extends Component {
  /**
   * default constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
    };

    // members for authentication
    this.email = null;
    this.password = null;
    this.passwordMatch = null;
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
   * attempts to register user
   */
  registerUser = async () => {
    // sending request to server
    try {
      const response = await postJsonData('/register', {
        email: this.email,
        password: this.password,
      });

      // saving received token
      setUserAuthData({ email: this.email, token: response.token });

      // redirecting to user home
      this.props.history.push('/userHome');
    } catch (error) {
      NotificationManager.error('Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.');
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
                <Panel title="Registrieren">
                  <InputField
                    icon="wb-user"
                    fieldName="Email-Adresse"
                    onChange={(event) => {
                      this.email = event.target.value;
                    }}
                  />
                  <InputField
                    type="password"
                    icon="wb-lock"
                    fieldName="Passwort"
                    onChange={(event) => {
                      this.password = event.target.value;
                    }}
                  />
                  <InputField
                    type="password"
                    icon="wb-lock"
                    fieldName="Passwort wiederholen"
                    onChange={(event) => {
                      this.passwordMatch = event.target.value;
                    }}
                  />
                  <button
                    className="btn btn-primary btn-block"
                    onClick={this.registerUser}
                  >
                    Registrieren
                  </button>
                  <div className="InputForm__options">
                    <Link to="/reset">
                      <h6>Passwort zurücksetzen</h6>
                    </Link>
                    <Link to="/login">
                      <h6>Anmelden</h6>
                    </Link>
                  </div>
                </Panel>
                <div className="Register__error">
                  <h5>{this.state.errorMessage}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default withRouter(Register);
