import React from 'react';
import styled from 'styled-components';

// container for links in the footer
const FooterContainer = styled.div`
  /* One row wrapping*/
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;

  /* margin of whole footer*/
  padding-left: 15%;
  padding-right: 15%;
  margin-top: 40px;
  margin-bottom: 20px;

  /* used to create gap within flex elements without having wrap markin issues*/
  margin-left: -35px;
`;

// link in the footer
const FooterLink = styled.a`
  /* text styling*/
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 16px;
  color: ${(props) => props.theme.lighterGrey};
  text-align: center;

  /* spacing between items in container*/
  margin-left: 35px;

  /* removing default link hover optics*/
  :hover {
    text-decoration: none;
    color: ${(props) => props.theme.lighterGrey};
  }
`;

// footer component showing copyright notice and basic links such as about us and data protection.
const Footer = (props) => (
  <FooterContainer>
    <FooterLink href="https://www.akademiebios.eu " target="_blank">
      &copy;{` ${new Date().getFullYear()} akademie bios`}&reg;
    </FooterLink>
    <FooterLink
      href="https://www.psychologischenumerologie.eu/psychologische-numerologie-und-numerologie-coaching/"
      target="_blank"
    >
      Psychologische Numerologie
    </FooterLink>
    <FooterLink
      href="https://www.psychologischenumerologie.eu/dr-ernestina-mazza/"
      target="_blank"
    >
      Über uns
    </FooterLink>
    <FooterLink
      href="https://www.psychologischenumerologie.eu/impressum/"
      target="_blank"
    >
      Impressum
    </FooterLink>
    <FooterLink
      href="https://www.psychologischenumerologie.eu/datenschutz/"
      target="_blank"
    >
      Datenschutz
    </FooterLink>
    <FooterLink
      href="https://www.psychologischenumerologie.eu/nutzungsbedingungen/"
      target="_blank"
    >
      Nutzungsbedingungen
    </FooterLink>
  </FooterContainer>
);

export default Footer;
