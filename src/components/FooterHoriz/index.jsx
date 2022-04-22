import React from "react";

import "./index.scss";

import Typography from "../Typography";

const FooterHoriz = () => {
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
                Psychological Numerology
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
                About us
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
                Imprint
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
                Privacy
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
                Terms of Use
              </Typography>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterHoriz;
