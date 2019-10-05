import React, { useRef, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ToastNotifications from 'cogo-toast';

import Panel from './Panel';
import InputField from './InputField';

import { setUserAuthData, postJsonData } from '../utils/AuthUtils';
import '../styles/InputForm.css';
import '../styles/Login.css';

const Login = (props) => {
  // input field refs to access content upon submit
  const emailField = useRef();
  const passwordField = useRef();

  // email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    // getting react router history from props
    const { history } = props;

    // sending request to server
    try {
      const response = await postJsonData('/login', {
        email,
        password,
      });

      // saving received token
      setUserAuthData({
        email: emailField.current.value,
        token: response.token,
      });

      // redirecting to user home
      history.push('/userHome');
    } catch (error) {
      ToastNotifications.error(
        'Login fehlgeschlagen. Bitte versuchen Sie es erneut.',
        { position: 'top-right' },
      );
    }
  };

  // WORKAROUND: setting background of whole doc upon mount/unmount
  useEffect(() => {
    // setting background dynamically
    document.body.style.backgroundColor = '#00b3d4';

    return () => {
      // resetting background dynamically
      document.body.style.backgroundColor = null;
    };
  });

  return (
    <div className="page-register-v3 layout-full">
      <div className="page vertical-align">
        <div className="page-content">
          <div
            className="text-center"
            style={{ padding: `${50}px`, color: 'white' }}
          >
            <h1 className="Login__title">Psychologische Numerologie Rechner</h1>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-lg-4">
              <Panel title="Anmelden">
                <InputField
                  icon="wb-user"
                  fieldName="Email-Adresse"
                  onChange={(event) => setEmail(event.target.value)}
                  ref={emailField}
                />
                <InputField
                  type="password"
                  icon="wb-lock"
                  fieldName="Passwort"
                  onChange={(event) => setPassword(event.target.value)}
                  ref={passwordField}
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={loginUser}
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
};

export default withRouter(Login);
