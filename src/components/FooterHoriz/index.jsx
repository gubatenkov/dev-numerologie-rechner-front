import React from "react";
import { useTranslation } from "react-i18next";

import "./index.scss";

import Typography from "../Typography";

const FooterHoriz = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-left">
            <Typography fs="14px" fw="400" lh="20px" color="#fff" opacity="0.6">
              © {currentYear} Academy Bios ®
            </Typography>
          </div>
          <ul className="footer-right">
            <li className="footer-right__item">
              <Typography
                as="a"
                fs="14px"
                fw="400"
                lh="20px"
                color="#fff"
                href="#"
              >
                {t("FOOTER_APPNAME_TEXT")}
              </Typography>
            </li>
            <li className="footer-right__item">
              <Typography
                as="a"
                fs="14px"
                fw="400"
                lh="20px"
                color="#fff"
                href="#"
              >
                {t("FOOTER_ABOUT_TEXT")}
              </Typography>
            </li>
            <li className="footer-right__item">
              <Typography
                as="a"
                fs="14px"
                fw="400"
                lh="20px"
                color="#fff"
                href="#"
              >
                {t("FOOTER_IMPRINT_TEXT")}
              </Typography>
            </li>
            <li className="footer-right__item">
              <Typography
                as="a"
                fs="14px"
                fw="400"
                lh="20px"
                color="#fff"
                href="#"
              >
                {t("FOOTER_PRIVACY_TEXT")}
              </Typography>
            </li>
            <li className="footer-right__item">
              <Typography
                as="a"
                fs="14px"
                fw="400"
                lh="20px"
                color="#fff"
                href="#"
              >
                {t("FOOTER_TERMS_TEXT")}
              </Typography>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterHoriz;
