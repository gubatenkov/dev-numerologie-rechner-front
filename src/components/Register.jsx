import React, { Component } from 'react';

import { graphql } from 'react-apollo';

import { Link, withRouter } from 'react-router-dom';

import Panel from './Panel';
import InputField from './InputField';

import logo from '../logo.png';

import { AUTH_TOKEN } from '../utils/AuthUtils';
import { signupMutation } from '../graphql/Mutations';
import '../styles/InputForm.css';

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

  /**
   * attempts to register user
   */
  registerUser = async () => {
    console.log(`Register ${this.email} with ${this.password} and ${this.passwordMatch}`);
    const result = await this.props.signupMutation({
      variables: {
        email: this.email,
        password: this.password,
      },
    });

    console.log(result.data.signup);
    this.saveUserToken(result.data.signup);

    // redirecting to user home
    this.props.history.push('/userHome');
  };

  saveUserToken = (token) => {
    localStorage.setItem(AUTH_TOKEN, token);
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

export default graphql(signupMutation, { name: 'signupMutation' })(withRouter(Register));
