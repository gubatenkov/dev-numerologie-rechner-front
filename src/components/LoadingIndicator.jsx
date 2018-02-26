import React, { Component } from 'react';
import Spinner from 'react-spinkit';

import '../styles/LoadingIndicator.css';

/**
 * spinner inidcating loading
 */
class LoadingIndicator extends Component {
  render() {
    return (
      <div className="LoadingIndicator__container">
        <Spinner
          className="LoadingIndicator"
          name="double-bounce"
          fadeIn="none"
        />
      </div>
    );
  }
}

export default LoadingIndicator;
