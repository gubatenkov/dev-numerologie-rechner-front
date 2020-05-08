import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Interweave from "interweave";
import { useTranslation, Trans } from "react-i18next";
import book1Cover from "../images/book_1.png";
import book2Cover from "../images/book_2.png";

const BookPromotion = styled.div`
  border-radius: 6px;

  /* basic background color*/
  background-color: ${props => props.theme.lightestGrey};

  /* partial color as background image*/
  background-image: linear-gradient(
    0deg,
    #8fbd36,
    #8fbd36 33%,
    transparent 33%,
    transparent 100%
  );

  /* basic box styling*/
  padding: 16px;
  margin-top: 30px;

  /* basic text styling*/
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

  /* content text styling*/
  p {
    font-size: 15px;
    line-height: 24px;
  }

  b {
    font-weight: 600;
    color: #161616;
  }
`;

const BookPromotionImageContainer = styled.div`
  /* using flex row to center image*/
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const BookPromotionWidget = props => {
  const { t } = useTranslation();

  // finding out which book cover to include based on book reference string
  // TODO determine this based on passed book number from backend
  const bookCoverIcon = props.bookReference.includes("Band 1")
    ? book1Cover
    : book2Cover;

  return (
    <BookPromotion className={props.className}>
      <h4>{t("DETAILED_DESCRIPTION")}</h4>
      <p>
        <Trans i18nKey="BOOK_PROMO">
          ...über Ihre/n <strong>{{ title: props.resultTitle }}</strong> finden
          Sie in unserem Buch
        </Trans>
        <Interweave content={props.bookReference} />
      </p>

      <BookPromotionImageContainer>
        <img src={bookCoverIcon} alt="book_cover" />
      </BookPromotionImageContainer>
    </BookPromotion>
  );
};

BookPromotionWidget.propTypes = {
  resultTitle: PropTypes.string.isRequired,
  bookReference: PropTypes.string.isRequired
};

export default BookPromotionWidget;
