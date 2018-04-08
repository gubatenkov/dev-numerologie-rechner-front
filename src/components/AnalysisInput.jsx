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
  }

  /**
   * handles changes to the first name field
   */
  handleFirstNamesValueChanged = (event) => {
    // storing change
    this.firstNames = event.target.value;
  };

  /**
   * handles changes to the last name field
   */
  handleLastNameValueChanged = (event) => {
    this.lastNames = event.target.value;
  };

  /**
   * handes changes of the date of birth
   */
  handleDateOfBirthChange = (event) => {
    this.dateOfBirth = event.target.value;
  };

  /**
   * starts the analysis upon button click
   */
  startAnalysis = () => {
    this.props.history.push(`/resultPersonal/${this.firstNames}/${this.lastNames}/${this.dateOfBirth}`);
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
                    onChange={this.handleFirstNamesValueChanged}
                  />
                  <InputField
                    icon="wb-user"
                    fieldName="Nachname"
                    onChange={this.handleLastNameValueChanged}
                  />
                  <InputField
                    icon="wb-calendar"
                    fieldName="Geburtsdatum"
                    onChange={this.handleDateOfBirthChange}
                  />
                  <button
                    className="btn btn-primary btn-block"
                    onClick={this.startAnalysis}
                  >
                    Starten
                  </button>
                  <div className="InputForm__options">
                    <Link to="/userHome" target="_blank">
                      <h6>Anmelden</h6>
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

export default withRouter(AnalysisInput);
