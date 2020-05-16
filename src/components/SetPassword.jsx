import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import ToastNotifications from "cogo-toast";
import { useTranslation } from "react-i18next";
import { useLoadingOverlay } from "../contexts/LoadingOverlayContext";
import { postJsonData } from "../utils/AuthUtils";

import Panel from "./Panel";
import InputField from "./InputField";

import logo from "../images/logo_weiss_trans.png";

const DELAY_REDIRECT_AFTER_SET = 3000;

const SetPassword = props => {
  const { t } = useTranslation();

  const {
    history,
    match: {
      params: { token }
    }
  } = props;

  const [password, setPassword] = useState("");
  const LoadingOverlay = useLoadingOverlay();

  // WORKAROUND: setting background of whole doc upon mount/unmount
  useEffect(() => {
    document.body.style.backgroundColor = "#00b3d4";

    return () => {
      document.body.style.backgroundColor = null;
    };
  });

  const setUserPassword = async () => {
    try {
      LoadingOverlay.showWithText(t("SETTING_PASSWORD"));

      await postJsonData("/set-password", {
        password,
        token
      });

      LoadingOverlay.hide();

      ToastNotifications.success(t("SET_PASSWORD_SUCCESSFULLY"), {
        position: "top-right"
      });

      setTimeout(() => history.push("/logIn"), DELAY_REDIRECT_AFTER_SET);
    } catch (error) {
      LoadingOverlay.hide();
      ToastNotifications.error(t("SET_PASSWORD_FAILED"), {
        position: "top-right"
      });
    }
  };

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
                    fieldName={t("NEW_PASSWORD")}
                    onChange={event => setPassword(event.target.value)}
                  />
                </form>
                <button
                  className="btn btn-primary btn-block"
                  onClick={setUserPassword}
                  type="submit"
                >
                  {t("SET_PASSWORD")}
                </button>
                <div className="InputForm__options">
                  <Link to="/login">
                    <h6>{t("SIGN_IN")}</h6>
                  </Link>
                  <Link to="/register">
                    <h6>{t("REGISTER")}</h6>
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
