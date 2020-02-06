import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import ToastNotifications from "cogo-toast";

import Panel from "./Panel";
import InputField from "./InputField";
import LoadingIndicator from "./LoadingIndicator";

import { setUserAuthData, postJsonData } from "../utils/AuthUtils";
import "../styles/InputForm.css";
import "../styles/Login.css";

// Login form component
const Login = props => {
  // email and password state variable
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    // getting react router history from props
    const { history } = props;

    // sending request to server
    try {
      // setting loading indication
      setLoading(true);

      // making actual request
      const response = await postJsonData("/login", {
        email,
        password
      });

      // saving received token
      setUserAuthData({
        email,
        token: response.token
      });

      // redirecting to user home
      history.push("/userHome");
    } catch (error) {
      // resetting loading indication
      setLoading(false);
      ToastNotifications.error(
        "Login fehlgeschlagen. Bitte versuchen Sie es erneut.",
        { position: "top-right" }
      );
    }
  };

  // WORKAROUND: setting background of whole doc upon mount/unmount
  useEffect(() => {
    // setting background dynamically
    document.body.style.backgroundColor = "#00b3d4";

    return () => {
      // resetting background dynamically
      document.body.style.backgroundColor = null;
    };
  });

  // if loading => Showing indicator to user
  if (loading) {
    return <LoadingIndicator text="Anmeldung..." />;
  }

  // returning login form
  return (
    <div className="page-register-v3 layout-full">
      <div className="page vertical-align">
        <div className="page-content">
          <div
            className="text-center"
            style={{ padding: `${50}px`, color: "white" }}
          >
            <h1 className="Login__title">Psychologische Numerologie Rechner</h1>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-lg-4">
              <Panel title="Anmelden">
                <form>
                  <InputField
                    icon="wb-user"
                    fieldName="Email-Adresse"
                    onChange={event => setEmail(event.target.value)}
                    autoComplete="username"
                  />
                  <InputField
                    type="password"
                    icon="wb-lock"
                    fieldName="Passwort"
                    onChange={event => setPassword(event.target.value)}
                    autoComplete="current-password"
                  />
                </form>
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
