import React, { useState, useEffect } from 'react';

import { Link, withRouter } from 'react-router-dom';

import ToastNotifications from 'cogo-toast';
import Panel from './Panel';
import InputField from './InputField';

import logo from '../logo.png';

import LoadingIndicator from './LoadingIndicator';
import { setUserAuthData, postJsonData } from '../utils/AuthUtils';

import '../styles/InputForm.css';
import '../styles/Register.css';

const Register = (props) => {
  // getting props
  const { history } = props;

  // getting state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  // WORKAROUND: setting background of whole doc upon mount/unmount
  useEffect(() => {
    // setting background dynamically
    document.body.style.backgroundColor = '#00b3d4';

    return () => {
      // resetting background dynamically
      document.body.style.backgroundColor = null;
    };
  });

  // register a user with the server
  const registerUser = async () => {
    // sending request to server
    try {
      // setting loading state
      setLoading(true);

      // making request to server
      const response = await postJsonData('/register', {
        email,
        password,
      });

      // saving received token
      setUserAuthData({ email, token: response.token });

      // redirecting to user home
      history.push('/userHome');
    } catch (error) {
      // hiding loading indicator
      setLoading(false);

      // showing error message
      ToastNotifications.error(
        error.message
          || 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.',
        { position: 'top-right' },
      );
    }
  };

  // returning loading indicator if loading
  if (loading) {
    return <LoadingIndicator text="Registriere..." />;
  }

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
                  onChange={(event) => setEmail(event.target.value)}
                />
                <InputField
                  type="password"
                  icon="wb-lock"
                  fieldName="Passwort"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <div className="Register__checkbox">
                  <input
                    type="checkbox"
                    onChange={(event) => setReadyToSubmit(event.target.checked)}
                  />
                  <h6>
                    Ja, ich habe die
                    {' '}
                    <a
                      href="https://www.psychologischenumerologie.eu/datenschutz/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Datenschutzerklärung
                    </a>
                    {' '}
                    inkl. den Datenschutz-Hinweisen anbei unten, die
                    {' '}
                    <a
                      href="https://www.psychologischenumerologie.eu/nutzungsbedingungen/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Nutzungsbedingungen
                    </a>
                    {' '}
                    und die
                    {' '}
                    <a
                      href="https://www.psychologischenumerologie.eu/agb/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      AGBs
                    </a>
                    {' '}
                    gelesen und erkläre mich damit ausdrücklich einverstanden.
                  </h6>
                </div>
                <button
                  className="btn btn-primary btn-block"
                  disabled={!readyToSubmit}
                  type="submit"
                  onClick={registerUser}
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
                    <br />
                    <b>Datenschutz-Hinweis:</b>
                    {' '}
                    <br />
                    Für den Service des Psychologische Numerologie Rechners
                    nutzen wir den Hosting Server Heroku. Heroku ist eine
                    Tochtergesellschaft der salesforce.com (USA). Heroku
                    speichert bei der Nutzung Server-Logfiles. Bei der
                    Registrierung zum Rechner wird Ihre Email-Adresse für die
                    Account-Erstellung bei Heroku gespeichert. Sie erhalten von
                    uns eine Bestätigungsemail mit Link, den Sie anklicken
                    müssen, um die Registrierung abzuschließen (Double-opt in).
                    Dies stellt sicher, dass niemand anderer außer Ihnen Ihre
                    Email-Adresse zur Account-Erstellung verwendet. Ihre im Zuge
                    der Nutzung eingegebenen Daten wie Vorname, Nachname,
                    Geburtsdatum werden ebenfalls in Ihrem Account auf Heroku
                    gespeichert. Dies alles geschieht nur solange sie den
                    Service aktiv nutzen und Ihren Account nicht selbst löschen.
                    Nach einer Inaktivität von 2 Jahren werden Ihr Account und
                    alle Ihre eingegebenen Daten automatisch gelöscht. Um eine
                    unbeabsichtigte Löschung zu vermeiden, erhalten Sie von uns
                    vor der Löschung eine Hinweis-Email dazu. Diese Verarbeitung
                    erfolgt gemäß Art. 6 Abs. 1 lit. b DSGVO zur
                    Vertragserfüllung unseres Services.
                    <br />
                    <br />
                    {' '}
                    <b>
                      Sie dürfen die obigen personenbezogenen Daten von anderen
                      Menschen in den Psychologische Numerologie Rechner nur
                      dann eingeben, wenn Sie deren ausdrückliche Zustimmung
                      vorher eingeholt haben.
                    </b>
                    {' '}
                    <br />
                    <br />
                    Die von Heroku bereitgestellten Server und Datenbanken
                    stehen in Deutschland/Europa und unterliegen den
                    europäischen Datenschutzbestimmungen. Für den Fall, dass
                    personenbezogene Daten in die USA übertragen werden, haben
                    sich Heroku und Salesforce dem EU-US Privacy Shield
                    unterworfen.
                    {' '}
                    <br />
                    <br />
                    Die Webseiten des Psychologische Numerologie Rechners nutzen
                    die Funktionen des Webanalysedienstes Google Analytics der
                    Google LLC (USA). Dabei wird Ihre IP ausschließlich mit der
                    Erweiterung _anonymizeIp() erfasst, die eine Anonymisierung
                    der IP-Adresse durch Kürzung sicherstellt und eine direkte
                    Personenbeziehbarkeit ausschließt. Nur in Ausnahmefällen
                    wird die volle IP-Adresse an einen Server von Google in den
                    USA übertragen und dort gekürzt, wobei sich Google dem EU-US
                    Privacy Shield unterworfen hat. In diesen Ausnahmefällen
                    erfolgt diese Verarbeitung gemäß Art. 6 Abs. 1 lit. f DSGVO.
                    {' '}
                    <br />
                    <br />
                    Nähere Informationen findest Du in unserer
                    {' '}
                    <a
                      href="https://www.psychologischenumerologie.eu/datenschutz/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Datenschutzerklärung.
                    </a>
                  </h6>
                </div>
              </Panel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
