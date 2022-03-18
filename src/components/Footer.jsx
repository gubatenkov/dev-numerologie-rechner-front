import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const FooterContainer = styled.div`
  /* One row wrapping*/
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  /* margin of whole footer*/
  padding-left: 15%;
  padding-right: 15%;
  margin-top: 40px;
  margin-bottom: 20px;

  /* used to create gap within flex elements without having wrap markin issues*/
  margin-left: -35px;
`;

const FooterLink = styled.a`
  display: inline-block;
  /* text styling*/
  font-family: ${props => props.theme.fontFamily};
  font-size: 16px;
  color: ${props => props.theme.lighterGrey};
  text-align: center;

  /* spacing */
  margin: 0 10px 0 0;

  /* removing default link hover optics*/
  :hover {
    text-decoration: none;
    color: ${props => props.theme.lighterGrey};
  }
`;

const Footer = props => {
  const { t } = useTranslation();
  return (
    <FooterContainer>
      <FooterLink href={t("HOMEPAGE")} target="_blank">
        &copy;{` ${new Date().getFullYear()} akademie bios`}&reg;
      </FooterLink>
      <FooterLink href={t("HOMEPAGE_COACHING")} target="_blank">
        {t("PSYCHOLOGICAL_NUMEROLOGY")}
      </FooterLink>
      <FooterLink href={t("HOMEPAGE_ABOUT_US")} target="_blank">
        {t("ABOUT_US")}
      </FooterLink>
      <FooterLink href={t("HOMEPAGE_IMPRINT")} target="_blank">
        {t("IMPRINT")}
      </FooterLink>
      <FooterLink href={t("HOMEPAGE_PRIVACY_POLICY")} target="_blank">
        {t("PRIVACY_POLICY")}
      </FooterLink>
      <FooterLink href={t("HOMEPAGE_TERMS")} target="_blank">
        {t("TERMS")}
      </FooterLink>
    </FooterContainer>
  );
};

export default Footer;
