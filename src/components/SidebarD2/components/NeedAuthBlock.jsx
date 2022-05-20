import React from "react";
import { useTranslation } from "react-i18next";

import "./NeedAuthBlock.scss";

import BaseBtn from "../../Buttons/BaseBtn/BaseBtn";

const NeedAuthBlock = () => {
  const { t } = useTranslation();

  return (
    <div className="loginblock">
      <div className="loginblock__text">{t("HEADER_UNAUTH_TEXT")}</div>
      <div className="loginblock__actions">
        <BaseBtn
          className="loginblock-btn loginblock-btn--outlined"
          href="/login"
          link
        >
          {t("HEADER_LOGIN_BTN_TEXT")}
        </BaseBtn>
        <BaseBtn className="loginblock-btn " href="/register" link>
          {t("HEADER_SIGNUP_BTN_TEXT")}
        </BaseBtn>
      </div>
    </div>
  );
};

export default NeedAuthBlock;
