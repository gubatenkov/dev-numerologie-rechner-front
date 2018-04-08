import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

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

    this.state = {
      errorMessage: null,
    };

    // members for authentication
    this.email = null;
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

      // redirecting to user home
      this.props.history.push('/login');
    } catch (error) {
      console.log(error);
      this.setState({
        errorMessage: 'Passwort setzen fehlgeschlagen.',
      });
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
              <img
                className="brand-img logo"
                height="150"
                src={logo}
                alt="logo"
              />
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
                  </div>
                </Panel>
                <div>
                  <h5>{this.state.errorMessage}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ResetPassword);
