import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { postJsonData } from '../utils/AuthUtils';

import Panel from './Panel';
import InputField from './InputField';

import logo from '../logo.png';

/**
 * Login Form component
 */
class SetPassword extends Component {
  /**
   * default constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
    };

    // members for local state handling
    this.password = null;
    this.passwordMatch = null;
    this.token = this.props.match.params.token;
  }

  /**
   * sets user password
   */
  registerUser = async () => {
    console.log(`Setting new password to ${this.password}`);

    // sending request to server
    try {
      await postJsonData('/set-password', {
        password: this.password,
        token: this.token,
      });

      // redirecting to user home
      this.props.history.push('/login');
    } catch (error) {
      this.setState({
        errorMessage: 'Passwort setzen fehlgeschlagen.',
      });
    }
  };

  /**
   * default render method
   */
  render() {
    console.log(this.token);
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
                <Panel title="Neues Passwort setzten">
                  <InputField
                    type="password"
                    icon="wb-lock"
                    fieldName="Neues Password"
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
                    Passwort setzten
                  </button>
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

export default withRouter(SetPassword);
