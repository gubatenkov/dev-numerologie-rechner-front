import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import ToastNotifications from "cogo-toast";

import LoadingIndicator from "./LoadingIndicator";
import { setUserAuthData, postJsonData } from "../utils/AuthUtils";

import Panel from "./Panel";
import InputField from "./InputField";

import logo from "../images/logo_weiss_trans.png";

// delay after which the user is redirected upon successfully setting password
const DELAY_REDIRECT_AFTER_SET = 3000;

// setter for the new password upon rest
const SetPassword = props => {
  // getting props
  const { history } = props;
  const { token } = props.match.params;

  // creating state
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // WORKAROUND: setting background of whole doc upon mount/unmount
  useEffect(() => {
    // setting background dynamically
    document.body.style.backgroundColor = "#00b3d4";

    return () => {
      // resetting background dynamically
      document.body.style.backgroundColor = null;
    };
  });

  const setUserPassword = async () => {
    // sending request to server
    try {
      // setting loading indicator
      setLoading(true);

      // making call to server to set password
      const response = await postJsonData("/set-password", {
        password,
        token
      });

      // saving received token in response
      setUserAuthData({
        email: response.email,
        token: response.token
      });

      // informing user
      ToastNotifications.success(
        "Das neues Passwort wurde erfolgreich gesetzt. Sie werden nun automatisch angemeldet.",
        { position: "top-right" }
      );

      // redirecting to user home
      setTimeout(() => history.push("/userHome"), DELAY_REDIRECT_AFTER_SET);
    } catch (error) {
      ToastNotifications.error(
        "Setzen des Passworts fehlgeschlagen. Bitte versuchen Sie es erneut.",
        { position: "top-right" }
      );
    } finally {
      setLoading(false);
    }
  };

  // returning loading indicator if loading
  if (loading) {
    return <LoadingIndicator text="Setze Passwort..." />;
  }

  // returning form
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
                <form>
                  <InputField
                    type="password"
                    icon="wb-lock"
                    fieldName="Neues Password"
                    onChange={event => setPassword(event.target.value)}
                  />
                </form>
                <button
                  className="btn btn-primary btn-block"
                  onClick={setUserPassword}
                  type="submit"
                >
                  Passwort setzen
                </button>
                <div className="InputForm__options">
                  <Link to="/login">
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
    </div>
  );
};

export default withRouter(SetPassword);
