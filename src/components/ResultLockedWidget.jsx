import React from "react";
import styled from "styled-components";
import { useTranslation, Trans } from "react-i18next";
import PropTypes from "prop-types";

const GUEST_LOCKED_TEXT = (
  <div>
    <Trans i18nKey="GUEST_LOCKED_TEXT">
      <p>
        Sie nutzen den Psychologische Numerologie Online Rechner derzeit als
        <b> Gast-Benutzer</b>. Sie können sich somit zwar alle 34 Zahlen einer
        vollständigen psychologisch-numerologischen Persönlichkeitsanalyse
        berechnen, erhalten dazu aber nur Beschreibungstexte zu einigen wenigen
        Zahlen als Vorschau und zum Kennenlernen dieses Rechners.
      </p>
      <p>
        Wenn Sie mehr Zahlen Ihres Persönlichkeitsprofils kostenlos sehen
        möchten, dann{" "}
        <b>
          werden Sie Teil unserer Gruppe an Psychologischer Numerologie
          Interessierten und Coaches indem Sie sich registrieren
        </b>{" "}
        – siehe Infobox rechts bzw. unten.
      </p>
      <p>Wir freuen uns auf Ihre Teilnahme!</p>
    </Trans>
  </div>
);

const USER_LOCKED_TEXT = (
  <div>
    <Trans i18nKey="USER_LOCKED_TEXT">
      <p>
        Sie nutzen den Psychologische Numerologie Online Rechner derzeit als
        <b> registrierter und angemeldeter Benutzer</b>. Sie können sich somit
        alle 34 Zahlen einer vollständigen psychologisch-numerologischen
        Persönlichkeitsanalyse berechnen, erhalten dazu aber nur
        Beschreibungstexte zu <b>ein paar ausgewählten Zahlen</b> wie die
        Lebenszahl - u.a. in Beziehungen und Partnerschaft, die Seelenzahl - nun
        mit den Lernaufgaben - und auch Ihr aktueller Vibratorischer Zyklus,
        Ihre aktuelle Herausforderung und deren Höhepunkt und Ihr aktuelles
        Persönliches Jahr.
      </p>
      <p>
        Sie können nun zu jeder berechneten Zahl die{" "}
        <b>
          ausführliche Beschreibung im jeweiligen Psychologische Numerologie
          Buch nachschlagen und durchlesen.
        </b>
        Sie finden die Angabe der jeweiligen Seitenzahl sowie das Buch, auf das
        sich diese bezieht, in der Buch-Empfehlungs-Infobox rechts bzw. unten.
      </p>
      <p>
        Wenn Sie{" "}
        <b>
          alle Beschreibungstexte einer kurzen psychologisch-numerologischen
          Persönlichkeitsanalyse
        </b>{" "}
        direkt hier im Browser (oder auch als PDF zum Ausdrucken auf Papier)
        lesen möchten, können Sie unser <b>Premium Angebot nutzen</b> und
        entweder – für Ihre aktuelle Berechnung – eine{" "}
        <b>
          kurze psychologisch-numerologische Persönlichkeitsanalyse im Umfang
          von ca. 50 Seiten A4 für € 29,- kaufen
        </b>
        , siehe Infobox rechts, oder gleich eine vollständige, lange und
        ausführliche psychologisch-numerologische Persönlichkeitsanalyse mit
        allen Zahlen, langen Beschreibungstexten und zahlreichen Übungen für €
        59,- erwerben.
      </p>
    </Trans>
  </div>
);

const Container = styled.div`
  width: 100%;
  border-radius: 6px;
  background-color: ${props => props.theme.primaryLight};

  padding: 20px 24px 24px 24px;
  margin-top: 24px;
`;

const Header = styled.p`
  color: ${props => props.theme.darkGrey};
  font-family: ${props => props.theme.fontFamily};
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
`;

const Message = styled.div`
  color: ${props => props.theme.darkGrey};
  font-family: ${props => props.theme.fontFamily};
  font-size: 18px;
  line-height: 30px;
`;

const ResultLockedWidget = props => {
  const { t } = useTranslation();
  return (
    <Container>
      <Header>{t("WHY_NO_TEXT")}</Header>
      <Message>
        {props.accessLevel === "ACCESS_LEVEL_GUEST"
          ? GUEST_LOCKED_TEXT
          : USER_LOCKED_TEXT}
      </Message>
    </Container>
  );
};

ResultLockedWidget.propTypes = {
  accessLevel: PropTypes.string.isRequired
};

export default ResultLockedWidget;
