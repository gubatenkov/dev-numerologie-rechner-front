import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PromotionAccordion from './PromotionAccordion';
import TextButton from './Buttons/TextButton';

// promotion content based on user level
const UserLevelPromotionTexts = {
  ACCESS_LEVEL_USER_FREE: {
    icon: '',
    title: 'Registrieren Sie sich kostenlos und erhalten Sie Zugriff auf:',
    text: (
      <ul>
        <li>Ihre Lebenszahl in Beziehungen und Partnerschaft</li>
        <li>Lernaufgaben Ihrer Seelenzahl</li>
        <li>
          Ihre Prüfungen auf dem Lebensweg: Ihr aktueller Vibratorischer Zyklus,
          Ihre aktuelle Herausforderung und deren Höhepunkt und Ihr aktuelles
          Persönliches Jahr
        </li>
        <li>
          Bei jeder Zahl: Anzeige der Seitenzahl zum Nachschlagen und Lesen der
          ausführlichen Beschreibung im jew. Numerologie-Buch
        </li>
      </ul>
    ),
    action: 'Registrieren',
    link: '/login',
  },
  ACCESS_LEVEL_USER: {
    icon: '',
    title: 'Lesen Sie alle Texte einer kurzen numerologischen Analyse!',
    text: [
      <p key="userLevelPromotionText">
        Schalten Sie sich alle Texte eines{' '}
        <b>kurzen Numeroskops mit ca. 45 Seiten A4</b> für Ihre aktuelle
        Berechnung zum online Lesen frei und erhalten Sie dazu noch ein schön
        gestaltetes <b>PDF zum Ausdrucken. Preis: € 29,-</b>
      </p>,
      <PromotionAccordion
        title="Mehr Infos dazu"
        key="userLevelPromotionAccordion"
      >
        {[
          <h5 key="content">Inhalte:</h5>,
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
              Vibratorischen Zyklen, Herausforderungen und Höhepunkte und die
              Vorausschau aufs nächste Jahr des Persönlichen Jahres
            </li>
          </ul>,
          <h5 key="functions">Funktionen:</h5>,
          <ul key="functionsList">
            <li>
              Vergleiche unterschiedliche Namen einer Person (Geburtsname,
              Wohlfühlname, etc.) miteinander
            </li>
            <li>
              Fortgeschrittene Ordnung der Zahlen nach dem „Eisberg-Modell“
            </li>
          </ul>,
        ]}
      </PromotionAccordion>,
    ],
    action: 'Premium Kurversion kaufen',
    link: 'https://www.bios-shop.eu/',
  },
  ACCESS_LEVEL_PAID_SHORT: {
    icon: '',
    title: 'Lesen Sie die vollständige numerologische Persönlichkeitsanalyse!',
    text: (
      <p>
        Schalten Sie sich alle Texte eines <b>vollständigen Numeroskops</b> mit
        ausführlichen, langen Beschreibungen mit <b>ca. 100-120 Seiten A4</b>{' '}
        und{' '}
        <b>zahlreichen Übungen und Selbstreflexionen zum persönlich Wachsen</b>{' '}
        für Ihre aktuelle Berechnung frei und erhalten Sie dazu noch ein schön
        gestaltetes <b>PDF zum Ausdrucken! Preis: € 59,-</b>
      </p>
    ),
    action: 'Premium Langversion kaufen',
    lonk: 'https://www.bios-shop.eu/',
  },
};

// promotion container for the next user level
const UserlevelPromotionContainer = styled.div`
  /* basic box styling*/
  width: 300px;
  padding: 16px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.lightestGrey};

  /* basic font styling*/
  color: ${(props) => props.theme.darkGrey};
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 14px;
  line-height: 24px;

  /* title is h4*/
  h4 {
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
  }

  /* some subtitles in content have h5*/
  h5 {
      font-size: 18px;
      font-weight: 500;
      line-height: 30px;
    }
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

  /* drawing bullet with custom color*/
  li::before {
    content: '•';
    color: ${(props) => props.theme.primary};
    padding-right: 0.7em;
  }
`;

// custom butto  for the action at the bottom
const ActionTextButton = styled(TextButton)`
  margin-top: 12px;
  width: 100%;
`;

// widget displaying promotion content based on the user access level
const UserLevelPromotionWidget = (props) => {
  // getting promotion text for current user level
  const userLevelPromotionText = UserLevelPromotionTexts[props.accessLevel];

  // if no promotion text avaiable for user => rendering nothing
  if (!userLevelPromotionText) {
    return null;
  }

  return (
    <UserlevelPromotionContainer className={props.className}>
      <h4>{userLevelPromotionText.title}</h4>
      {userLevelPromotionText.text}
      <ActionTextButton
        title={userLevelPromotionText.action}
        onClick={() => window.open(userLevelPromotionText.link)}
        primary
      />
    </UserlevelPromotionContainer>
  );
};

// setting proptypes
UserLevelPromotionWidget.propTypes = {
  accessLevel: PropTypes.string.isRequired,
};

export default UserLevelPromotionWidget;
