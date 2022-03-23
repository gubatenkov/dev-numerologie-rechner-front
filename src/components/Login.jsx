import styled from "styled-components";
import { useForm } from "react-hook-form";
import ToastNotifications from "cogo-toast";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Link, useLocation, withRouter } from "react-router-dom";

import { useLoadingOverlay } from "../contexts/LoadingOverlayContext";

import "../styles/Login.css";
import "../styles/InputForm.css";

import FormBase from "./Forms/FormBase";
import { useUser } from "../contexts/UserContext";
import logo from "../images/logo_weiss_trans.png";
import useValidators from "../utils/useValidators";
import { setUserAuthData, postJsonData } from "../utils/AuthUtils";

const StyledSpan = styled.span`
  margin: 0 0 15px 0;
  display: inline-block;
  font-size: 13px;
  :hover {
    text-decoration: underline;
  }
`;

const Login = props => {
  const { t } = useTranslation();
  const location = useLocation();
  const LoadingOverlay = useLoadingOverlay();
  const { fetchUser, currentLanguage } = useUser();
  const [isReadyToSubmit, setReadyToSubmit] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({ mode: "all" });
  const { email, password } = getValues();
  const { emailValidators, passwordValidators } = useValidators();

  const loginUser = async (email, password) => {
    const { history } = props;
    try {
      LoadingOverlay.showWithText(t("SIGNING_IN"));

      const response = await postJsonData("/login", {
        email,
        password,
        langId: currentLanguage.id
      });

      setUserAuthData({
        email,
        token: response.token
      });
      await fetchUser();
      if (location?.search && location.search?.split("redirect=")?.length > 1) {
        const redirectTo = location.search.split("redirect=")[1];
        history.push(redirectTo);
      } else {
        history.push("/userHome");
      }
    } catch (error) {
      ToastNotifications.error(t("LOGIN_FAILED"), { position: "top-right" });
    } finally {
      LoadingOverlay.hide();
    }
  };

  // if user exist redirect him to ./
  useEffect(() => {
    const email = localStorage.getItem("auth-email");
    if (email) {
      props.history.push("./");
    }
  }, [props.history]);

  useEffect(() => {
    document.body.style.backgroundColor = "#00b3d4";
    return () => (document.body.style.backgroundColor = null);
  });

  const handleRedirect = () => {
    if (location.search?.split("redirect=")?.length > 1) {
      return `?redirect=${decodeURI(location.search.split("redirect=")[1])}`;
    }
    return "";
  };

  useEffect(() => {
    // here we check is form ready to be submited
    function isFormReadyToSubmit(errors) {
      if (!errors?.email?.message && !errors?.password?.message) {
        setReadyToSubmit(true);
      } else {
        setReadyToSubmit(false);
      }
    }
    isFormReadyToSubmit(errors);
  }, [errors, email, password, getValues]);

  const onSubmit = data => loginUser(data.email, data.password);

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
              <FormBase.Title>{t("SIGN_IN")}</FormBase.Title>
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
                type="password"
                label="Password"
                name="password"
                register={() => register("password", passwordValidators)}
                message={errors.password?.message}
              />
              <Link to={() => `/reset${handleRedirect()}`}>
                <StyledSpan>{t("RESET_PASSWORD")}</StyledSpan>
              </Link>
              <FormBase.Btn type="submit" disabled={!isReadyToSubmit}>
                {t("SIGN_IN")}
              </FormBase.Btn>
              <FormBase.Divider />
              <FormBase.Text style={{ marginBottom: "10px" }}>
                {t("DONT_HAVE_ACCOUNT?")}
              </FormBase.Text>
              <FormBase.Text>
                <Link to={() => `/register${handleRedirect()}`}>
                  <StyledSpan>{t("REGISTER")}</StyledSpan>
                </Link>
              </FormBase.Text>
            </FormBase>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
