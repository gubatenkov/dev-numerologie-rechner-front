import { useForm } from "react-hook-form";
import ToastNotifications from "cogo-toast";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";

import { useLoadingOverlay } from "../contexts/LoadingOverlayContext";

import FormBase from "./Forms/FormBase";
import logo from "../images/logo_weiss_trans.png";
import { useUser } from "../contexts/UserContext";
import { postJsonData } from "../utils/AuthUtils";
import useValidators from "../utils/useValidators";

const DELAY_REDIRECT_AFTER_SET = 3000;

const SetPassword = props => {
  const User = useUser();
  const { t } = useTranslation();
  const {
    history,
    match: {
      params: { token }
    }
  } = props;
  const LoadingOverlay = useLoadingOverlay();
  const [isReadyToSubmit, setReadyToSubmit] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues
  } = useForm({ mode: "all" });
  const { password, password2 } = getValues();
  const { passwordValidators, password2Validators } = useValidators();
  password2Validators.validate = value => {
    return value === watch("password", "") || t("PASSWORDS_DONT_MATCH");
  };

  // WORKAROUND: setting background of whole doc upon mount/unmount
  useEffect(() => {
    document.body.style.backgroundColor = "#00b3d4";

    return () => {
      document.body.style.backgroundColor = null;
    };
  });

  const setUserPassword = async password => {
    try {
      LoadingOverlay.showWithText(t("SETTING_PASSWORD"));

      await postJsonData("/set-password", {
        password,
        token,
        langId: User.currentLanguage.id
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

  useEffect(() => {
    // here we check is form ready to be submited
    function isFormReadyToSubmit(errors) {
      if (!errors?.password?.message && password === password2) {
        setReadyToSubmit(true);
      } else {
        setReadyToSubmit(false);
      }
    }
    isFormReadyToSubmit(errors);
  }, [errors, password, password2, getValues]);

  const onSubmit = data => setUserPassword(data.password);

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
              <FormBase
                id="novalidatedform"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
                noValidate
              >
                <FormBase.Title>Neues Passwort setzten</FormBase.Title>
                <FormBase.Divider />
                <FormBase.Input
                  placeholder={t("NEW_PASSWORD")}
                  name="password"
                  type="password"
                  label="New password"
                  register={() => register("password", passwordValidators)}
                  form="novalidatedform"
                  message={errors.password?.message}
                />
                <FormBase.Input
                  type="password"
                  label="Confirm password"
                  name="password2"
                  register={() => register("password2", password2Validators)}
                  message={errors.password2?.message}
                />
                <FormBase.Btn type="submit" disabled={!isReadyToSubmit}>
                  {t("SET_PASSWORD")}
                </FormBase.Btn>
                <FormBase.Divider />
              </FormBase>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SetPassword);
