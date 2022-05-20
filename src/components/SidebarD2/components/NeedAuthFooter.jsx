import React from "react";
import { useTranslation } from "react-i18next";

import "./NeedAuthFooter.scss";

const NeedAuthFooter = () => {
  const { t } = useTranslation();

  return (
    <ul className="footerblock">
      <li className="footerblock-item">
        <a href="#" className="footerblock-link">
          {t("FOOTER_ABOUT_TEXT")}
        </a>
      </li>
      <li className="footerblock-item">
        <a href="#" className="footerblock-link">
          {t("FOOTER_IMPRINT_TEXT")}
        </a>
      </li>
      <li className="footerblock-item">
        <a href="#" className="footerblock-link">
          {t("FOOTER_PRIVACY_TEXT")}
        </a>
      </li>
      <li className="footerblock-item">
        <a href="#" className="footerblock-link">
          {t("FOOTER_TERMS_TEXT")}
        </a>
      </li>
      <li className="footerblock-item">
        <a href="#" className="footerblock-link">
          {t("FOOTER_APPNAME_TEXT")}
        </a>
      </li>
    </ul>
  );
};

export default NeedAuthFooter;
