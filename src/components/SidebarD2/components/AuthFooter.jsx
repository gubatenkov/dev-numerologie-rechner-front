import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./AuthFooter.scss";

import { useUser } from "../../../contexts/UserContext";

const AuthFooter = () => {
  const User = useUser();
  const { t } = useTranslation();

  return (
    <ul className="authfooter">
      <li className="authfooter-item">
        <Link className="authfooter-link" to="/reset">
          {t("SIDEBAR_CHANGE_PASS_TEXT")}
        </Link>
      </li>
      <li className="authfooter-item">
        <button className="authfooter-btn" onClick={() => User.logoutUser()}>
          {t("SIDEBAR_SIGNOUT_TEXT")}
        </button>
      </li>
      <li className="authfooter-item">
        <Link className="authfooter-link" to="/userProfile">
          {t("SIDEBAR_DELETE_ACC_TEXT")}
        </Link>
      </li>
    </ul>
  );
};

export default AuthFooter;
