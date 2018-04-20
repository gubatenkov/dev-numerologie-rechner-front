import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import Panel from './Panel';
import InputField from './InputField';

import logo from '../logo.png';
import '../styles/AnalysisInput.css';
import '../styles/InputForm.css';

/* eslint-disable react/prefer-stateless-function */
class AnalysisInput extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };
  /**
   * default constructor
   */
  constructor(props) {
    // calling super class constructor
    super(props);

    // setting values for members
    this.firstNames = null;
    this.lastNames = null;
    this.dateOfBirth = null;
    this.firstNamesComfort = null;
    this.lastNameComfort = null;

    this.state = {
      comfortNameFieldsShown: false,
    };
  }

  /**
   * starts the analysis upon button click
   */
  startAnalysis = () => {
    if (this.firstNamesComfort && this.lastNameComfort) {
      this.props.history.push(`/resultPersonal/${[this.firstNames, this.firstNamesComfort]}/${[
        this.lastNames,
        this.lastNameComfort,
      ]}/${this.dateOfBirth}`);
    } else {
      this.props.history.push(`/resultPersonal/${this.firstNames}/${this.lastNames}/${
        this.dateOfBirth
      }`);
    }
  };

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
                <Panel title="Akademie Bios Analyse">
                  <InputField
                    icon="wb-user"
                    fieldName="Vorname(n)"
                    onChange={(event) => {
                      this.firstNames = event.target.value;
                    }}
                  />
                  <InputField
                    icon="wb-user"
                    fieldName="Nachname"
                    onChange={(event) => {
                      this.lastNames = event.target.value;
                    }}
                  />
                  <InputField
                    icon="wb-calendar"
                    fieldName="Geburtsdatum"
                    onChange={(event) => {
                      this.dateOfBirth = event.target.value;
                    }}
                  />
                  {this.state.comfortNameFieldsShown && (
                    <div>
                      <h6>Wohlfühlname</h6>
                      <InputField
                        icon="wb-user"
                        fieldName="Vorname(n)"
                        onChange={(event) => {
                          this.firstNamesComfort = event.target.value;
                        }}
                      />
                      <InputField
                        icon="wb-user"
                        fieldName="Nachname"
                        onChange={(event) => {
                          this.lastNameComfort = event.target.value;
                        }}
                      />
                    </div>
                  )}
                  <button
                    className="btn btn-primary btn-block"
                    onClick={this.startAnalysis}
                  >
                    Starten
                  </button>
                  <div className="InputForm__options">
                    <Link to="/userHome">
                      <h6>Anmelden</h6>
                    </Link>
                    <Link to="/register">
                      <h6>Registrieren</h6>
                    </Link>
                    <a
                      role="button"
                      onClick={() =>
                        this.setState({
                          comfortNameFieldsShown: !this.state
                            .comfortNameFieldsShown,
                        })
                      }
                    >
                      <h6>
                        {`Vergleichsnamen ${
                          this.state.comfortNameFieldsShown
                            ? 'ausblenden'
                            : 'einblenden'
                        }`}
                      </h6>
                    </a>
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

export default withRouter(AnalysisInput);
