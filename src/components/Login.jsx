import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import ToastNotifications from "cogo-toast";
import { useTranslation } from "react-i18next";
import Panel from "./Panel";
import InputField from "./InputField";
import { useLoadingOverlay } from "../contexts/LoadingOverlayContext";

import { setUserAuthData, postJsonData } from "../utils/AuthUtils";
import "../styles/InputForm.css";
import "../styles/Login.css";
import { useUser } from "../contexts/UserContext";

const Login = props => {
  const { t } = useTranslation();
  const LoadingOverlay = useLoadingOverlay();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { fetchUser } = useUser();
  const loginUser = async () => {
    const { history } = props;
    try {
      LoadingOverlay.showWithText(t("SIGNING_IN"));

      const response = await postJsonData("/login", {
        email,
        password
      });

      setUserAuthData({
        email,
        token: response.token
      });
      await fetchUser();
      history.push("/userHome");
    } catch (error) {
      ToastNotifications.error(t("LOGIN_FAILED"), { position: "top-right" });
    } finally {
      LoadingOverlay.hide();
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#00b3d4";

    return () => {
      document.body.style.backgroundColor = null;
    };
  });

  return (
    <div className="page-register-v3 layout-full">
      <div className="page vertical-align">
        <div className="page-content">
          <div
            className="text-center"
            style={{ padding: `${50}px`, color: "white" }}
          >
            <h1 className="Login__title">{t("NUM_CALCULATOR")}</h1>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-lg-4">
              <Panel title={t("SIGN_IN")}>
                <form>
                  <InputField
                    icon="wb-user"
                    fieldName={t("EMAIL")}
                    onChange={event => setEmail(event.target.value)}
                    autoComplete="username"
                  />
                  <InputField
                    type="password"
                    icon="wb-lock"
                    fieldName={t("PASSWORD")}
                    onChange={event => setPassword(event.target.value)}
                    autoComplete="current-password"
                  />
                </form>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={loginUser}
                >
                  {t("SIGN_IN")}
                </button>
                <div className="InputForm__options">
                  <Link to="/reset">
                    <h6>{t("RESET_PASSWORD")}</h6>
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

export default withRouter(Login);
