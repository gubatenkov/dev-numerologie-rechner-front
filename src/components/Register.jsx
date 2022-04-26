import styled from "styled-components";
import { useForm } from "react-hook-form";
import ToastNotifications from "cogo-toast";
import React, { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link, useLocation, withRouter } from "react-router-dom";

import logo from "../images/logo_weiss_trans.png";

import "../styles/Register.scss";
import "../styles/InputForm.css";

import FormBase from "./Forms/FormBase";
import { useUser } from "../contexts/UserContext";
import useValidators from "../utils/useValidators";
import { setUserAuthData, postJsonData } from "../utils/AuthUtils";
import { useLoadingOverlay } from "../contexts/LoadingOverlayContext";
import closeIcon from "../images/icon_close_primary.svg";
import Typography from "./Typography";
import Input from "./Input";
import Header from "./Header";
import BaseBtn from "./Buttons/BaseBtn/BaseBtn";
import FooterHoriz from "./FooterHoriz";

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
      {/* <div className="page vertical-align">
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
          <div className="form-wrap">
            <FormBase
            onSubmit={handleSubmit(onSubmit)}
            id="novalidatedform"
              autoComplete="off"
              noValidate
            >
              <FormBase.Title>{t("REGISTER")}</FormBase.Title>
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
              <FormBase.Input
                placeholder={t("MIN_8_LETTERS")}
                type="password"
                label="Password"
                name="password"
                register={() => register("password", passwordValidators)}
                message={errors.password?.message}
              />
              <FormBase.Input
                type="password"
                label="Confirm password"
                name="password2"
                register={() => register("password2", password2Validators)}
                message={errors.password2?.message}
              />
              <FormBase.TextCheckbox
                onChange={() => setPrivacyChecked(prev => !prev)}
              >
                {t("I_HAVE_READ_AND_AGREE")}{" "}
                <StyledSpan onClick={() => setTermsPopupOpen(true)}>
                  {t("TERMS")}
                </StyledSpan>{" "}
                {t("AND")}{" "}
                <a
                  href="https://www.psychologischenumerologie.eu/datenschutz/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("PRIVACY_POLICY")}
                </a>{" "}
                {t("I_AGREE")}
              </FormBase.TextCheckbox>
              <FormBase.Btn type="submit" disabled={!isReadyToSubmit}>
                {t("REGISTER")}
              </FormBase.Btn>
              <FormBase.Divider />
              <FormBase.Text style={{ marginBottom: "10px" }}>
                {t("HAVE_ACCOUNT?")}
              </FormBase.Text>
              <FormBase.Text>
                <Link to="/login">{t("SIGN_IN")}</Link>
              </FormBase.Text>
            </FormBase>
          </div>
          {isTermsPopupOpen && (
            <TermsPopup close={() => setTermsPopupOpen(false)} />
          )}
        </div>
      </div> */}
    </div>
  );
};

// function TermsPopup({ close }) {
//   const { t } = useTranslation();
//   const StyledDiv = styled.div`
//     top: 50vh;
//     left: 50vw;
//     width: 90vw;
//     max-width: 500px;
//     padding: 10px 20px 20px;
//     height: 500px;
//     color: #000;
//     font-size: 13px;
//     overflow: hidden;
//     background: #fff;
//     position: absolute;
//     border-radius: 10px;
//     transform: translate(-50%, -50%);
//     z-index: 100;
//   `;

//   const StyledSpan = styled.span`
//     margin: 0 0 10px auto;
//     display: flex;
//     width: 25px;
//     height: 25px;
//     align-items: center;
//     justify-content: center;

//     cursor: pointer;
//   `;

//   useEffect(() => {
//     const div = document.createElement("div");
//     div.addEventListener("click", () => close());
//     div.classList.add("backdrop");
//     div.style.position = "fixed";
//     div.style.top = "0";
//     div.style.left = "0";
//     div.style.right = "0";
//     div.style.bottom = "0";
//     div.style.background = "rgba(0, 0, 0, 0.5)";
//     div.style.zIndex = "10";
//     document.body.appendChild(div);

//     return () => {
//       document.querySelector(".backdrop").remove();
//     };
//   }, [close]);

//   return (
//     <StyledDiv>
//       <StyledSpan onClick={close}>
//         <img src={closeIcon} alt="close icon" />
//       </StyledSpan>
//       <div style={{ overflowY: "auto", height: "400px", margin: "20px 0" }}>
//         <br />
//         <b>{t("PRIVACY_POLICY_HINT")}</b> <br />
//         {t("PRIVACY_POLICY_CONTENT")}
//         <br />
//         <br /> <b>{t("PRIVACY_POLICY_CONTENT_2")}</b> <br />
//         <br />
//         {t("PRIVACY_POLICY_CONTENT_3")} <br />
//         <br />
//         {t("PRIVACY_POLICY_CONTENT_4")} <br />
//         <br />
//         <Trans i18nKey="PRIVACY_POLICY_MORE_INFOS">
//           Nähere Informationen findest Du in unserer{" "}
//           <a
//             href="https://www.psychologischenumerologie.eu/datenschutz/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Datenschutzerklärung.
//           </a>
//         </Trans>
//       </div>
//     </StyledDiv>
//   );
// }

export default withRouter(Register);
