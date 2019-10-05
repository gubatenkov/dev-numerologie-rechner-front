import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import '../styles/LoadingIndicator.css';

/**
 * spinner inidcating loading
 */
const LoadingIndicator = (props) => (
  <div className="LoadingIndicator__container">
    <Spinner
      // className="LoadingIndicator"
      // name="double-bounce"
      // fadeIn="none"
      animation="border"
      role="status"
      variant="dark"
    />
    <h4 className="LoadingIndicator__text">{props.text}</h4>
  </div>
);

export default LoadingIndicator;
