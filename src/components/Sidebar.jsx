import React from "react";
import { useTranslation } from "react-i18next";
import Dock from "react-dock";
import { CloseButton } from "./CloseButton";
import { LanguageSwitcher } from "./LanguageSwitcher";
import styled from "styled-components";
import { useSidebar } from "../contexts/SidebarContext";

const Container = styled.div`
  padding-top: 32px;
  padding-left: 60px;
  padding-right: 60px;
  padding-bottom: 60px;
  height: 100%;
`;

const BoldText = styled.div`
  color: #323232;
  visibility: hidden;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 30px;
`;

const NormalText = styled.div`
  color: #323232;
  visibility: hidden;
  font-family: Roboto;
  font-size: 18px;
  letter-spacing: 0;
  line-height: 30px;
`;

const EqualSpacing = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props => props.height}px;
  width: 100%;
  justify-content: space-evenly;
`;

const SpaceBetween = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

export const Sidebar = props => {
  const { t } = useTranslation();
  const Sidebar = useSidebar();
  return (
    <Dock
      position="left"
      isVisible={Sidebar.isVisible}
      fluid={false}
      size={300}
      onVisibleChange={e => Sidebar.setIsVisible(e)}
    >
      <Container>
        <CloseButton onClick={() => Sidebar.setIsVisible(!Sidebar.isVisible)} />
        <SpaceBetween>
          <EqualSpacing height={250}>
            <BoldText>{t("SIDEBAR.START")}</BoldText>
            <BoldText>{t("SIDEBAR.INTRO")}</BoldText>
            <BoldText>{t("SIDEBAR.FAQ")}</BoldText>
            <BoldText>{t("ABOUT_US")}</BoldText>
            <BoldText>{t("SIDEBAR.CONTACT")}</BoldText>
          </EqualSpacing>
          <EqualSpacing height={350}>
            <NormalText>{t("IMPRINT")}</NormalText>
            <NormalText>{t("PRIVACY_POLICY")}</NormalText>
            <NormalText>{t("TERMS")}</NormalText>
            <NormalText>{t("PSYCHOLOGICAL_NUMEROLOGY")}</NormalText>
            <NormalText>&copy;akademie bios&reg;</NormalText>
            <LanguageSwitcher />
          </EqualSpacing>
        </SpaceBetween>
      </Container>
    </Dock>
  );
};
