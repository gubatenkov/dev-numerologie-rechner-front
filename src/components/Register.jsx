import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ToastNotifications from "cogo-toast";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useLocation, withRouter } from "react-router-dom";

import "../styles/Register.scss";
import "../styles/InputForm.css";

import Input from "./Input";
import Header from "./Header";
import Sidebar from "./SidebarD2";
import Typography from "./Typography";
import FooterHoriz from "./FooterHoriz";
import BaseBtn from "./Buttons/BaseBtn/BaseBtn";
import { useUser } from "../contexts/UserContext";
import useValidators from "../utils/useValidators";
import { setUserAuthData, postJsonData } from "../utils/AuthUtils";
// import { useLoadingOverlay } from "../contexts/LoadingOverlayContext";

const Placehoder = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  return (
    <div className="signup-placeholder">
      <Typography
        className="signup-placeholder__heading"
        as="h1"
        fs="32px"
        lh="40px"
        fw="900"
        color="#323232"
      >
        {t("REGISTER_FORM_TITLE_TEXT")}
      </Typography>

      <Typography
        className="signup-placeholder__text"
        as="p"
        fs="16px"
        lh="20px"
        fw="400"
        color="#313236"
      >
        {t("REGISTER_CONFIRM_TEXT")}
      </Typography>

      <BaseBtn
        className="blue-btn signup-placeholder__btn"
        type="button"
        onClick={handleClick}
      >
        {t("REGISTER_CONFIRM_BTN_TEXT")}
      </BaseBtn>
    </div>
  );
};

const Register = ({ history }) => {
  const User = useUser();
  const location = useLocation();
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);
  const [wasSubmited, setSubmited] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const {
    emailValidators,
    passwordValidators,
    password2Validators
  } = useValidators();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ mode: "onSubmit" });

  password2Validators.validate = value => {
    return value === watch("password", "") || t("PASSWORDS_DONT_MATCH");
  };

  // redirect to ./ if user already exist
  useEffect(() => {
    const email = localStorage.getItem("auth-email");
    if (email) {
      history.push("./");
    }
  }, [history]);

  const registerUser = async (email, password) => {
    setLoading(true);
    try {
      // LoadingOverlay.showWithText(t("REGISTRATING"));

      const response = await postJsonData("/register", {
        email,
        password,
        langId: User.currentLanguage.id
      });

      setUserAuthData({ email, token: response.token });
      await User.fetchUser();
      if (location?.search && location.search?.split("redirect=")?.length > 1) {
        const redirectTo = location.search.split("redirect=")[1];
        history.push(redirectTo);
      }
      setSubmited(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Reg failed:", error.message);
      if (error.message === "EMAIL_ALREADY_EXISTS") {
        ToastNotifications.error(t("EMAIL_ALREADY_EXISTS"), {
          position: "top-right"
        });
      } else {
        ToastNotifications.error(t("REGISTRATION_FAILED"), {
          position: "top-right"
        });
      }
    }
  };

  const onSubmit = data => {
    const email = data.email;
    const password = data.password;
    registerUser(email, password);
  };

  return (
    <div className="register">
      <Header
        isSidebarVisible={isSidebarVisible}
        onOpen={() => setSidebarVisible(true)}
        onClose={() => setSidebarVisible(false)}
      />
      <Sidebar isVisible={isSidebarVisible} />
      <div className="container">
        <div className="register-inner">
          {wasSubmited ? (
            <Placehoder />
          ) : (
            <>
              <div className="register-form-box">
                <form
                  className="register-form"
                  id="novalidatedform"
                  autoComplete="off"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="register-form__header">
                    <Typography
                      as="h1"
                      fs="32px"
                      lh="40px"
                      fw="900"
                      color="#323232"
                    >
                      {t("REGISTER_FORM_TITLE_TEXT")}
                    </Typography>
                  </div>
                  <div className="register-form__body">
                    <div className="register-form__group">
                      <Input
                        className="register-form__input"
                        type="email"
                        label={t("REGSITER_FORM_EMAIL_LABEL_TEXT")}
                        placeholder="primalvj3737@gmail.com"
                        register={() => register("email", emailValidators)}
                        message={errors.email && errors.email.message}
                      />
                    </div>
                    <div className="register-form__group">
                      <Input
                        className="register-form__input"
                        label={t("REGSITER_FORM_PASS_LABEL_TEXT")}
                        type="password"
                        placeholder="*********"
                        register={() =>
                          register("password", passwordValidators)
                        }
                        message={errors.password && errors.password.message}
                      />
                    </div>
                    <div className="register-form__group">
                      <Input
                        className="register-form__input"
                        label={t("REGSITER_FORM_CONFIRM_PASS_LABEL_TEXT")}
                        type="password"
                        placeholder="*********"
                        register={() =>
                          register("password2", password2Validators)
                        }
                        message={errors.password2 && errors.password2.message}
                      />
                    </div>
                    <div
                      className={`register-form__group register-form__group-agreement ${errors.checked &&
                        "error"}`}
                    >
                      <input
                        className="register-form__checkbox"
                        type="checkbox"
                        id="Sho"
                        {...register("checked", {
                          required: { value: true, message: "required" }
                        })}
                      />
                      <label htmlFor="Sho">
                        <Typography
                          as="p"
                          fs="14px"
                          lh="20px"
                          fw="400"
                          color="#323232"
                        >
                          {t("REGISTER_FORM_PRIVACY_TEXT")}
                        </Typography>
                      </label>
                    </div>
                    <BaseBtn
                      className="register-form__submit"
                      type="submit"
                      loading={isLoading}
                    >
                      {t("REGSITER_FORM_SUBMITBTN_TEXT")}
                    </BaseBtn>
                  </div>
                  <div className="register-form__footer">
                    <Typography
                      as={Link}
                      to="/login"
                      fs="16px"
                      lh="20px"
                      fw="500"
                      color="#01B2D4"
                    >
                      {t("REGISTER_FROM_LINK_TEXT")}
                    </Typography>
                  </div>
                </form>
                <div className="register-form-elements" />
              </div>
            </>
          )}
        </div>
      </div>
      <FooterHoriz />
    </div>
  );
};

export default withRouter(Register);
