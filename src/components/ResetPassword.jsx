import { useForm } from "react-hook-form";
import ToastNotifications from "cogo-toast";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { useUser } from "../contexts/UserContext";
import { postJsonData } from "../utils/AuthUtils";
import { useLoadingOverlay } from "../contexts/LoadingOverlayContext";

import "../styles/ResetPassword.scss";

import Input from "./Input";
import Header from "./Header";
import Typography from "./Typography";
import FooterHoriz from "./FooterHoriz";
import BaseBtn from "./Buttons/BaseBtn/BaseBtn";
import useValidators from "../utils/useValidators";
import { getErrMessageFromString } from "../utils/functions";
import Sidebar from "./SidebarD2";
import PopupBase from "./Popups/PopupBase";
import BoxWithCards from "./BoxWithCards/BoxWithCards";

const DELAY_REDIRECT_AFTER_RESET = 3000;

const ResetPassword = ({ history }) => {
  const User = useUser();
  const { t } = useTranslation();
  const LoadingOverlay = useLoadingOverlay();
  const [isEmailAccepted, setEmailAccepted] = useState(false);
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onSubmit" });
  const { emailValidators } = useValidators();

  const resetPassword = async email => {
    try {
      // LoadingOverlay.showWithText(t("SEND_EMAIL"));
      // console.log(User.currentLanguage.id);
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
        }
        //  else {
        //   history.push("/login");
        // }
      }, DELAY_REDIRECT_AFTER_RESET);
    } catch (error) {
      // LoadingOverlay.hide();
      const msg = getErrMessageFromString(error.message);
      if (msg) {
        ToastNotifications.error(msg, { position: "top-right" });
      } else {
        ToastNotifications.error(t("RESET_FAILED"), { position: "top-right" });
      }
    }
  };

  const submit = data => {
    if (!isEmailAccepted) {
      setEmailAccepted(true);
      resetPassword(data.email);
    } else {
      history.push("/login");
    }
  };

  const openPopup = () => setPopupVisibility(true);

  const closePopup = () => setPopupVisibility(false);

  return (
    <div className="reset">
      <Header
        user={User?.user}
        isSidebarVisible={isSidebarVisible}
        onOpen={() => setSidebarVisible(true)}
        onClose={() => setSidebarVisible(false)}
      />
      <Sidebar isVisible={isSidebarVisible} openPopup={openPopup} />
      <div className="container">
        <div className="reset-inner">
          <div className="reset-form-box">
            <form className="reset-form" onSubmit={handleSubmit(submit)}>
              <div className="reset-form__header">
                <Typography
                  as="h1"
                  fs="32px"
                  color="#313236"
                  lh="40px"
                  fw="900"
                >
                  {t("RESET_PASS_FORM_TITLE_TEXT")}
                </Typography>
              </div>
              <div className="reset-form__body">
                {isEmailAccepted ? (
                  <div className="reset-form__body-group">
                    <Typography
                      as="p"
                      fs="16px"
                      fw="400"
                      lh="20px"
                      color="#313236"
                    >
                      Check your email. We sent you a link to reset your
                      password.
                    </Typography>
                    <BaseBtn className="blue-btn reset-form__ok " type="submit">
                      {t("RESET_PASS_CONFIRM_BTN_TEXT")}
                    </BaseBtn>
                  </div>
                ) : (
                  <>
                    <div className="reset-form__group reset-form__group--password">
                      <Input
                        className="reset-form__input"
                        name="email"
                        type="email"
                        label={t("RESET_PASS_FORM_EMAIL_LABEL_TEXT")}
                        form="novalidatedform"
                        placeholder="primalvj3737@gmail.com"
                        message={errors.email?.message}
                        register={() => register("email", emailValidators)}
                      />
                    </div>

                    <BaseBtn
                      className="blue-btn reset-form__submit"
                      type="submit"
                    >
                      {t("RESET_PASS_FORM_RESETBTN_TEXT")}
                    </BaseBtn>
                    <BaseBtn
                      className="blue-btn reset-form__back"
                      type="button"
                      onClick={() => history.push("/login")}
                    >
                      {t("RESET_PASS_FORM_BACKBTN_TEXT")}
                    </BaseBtn>
                  </>
                )}
              </div>
            </form>
            <div className="reset-form-elements" />
          </div>
        </div>
      </div>
      <FooterHoriz />
      {isPopupVisible && (
        <PopupBase
          name="Pricing"
          title="Read all texts of numerological analysis!"
          onClose={closePopup}
          children={<BoxWithCards />}
        />
      )}
    </div>
  );
};

export default withRouter(ResetPassword);
