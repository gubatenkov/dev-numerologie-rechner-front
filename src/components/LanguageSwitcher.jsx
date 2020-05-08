import React, { useState } from "react";
import styled from "styled-components";
import ArrowDown from "./ArrowDown";
import { LANGUAGES } from "../utils/Constants";
import { useUser } from "../contexts/UserContext";
import { useSidebar } from "../contexts/SidebarContext";

const Container = styled.button`
  margin-top: 10px;
  margin-bottom: 10px;
  height: 40px;
  width: 60px;
  background-color: #f8f8f8;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none !important;
`;

const Language = styled.div`
  height: 24px;
  width: 20px;
  color: #000000;
  font-family: "SF Pro Display";
  font-size: 16px;
  letter-spacing: 0;
  line-height: 24px;
`;

const ArrowContainer = styled.div`
  margin-left: 7px;
`;

const LanguageDropDown = styled.div`
  width: 75px;
  height: auto;
  background-color: #f8f8f8;
  max-height: 90px;
  position: absolute;
  display: ${props => (!props.showing ? "none" : "unset")}
  left: 60px;
  bottom: 47px;
  overflow-y: scroll;
  border-radius: 6px;
`;

const LanguageItem = styled.button`
  height: 30px;
  background-color: #f8f8f8;
  width: 100%
  display: flex;
  align-items: center;
  padding-left: 20px;
  border: none;
  outline: none !important;
`;

export const LanguageSwitcher = props => {
  const User = useUser();
  const Sidebar = useSidebar();

  const openDropdown = () => {
    Sidebar.setShowLanguages(true);
  };

  return (
    <>
      <LanguageDropDown showing={Sidebar.showLanguages}>
        {LANGUAGES.map((lang, index) => (
          <LanguageItem
            key={index}
            onClick={() => {
              User.setLanguage(index);
              Sidebar.setShowLanguages(false);
            }}
          >
            {lang.code}
          </LanguageItem>
        ))}
      </LanguageDropDown>
      <Container onClick={openDropdown}>
        <Language>{LANGUAGES[User.currentLanguageIndex].code}</Language>
        <ArrowContainer>
          <ArrowDown />
        </ArrowContainer>
      </Container>
    </>
  );
};
