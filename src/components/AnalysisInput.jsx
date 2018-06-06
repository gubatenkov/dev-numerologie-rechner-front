import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import yup from 'yup';
import moment from 'moment';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';

import Panel from './Panel';
import InputField from './InputField';

import logo from '../logo.png';
import '../styles/AnalysisInput.css';
import '../styles/InputForm.css';

// defining model for validation
const inputSchemaPersonal = yup.object({
  firstNames: yup
    .string()
    .trim()
    .required(),
  lastName: yup
    .string()
    .trim()
    .required(),
});
const inputSchemaPersonalCompare = yup.object({
  firstNames: yup
    .string()
    .trim()
    .required(),
  lastName: yup
    .string()
    .trim()
    .required(),
  firstNamesCompare: yup
    .string()
    .trim()
    .required(),
  lastNameCompare: yup
    .string()
    .trim()
    .required(),
});

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

  componentWillMount() {
    // setting background dynamically
    document.body.style.backgroundColor = '#00b3d4';
  }

  componentWillUnmount() {
    // unsetting background dynamically
    document.body.style.backgroundColor = null;
  }

  /**
   * validates the input and displays a notification
   * in case of faulty input
   */
  validateInput = async () => {
    let valid;
    if (this.firstNamesComfort || this.lastNameComfort) {
      // validating input
      valid = await inputSchemaPersonalCompare.isValid({
        firstNames: this.firstNames,
        lastName: this.lastNames,
        firstNamesCompare: this.firstNamesComfort,
        lastNameCompare: this.lastNameComfort,
      });
    } else {
      // validating input
      valid = await inputSchemaPersonal.isValid({
        firstNames: this.firstNames,
        lastName: this.lastNames,
      });
    }

    // setting error message
    if (!valid) {
      NotificationManager.error('Vor- und Nachname müssen (für alle Namen) angegeben werden.');
      return false;
    }

    // validating dateOfBirth
    const date = moment(this.dateOfBirth, 'DD.MM.YYYY', true);
    if (!date.isValid()) {
      NotificationManager.error('Es muss ein Datum im Format DD.MM.YYYY eingegeben werden.');
      return false;
    }

    return true;
  };

  /**
   * starts the analysis upon button click
   */
  startAnalysis = async () => {
    // if input is not valid => skipping
    if (!await this.validateInput()) {
      return;
    }

    // navigating to right analysis screen
    if (this.firstNamesComfort && this.lastNameComfort) {
      this.props.history.push(`/resultPersonalCompare/${[this.firstNames, this.firstNamesComfort]}/${[
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
                <Panel title="Numerologische Analyse">
                  <h6>Wohlfühlname</h6>
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
                      <h6>Geburtsname / Alternativer Name</h6>
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

export default withRouter(AnalysisInput);
