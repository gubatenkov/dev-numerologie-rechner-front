import styled from "styled-components";
import { useForm } from "react-hook-form";
import ToastNotifications from "cogo-toast";
import React, { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link, useLocation, withRouter } from "react-router-dom";

import logo from "../images/logo_weiss_trans.png";

import "../styles/Register.css";
import "../styles/InputForm.css";

import FormBase from "./Forms/FormBase";
import { useUser } from "../contexts/UserContext";
import useValidators from "../utils/useValidators";
import { setUserAuthData, postJsonData } from "../utils/AuthUtils";
import { useLoadingOverlay } from "../contexts/LoadingOverlayContext";

const StyledSpan = styled.span`
  color: #007bff;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Register = ({ history }) => {
  const User = useUser();
  const location = useLocation();
  const { t } = useTranslation();
  const LoadingOverlay = useLoadingOverlay();
  const [
    emailValidators,
    passwordValidators,
    password2Validators
  ] = useValidators();
  const [isPrivacyChecked, setPrivacyChecked] = useState(false);
  const [isReadyToSubmit, setReadyToSubmit] = useState(false);
  const [isTermsPopupOpen, setTermsPopupOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues
  } = useForm({ mode: "all" });
  const formValues = getValues();
  password2Validators.validate = value => {
    return value === watch("password", "") || t("PASSWORDS_DONT_MATCH");
  };

  // redirect if user already exist
  useEffect(() => {
    const email = localStorage.getItem("auth-email");
    if (email) {
      history.push("./");
    }
  }, [history]);

  useEffect(() => {
    // here we check is form ready to be submited
    function isFormReadyToSubmit(isPrivacyChecked, errors) {
      const { email, password, password2 } = getValues();
      if (
        email &&
        password &&
        !errors?.email?.message &&
        !errors?.password?.message &&
        password === password2 &&
        isPrivacyChecked
      ) {
        setReadyToSubmit(true);
      } else {
        setReadyToSubmit(false);
      }
    }
    isFormReadyToSubmit(isPrivacyChecked, errors);
  }, [
    errors,
    isPrivacyChecked,
    formValues.email,
    formValues.password,
    formValues.password2,
    getValues
  ]);

  // WORKAROUND: setting background of whole doc upon mount/unmount
  useEffect(() => {
    document.body.style.backgroundColor = "#00b3d4";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

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
      ToastNotifications.error(t("REGISTRATION_FAILED"), {
        position: "top-right"
      });
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
          <div className="form-wrap">
            <FormBase
              id="novalidatedform"
              onSubmit={handleSubmit(onSubmit)}
              autocomplete="off"
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
                </a>
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
      </div>
    </div>
  );
};

function TermsPopup({ close }) {
  const { t } = useTranslation();
  const StyledDiv = styled.div`
    top: 50%;
    left: 50%;
    width: 100%;
    max-width: 500px;
    padding: 10px 20px 20px;
    height: 500px;
    color: #000;
    font-size: 13px;
    overflow: hidden;
    background: #fff;
    position: absolute;
    border-radius: 10px;
    transform: translate(-50%, -30%);
    z-index: 100;
  `;

  const StyledSpan = styled.span`
    margin: 0 0 10px auto;
    display: flex;
    width: 25px;
    height: 25px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid #000;
    cursor: pointer;
  `;

  useEffect(() => {
    const div = document.createElement("div");
    div.addEventListener("click", () => close());
    div.classList.add("backdrop");
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.left = "0";
    div.style.right = "0";
    div.style.bottom = "0";
    div.style.background = "rgba(0, 0, 0, 0.5)";
    div.style.zIndex = "10";
    document.body.appendChild(div);

    return () => {
      document.querySelector(".backdrop").remove();
    };
  }, [close]);

  return (
    <StyledDiv>
      <StyledSpan onClick={close}>X</StyledSpan>
      <div style={{ overflowY: "auto", height: "100%" }}>
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
      </div>
    </StyledDiv>
  );
}

export default withRouter(Register);
