import React, { useState, useEffect } from "react";

import { Link, withRouter } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import ToastNotifications from "cogo-toast";
import Panel from "./Panel";
import InputField from "./InputField";

import logo from "../images/logo_weiss_trans.png";

import LoadingIndicator from "./LoadingIndicator";
import { setUserAuthData, postJsonData } from "../utils/AuthUtils";
import { useUser } from "../contexts/UserContext";
import "../styles/InputForm.css";
import "../styles/Register.css";

const Register = props => {
  const { history } = props;
  const User = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  // WORKAROUND: setting background of whole doc upon mount/unmount
  useEffect(() => {
    document.body.style.backgroundColor = "#00b3d4";

    return () => {
      document.body.style.backgroundColor = null;
    };
  });

  const registerUser = async () => {
    try {
      setLoading(true);

      const response = await postJsonData("/register", {
        email,
        password
      });

      setUserAuthData({ email, token: response.token });
      await User.fetchUser();
      history.push("/userHome");
    } catch (error) {
      setLoading(false);
      console.log("Reg failed:", error.message);
      ToastNotifications.error(t("REGISTRATION_FAILED"), {
        position: "top-right"
      });
    }
  };

  if (loading) {
    return <LoadingIndicator text={t("REGISTRATING")} />;
  }

  return (
    <div className="page-register-v3 layout-full">
      <div className="page vertical-align">
        <div className="page-content">
          <div className="text-center">
            <a href={t("HOMEPAGE")}>
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
              <Panel title={t("REGISTER")}>
                <InputField
                  icon="wb-user"
                  fieldName={t("EMAIL")}
                  onChange={event => setEmail(event.target.value)}
                />
                <InputField
                  type="password"
                  icon="wb-lock"
                  fieldName={t("PASSWORD")}
                  onChange={event => setPassword(event.target.value)}
                />
                <div className="Register__checkbox">
                  <input
                    type="checkbox"
                    onChange={event => setReadyToSubmit(event.target.checked)}
                  />
                  <h6>
                    <Trans i18nKey="PRIVACY_POLICY_AGREE">
                      Ja, ich habe die{" "}
                      <a
                        href="https://www.psychologischenumerologie.eu/datenschutz/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Datenschutzerklärung
                      </a>{" "}
                      inkl. den Datenschutz-Hinweisen anbei unten, die{" "}
                      <a
                        href="https://www.psychologischenumerologie.eu/nutzungsbedingungen/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Nutzungsbedingungen
                      </a>{" "}
                      und die{" "}
                      <a
                        href="https://www.psychologischenumerologie.eu/agb/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        AGBs
                      </a>{" "}
                      gelesen und erkläre mich damit ausdrücklich einverstanden.
                    </Trans>
                  </h6>
                </div>
                <button
                  className="btn btn-primary btn-block"
                  disabled={!readyToSubmit}
                  type="submit"
                  onClick={registerUser}
                >
                  {t("REGISTER")}
                </button>
                <div className="InputForm__options">
                  <Link to="/reset">
                    <h6>{t("PASSWORD_RESET")}</h6>
                  </Link>
                  <Link to="/login">
                    <h6>{t("SIGN_IN")}</h6>
                  </Link>
                  <h6>
                    <br />
                    <b>{t("PRIVACY_POLICY_HINT")}</b> <br />
                    {t("PRIVACY_POLICY_CONTENT")}
                    <br />
                    <br /> <b>{t("PRIVACY_POLICY_CONTENT_2")}</b> <br />
                    <br />
                    {t("PRIVACY_POLICY_CONTENT_3")} <br />
                    <br />
                    {t("PRIVACY_POLICY_CONTENT_4")} <br />
                    <br />
                    <Trans i18nKey="PRIVACY_POLICY_MORE_INFOS">
                      Nähere Informationen findest Du in unserer{" "}
                      <a
                        href="https://www.psychologischenumerologie.eu/datenschutz/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Datenschutzerklärung.
                      </a>
                    </Trans>
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
