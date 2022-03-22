import { useForm } from "react-hook-form";
import ToastNotifications from "cogo-toast";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";

import { useUser } from "../contexts/UserContext";
import { postJsonData } from "../utils/AuthUtils";
import { useLoadingOverlay } from "../contexts/LoadingOverlayContext";

import "../styles/InputForm.css";

import FormBase from "./Forms/FormBase";
import logo from "../images/logo_weiss_trans.png";
import useValidators from "../utils/useValidators";
import { getErrMessageFromString } from "../utils/functions";

const DELAY_REDIRECT_AFTER_RESET = 3000;

const ResetPassword = props => {
  const User = useUser();
  const { history } = props;
  const { t } = useTranslation();
  const LoadingOverlay = useLoadingOverlay();
  const [isReadyToSubmit, setReadyToSubmit] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({ mode: "all" });
  const { email } = getValues();
  const { emailValidators } = useValidators();

  // WORKAROUND: setting background of whole doc upon mount/unmount
  useEffect(() => {
    document.body.style.backgroundColor = "#00b3d4";

    return () => {
      document.body.style.backgroundColor = null;
    };
  });

  const resetPassword = async email => {
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
      const msg = getErrMessageFromString(error.message);
      if (msg) {
        ToastNotifications.error(msg, { position: "top-right" });
      } else {
        ToastNotifications.error(t("RESET_FAILED"), { position: "top-right" });
      }
    }
  };

  useEffect(() => {
    // here we check is form ready to be submited
    function isFormReadyToSubmit(errors) {
      if (!errors?.email?.message) {
        setReadyToSubmit(true);
      } else {
        setReadyToSubmit(false);
      }
    }
    isFormReadyToSubmit(errors);
  }, [errors, email, getValues]);

  const onSubmit = data => resetPassword(data.email);

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
              <FormBase
                id="novalidatedform"
                onSubmit={handleSubmit(onSubmit)}
                autocomplete="off"
                noValidate
              >
                <FormBase.Title>{t("PASSWORD_RESET")}</FormBase.Title>
                <FormBase.Divider />
                <FormBase.Input
                  placeholder="example@mail.com"
                  name="email"
                  type="email"
                  label="Email"
                  register={() => register("email", emailValidators)}
                  form="novalidatedform"
                  message={errors.email?.message}
                />
                <FormBase.Btn type="submit" disabled={!isReadyToSubmit}>
                  {t("PASSWORD_RESET")}
                </FormBase.Btn>
                <FormBase.Divider />
                <FormBase.Text style={{ marginBottom: "10px" }}>
                  <Link to="/login">{t("SIGN_IN")}</Link>
                </FormBase.Text>
              </FormBase>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ResetPassword);
