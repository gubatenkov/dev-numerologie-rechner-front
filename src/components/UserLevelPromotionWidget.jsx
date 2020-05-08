import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import PromotionAccordion from "./PromotionAccordion";
import TextButton from "./Buttons/TextButton";
import IconButton from "./Buttons/IconButton";
import { useTranslation, Trans } from "react-i18next";

import lockIcon from "../images/icon_lock.svg";
import bookIconPremium from "../images/icon_openBookPremium_primary.svg";

const UserLevelPromotionTexts = () => {
  const { t } = useTranslation();
  return {
    ACCESS_LEVEL_GUEST: {
      icon: lockIcon,
      title: t("ACCESS_LEVEL_GUEST.TITLE"),
      text: (
        <ul>
          <Trans i18nKey="ACCESS_LEVEL_GUEST.TEXT">
            <li>Ihre Lebenszahl in Beziehungen und Partnerschaft</li>
            <li>Lernaufgaben Ihrer Seelenzahl</li>
            <li>
              Ihre Prüfungen auf dem Lebensweg: Ihr <b>aktueller</b>{" "}
              Vibratorischer Zyklus, Ihre aktuelle Herausforderung und deren
              Höhepunkt und Ihr aktuelles Persönliches Jahr
            </li>
            <li>
              Bei jeder Zahl: Anzeige der Seitenzahl zum Nachschlagen und Lesen
              der ausführlichen Beschreibung im jew. Numerologie-Buch
            </li>
          </Trans>
        </ul>
      ),
      action: t("ACCESS_LEVEL_GUEST.ACTION"),
      link: "/register"
    },
    ACCESS_LEVEL_USER: {
      icon: bookIconPremium,
      title: t("ACCESS_LEVEL_USER.TITLE"),
      text: [
        <p key="userLevelPromotionText">
          <Trans i18nKey="ACCESS_LEVEL_USER.TEXT_1">
            Schalten Sie sich alle Texte eines{" "}
            <b>kurzen Numeroskops mit ca. 45 Seiten A4</b> für Ihre aktuelle
            Berechnung zum online Lesen frei und erhalten Sie dazu noch ein
            schön gestaltetes <b>PDF zum Ausdrucken. Preis: € 29,-</b>
          </Trans>
        </p>,
        <PromotionAccordion
          title={t("MORE_INFOS")}
          key="userLevelPromotionAccordion"
        >
          {
            <Trans i18nKey="ACCESS_LEVEL_USER.TEXT_2">
              <h5 key="content">Inhalte:</h5>
              <ul key="contentList">
                <li>
                  <b>Ihre Lebenszahl</b> mit den weiteren Abschnitten: das
                  Familienthema der Ursprungsfamilie, die Lebensphasen sowie
                  Denkmuster und Verhaltensstrategien
                </li>
                <li>Ihre Wurzelzahl</li>
                <li>
                  <b>Auf Seelen-Ebene:</b> die Intensitätszahl und die
                  Initiationszahl
                </li>
                <li>
                  <b>Die Facetten der Persönlichkeit:</b> das Geburtsdatumraster
                  (mit den vorhandenen, fehlenden und isolierten Zahlen) und die
                  Seelische Matrix mit den Karmischen Lektionen und der Zahl des
                  Seelischen Ausgleichs
                </li>
                <li>
                  <b>alle</b> Ihre Prüfungen auf dem Lebensweg: d.h. <b>alle</b>
                  Vibratorischen Zyklen, Herausforderungen und Höhepunkte und
                  die Vorausschau aufs nächste Jahr des Persönlichen Jahres
                </li>
              </ul>
              <h5 key="functions">Funktionen:</h5>
              <ul key="functionsList">
                <li>
                  Vergleiche unterschiedliche Namen einer Person (Geburtsname,
                  Wohlfühlname, etc.) miteinander
                </li>
                <li>
                  Fortgeschrittene Ordnung der Zahlen nach dem „Eisberg-Modell“
                </li>
              </ul>
            </Trans>
          }
        </PromotionAccordion>
      ],
      action: t("ACCESS_LEVEL_USER.ACTION"),
      link: t("ACCESS_LEVEL_USER.LINK")
    },
    ACCESS_LEVEL_PAID_SHORT: {
      icon: bookIconPremium,
      title: t("ACCESS_LEVEL_PAID_SHORT.TITLE"),
      text: [
        <Trans i18nKey="ACCESS_LEVEL_PAID_SHORT.TEXT_1" key="translation">
          <p key="userLevelPromotionText">
            Schalten Sie sich alle Texte eines <b>vollständigen Numeroskops</b>{" "}
            mit ausführlichen, langen Beschreibungen mit{" "}
            <b>ca. 100-120 Seiten A4</b> und{" "}
            <b>
              zahlreichen Übungen und Selbstreflexionen zum persönlich Wachsen
            </b>{" "}
            für Ihre aktuelle Berechnung frei und erhalten Sie dazu noch ein
            schön gestaltetes <b>PDF zum Ausdrucken! Preis: € 59,-</b>
          </p>
        </Trans>,

        <PromotionAccordion title={t("MORE_INFOS_CONTENT")} key="More Info">
          {
            <Trans i18nKey="ACCESS_LEVEL_PAID_SHORT.TEXT_2">
              <h5 key="content">Inhalte:</h5>
              <ul key="contentList">
                <li>
                  <b>lange Beschreibungstexte</b> von allen Zahlen der
                  Premium-Kurz-Version, zusätzlich:
                </li>
                <li>
                  <b>Alle Zahlen der Ebene „Potenzial und Berufung“</b> mit:
                  Talentzahl, Ausdruckszahl, Kreativitätszahl (Vornamenszahl),
                  Nachnamenszahl, Berufszahl, Visionszahl, Berufungszahl
                </li>
              </ul>
              <h5 key="functions">
                Alle weiteren Texte, um <b>persönlich zu wachsen</b>, sowie
                zahlreiche <b>Übungen und Selbstreflexionen:</b>
              </h5>
              <ul key="functionsList">
                <li>
                  <b>Lebenszahl:</b> Abschnitte: Seelische Verletzung und
                  Schattenseiten, Lebensaufgaben, Selbstreflexion und
                  Affirmationen
                </li>
                <li>
                  <b>3 Selbstcoaching Übungen zu den Wurzelzahlen</b>
                </li>
                <li>
                  <b>Gesundheitszahl</b> - inklusive Empfehlungen,
                  Therapiemöglichkeiten, Übungen
                </li>
                <li>
                  <b>Seelenzahl:</b> Abschnitte: Denkmuster und
                  Verhaltensstrategie, Fragen zur Selbstreflexion
                </li>
                <li>
                  Seelische Matrix - vorhandene Zahlen:{" "}
                  <b>Emotionale Verletzung</b> und Häufigkeit
                </li>
                <li>
                  Karmische Lektionen: Lernaufgabe und{" "}
                  <b>Seelische Verletzung</b>
                </li>
                <li>
                  <b>Empfehlungen</b> für das Persönliches Jahr und das nächste
                  Jahr des Persönlichen Jahres
                </li>
              </ul>
            </Trans>
          }
        </PromotionAccordion>
      ],
      action: t("ACCESS_LEVEL_PAID_SHORT.ACTION"),
      link: t("ACCESS_LEVEL_PAID_SHORT.LINK")
    }
  };
};

