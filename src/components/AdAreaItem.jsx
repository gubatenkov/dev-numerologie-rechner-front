import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * advertisment item in the product
 */
class AdAreaItem extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  };

  render() {
    return (
      <a href={this.props.link} target="_blank" rel="noopener noreferrer">
        <img src={this.props.image} alt="ad" />
      </a>
    );
  }
}

export default AdAreaItem;
