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
      readyToSubmit: false,
    };

    // members for authentication
    this.email = null;
    this.password = null;
    this.passwordMatch = null;
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
                  height="250"
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
                  <div className="Register__checkbox">
                    <input
                      type="checkbox"
                      onChange={event =>
                        this.setState({
                          readyToSubmit: event.target.checked,
                        })
                      }
                    />
                    <h6>
                      Ja, ich habe die{' '}
                      <a
                        href="https://www.psychologischenumerologie.eu/datenschutz/"
                        target="_blank"
                      >
                        Datenschutzerklärung
                      </a>{' '}
                      inkl. den Datenschutz-Hinweisen anbei unten, die{' '}
                      <a
                        href="https://www.psychologischenumerologie.eu/nutzungsbedingungen/"
                        target="_blank"
                      >
                        Nutzungsbedingungen
                      </a>{' '}
                      und die{' '}
                      <a
                        href="https://www.psychologischenumerologie.eu/agb/"
                        target="_blank"
                      >
                        AGBs
                      </a>{' '}
                      gelesen und erkläre mich damit ausdrücklich einverstanden.
                    </h6>
                  </div>
                  <button
                    className="btn btn-primary btn-block"
                    disabled={!this.state.readyToSubmit}
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
                    <h6>
                      <b>Datenschutz-Hinweis:</b> <br />Für den Service des
                      Psychologische Numerologie Rechners nutzen wir den Hosting
                      Server Heroku. Heroku ist eine Tochtergesellschaft der
                      salesforce.com (USA). Heroku speichert bei der Nutzung
                      Server-Logfiles. Bei der Registrierung zum Rechner wird
                      Ihre Email-Adresse für die Account-Erstellung bei Heroku
                      gespeichert. Sie erhalten von uns eine Bestätigungsemail
                      mit Link, den Sie anklicken müssen, um die Registrierung
                      abzuschließen (Double-opt in). Dies stellt sicher, dass
                      niemand anderer außer Ihnen Ihre Email-Adresse zur
                      Account-Erstellung verwendet. Ihre im Zuge der Nutzung
                      eingegebenen Daten wie Vorname, Nachname, Geburtsdatum
                      werden ebenfalls in Ihrem Account auf Heroku gespeichert.
                      Dies alles geschieht nur solange sie den Service aktiv
                      nutzen und Ihren Account nicht selbst löschen. Nach einer
                      Inaktivität von 2 Jahren werden Ihr Account und alle Ihre
                      eingegebenen Daten automatisch gelöscht. Um eine
                      unbeabsichtigte Löschung zu vermeiden, erhalten Sie von
                      uns vor der Löschung eine Hinweis-Email dazu. Diese
                      Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. b DSGVO zur
                      Vertragserfüllung unseres Services.
                      <br />
                      <br />{' '}
                      <b>
                        Sie dürfen die obigen personenbezogenen Daten von
                        anderen Menschen in den Psychologische Numerologie
                        Rechner nur dann eingeben, wenn Sie deren ausdrückliche
                        Zustimmung vorher eingeholt haben.
                      </b>{' '}
                      <br />
                      <br />
                      Die von Heroku bereitgestellten Server und Datenbanken
                      stehen in Deutschland/Europa und unterliegen den
                      europäischen Datenschutzbestimmungen. Für den Fall, dass
                      personenbezogene Daten in die USA übertragen werden, haben
                      sich Heroku und Salesforce dem EU-US Privacy Shield
                      unterworfen. <br />
                      <br />Die Webseiten des Psychologische Numerologie
                      Rechners nutzen die Funktionen des Webanalysedienstes
                      Google Analytics der Google LLC (USA). Dabei wird Ihre IP
                      ausschließlich mit der Erweiterung "_anonymizeIp()"
                      erfasst, die eine Anonymisierung der IP-Adresse durch
                      Kürzung sicherstellt und eine direkte
                      Personenbeziehbarkeit ausschließt. Nur in Ausnahmefällen
                      wird die volle IP-Adresse an einen Server von Google in
                      den USA übertragen und dort gekürzt, wobei sich Google dem
                      EU-US Privacy Shield unterworfen hat. In diesen
                      Ausnahmefällen erfolgt diese Verarbeitung gemäß Art. 6
                      Abs. 1 lit. f DSGVO. <br />
                      <br />Nähere Informationen findest Du in unserer{' '}
                      <a
                        href="https://www.psychologischenumerologie.eu/datenschutz/"
                        target="_blank"
                      >
                        Datenschutzerklärung.
                      </a>
                    </h6>
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
