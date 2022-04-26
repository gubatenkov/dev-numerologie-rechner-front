import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import ToastNotifications from "cogo-toast";
import { useTranslation } from "react-i18next";
import { Link, useLocation, withRouter } from "react-router-dom";

import "../styles/Register.scss";
import "../styles/InputForm.css";

import Input from "./Input";
import Header from "./Header";
import Typography from "./Typography";
import FooterHoriz from "./FooterHoriz";
import BaseBtn from "./Buttons/BaseBtn/BaseBtn";
import { useUser } from "../contexts/UserContext";
import useValidators from "../utils/useValidators";
import { setUserAuthData, postJsonData } from "../utils/AuthUtils";
import { useLoadingOverlay } from "../contexts/LoadingOverlayContext";

const Register = ({ history }) => {
  const User = useUser();
  const location = useLocation();
  const { t } = useTranslation();
  const LoadingOverlay = useLoadingOverlay();
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
    try {
      LoadingOverlay.showWithText(t("REGISTRATING"));

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
      } else {
        history.push("/userHome");
      }
    } catch (error) {
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
    } finally {
      LoadingOverlay.hide();
    }
  };

  const onSubmit = data => {
    const email = data.email;
    const password = data.password;
    registerUser(email, password);
  };

  return (
    <div className="register">
      <Header />
      <div className="container">
        <div className="register-inner">
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
                  Sign up
                </Typography>
              </div>
              <div className="register-form__body">
                <div className="register-form__group">
                  <Input
                    className="register-form__input"
                    type="email"
                    label="Email"
                    placeholder="primalvj3737@gmail.com"
                    register={() => register("email", emailValidators)}
                    message={errors.email && errors.email.message}
                  />
                </div>
                <div className="register-form__group">
                  <Input
                    className="register-form__input"
                    label="Password"
                    type="password"
                    placeholder="*********"
                    register={() => register("password", passwordValidators)}
                    message={errors.password && errors.password.message}
                  />
                </div>
                <div className="register-form__group">
                  <Input
                    className="register-form__input"
                    label="Confirm password"
                    type="password"
                    placeholder="*********"
                    register={() => register("password2", password2Validators)}
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
                      Yes, I have read the data protection statement, including
                      the following data protection information, terms of use
                      and general terms and conditions, and I expressly agree to
                      them.
                    </Typography>
                  </label>
                </div>
                <BaseBtn className="register-form__submit" type="submit">
                  Sign Up
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
                  Already have an account
                </Typography>
              </div>
            </form>
            <div className="register-form-elements" />
          </div>
        </div>
      </div>
      <FooterHoriz />
    </div>
  );
};

export default withRouter(Register);
