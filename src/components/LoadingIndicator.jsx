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
        <h4 className="LoadingIndicator__text">{this.props.text}</h4>
      </div>
    );
  }
}

export default LoadingIndicator;