const UserlevelPromotionContainer = styled.div`
  /* basic box styling*/
  padding: 16px;
  border-radius: 6px;
  background-color: ${props => props.theme.lightestGrey};

  /* basic font styling*/
  color: ${props => props.theme.darkGrey};
  font-family: ${props => props.theme.fontFamily};
  font-size: 15px;
  line-height: 24px;

  /* title is h4*/
  h4 {
    font-size: 21px;
    font-weight: 600;
    line-height: 30px;
  }

  /* some subtitles in content have h5*/
  h5 {
    font-size: 18px;
    font-weight: 600;
    line-height: 30px;
  }

  /* list styling with colored dots and custom spacing*/
  ul {
    /* removing list style as we need to draw own bullets*/
    list-style: none;

    /* resetting margin and padding to have a green field for our own bullet*/
    padding: 0;
    margin: 0 0 12px 0;
  }

  li {
    /* padding we need for the bullet*/
    padding-left: 1em;
    text-indent: -1em;

    /* space between items*/
    margin-top: 12px;
  }

  b {
    font-weight: 600;
    color: #161616;
  }

  p {
    font-size: 14px;
    line-height: 24px;
  }

  /* drawing bullet with custom color*/
  li::before {
    content: "•";
    color: ${props => props.theme.primary};
    padding-right: 0.7em;
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const ActionTextButton = styled(TextButton)`
  margin-top: 12px;
  width: 100%;
`;

const PromotionIconButton = styled(IconButton)`
  width: 32px;
  height: 32px;

  img {
    padding-bottom: 4px;
    height: 23px;
  }
`;

const UserLevelPromotionWidget = props => {
  const userLevelPromotionText = UserLevelPromotionTexts()[props.accessLevel];

  if (!userLevelPromotionText) {
    return null;
  }

  return (
    <UserlevelPromotionContainer className={props.className}>
      <TitleContainer>
        <h4>{userLevelPromotionText.title}</h4>
        <PromotionIconButton imageIcon={userLevelPromotionText.icon} inverted />
      </TitleContainer>
      {userLevelPromotionText.text}
      <ActionTextButton
        title={userLevelPromotionText.action}
        onClick={() => window.open(userLevelPromotionText.link)}
        primary
      />
    </UserlevelPromotionContainer>
  );
};

UserLevelPromotionWidget.propTypes = {
  accessLevel: PropTypes.string.isRequired
};

export default UserLevelPromotionWidget;
