import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Interweave from 'interweave';

// images for promotions
import book1Cover from '../images/book_1.png';
import book2Cover from '../images/book_2.png';

// widget container for the book
const BookPromotion = styled.div`
  border-radius: 6px;

  /* basic background color*/
  background-color: ${(props) => props.theme.lightestGrey};

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
  color: ${(props) => props.theme.darkGrey};
  font-family: ${(props) => props.theme.fontFamily};

  /* title is h4*/
  h4 {
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
  }

  /* content text styling*/
  p {
    font-size: 16px;
    line-height: 26px;
  }
`;

// container for the image positioned at the bottom center
const BookPromotionImageContainer = styled.div`
  /* using flex row to center image*/
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

// widget holding promotion content for a book based on a book reference string
const BookPromotionWidget = (props) => {
  // finding out which book cover to include based on book reference string
  // TODO determine this based on passed book number from backend
  const bookCoverIcon = props.bookReference.includes('Band 1')
    ? book1Cover
    : book2Cover;

  return (
    <BookPromotion className={props.className}>
      <h4>Detaillierte Beschreibungen</h4>
      <p>
        ...über Ihre/n <b>{`${props.resultTitle}`}</b> finden Sie in unserem Buch{' '}
        <Interweave content={props.bookReference} />
      </p>

      <BookPromotionImageContainer>
        <img src={bookCoverIcon} alt="book_cover" />
      </BookPromotionImageContainer>
    </BookPromotion>
  );
};

// setting proptype
BookPromotionWidget.propTypes = {
  resultTitle: PropTypes.string.isRequired,
  bookReference: PropTypes.string.isRequired,
};

export default BookPromotionWidget;
