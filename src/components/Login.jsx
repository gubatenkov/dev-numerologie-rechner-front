import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';

import Panel from './Panel';
import InputField from './InputField';

import ToastNotifications from 'cogo-toast';

import { setUserAuthData, postJsonData } from '../utils/AuthUtils';
import '../styles/InputForm.css';
import '../styles/Login.css';

/**
 * Login Form component
 */
class Login extends Component {
  /**
   * default constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);

    // members for authentication
    this.email = null;
    this.password = null;
  }

  componentDidMount() {
    // setting background dynamically
    document.body.style.backgroundColor = '#00b3d4';
  }

  componentWillUnmount() {
    // unsetting background dynamically
    document.body.style.backgroundColor = null;
  }

  /**
   * attempts to login user
   */
  loginUser = async () => {
    // sending request to server
    try {
      const response = await postJsonData('/login', {
        email: this.email,
        password: this.password,
      });

      // saving received token
      setUserAuthData({ email: this.email, token: response.token });

      // redirecting to user home
      this.props.history.push('/userHome');
    } catch (error) {
      ToastNotifications.error('Login fehlgeschlagen. Bitte versuchen Sie es erneut.', { position: 'top-right' });
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
            <div className="text-center" style={{padding: 50 + 'px', color: 'white'}}>
              <h1 className="Login__title">Psychologische Numerologie Rechner</h1>
            </div>
            <div className="row justify-content-md-center">
              <div className="col-lg-4">
                <Panel title="Anmelden">
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
                  <button
                    className="btn btn-primary btn-block"
                    onClick={this.loginUser}
                  >
                    Anmelden
                  </button>
                  <div className="InputForm__options">
                    <Link to="/reset">
                      <h6>Passwort zurücksetzen</h6>
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
  }
}

export default withRouter(Login);
