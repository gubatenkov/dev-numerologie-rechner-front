import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import ToastNotifications from "cogo-toast";
import { useLoadingOverlay } from "../contexts/LoadingOverlayContext";
import { useTranslation } from "react-i18next";
import { useUser } from "../contexts/UserContext";
import { postJsonData } from "../utils/AuthUtils";

import Panel from "./Panel";
import InputField from "./InputField";

import logo from "../images/logo_weiss_trans.png";
import "../styles/InputForm.css";

const DELAY_REDIRECT_AFTER_RESET = 3000;

const ResetPassword = props => {
  const { t } = useTranslation();
  const { history } = props;
  const LoadingOverlay = useLoadingOverlay();
  const [email, setEmail] = useState("");
  const User = useUser();

  // WORKAROUND: setting background of whole doc upon mount/unmount
  useEffect(() => {
    document.body.style.backgroundColor = "#00b3d4";

    return () => {
      document.body.style.backgroundColor = null;
    };
  });

  const resetPassword = async () => {
    try {
      LoadingOverlay.showWithText(t("SEND_EMAIL"));
      console.log(User.currentLanguage.id);
      await postJsonData("/reset-password", {
        email,
        langId: User.currentLanguage.id
      });
      LoadingOverlay.hide();
      ToastNotifications.success(t("EMAIL_WAS_SENT"), {
        position: "top-right"
      });

      // redirecting to login page after delay
      setTimeout(() => {
        if (
          history.location?.search &&
          history.location.search?.split("redirect=")?.length > 1
        ) {
          const redirectTo = history.location.search.split("redirect=")[1];
          history.push(`/login?redirect=${redirectTo}`);
        } else {
          history.push("/login");
        }
      }, DELAY_REDIRECT_AFTER_RESET);
    } catch (error) {
      LoadingOverlay.hide();
      ToastNotifications.error(t("RESET_FAILED"), { position: "top-right" });
    }
  };

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
              <Panel title={t("PASSWORD_RESET")}>
                <InputField
                  icon="wb-user"
                  fieldName={t("EMAIL")}
                  onChange={event => setEmail(event.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={resetPassword}
                >
                  {t("PASSWORD_RESET")}
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

export default withRouter(ResetPassword);
