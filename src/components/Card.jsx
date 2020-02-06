import React, { Component } from "react";
import PropTypes from "prop-types";

import "../styles/Card.css";

/**
 * card component to display data in tile formats
 */
class Card extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired
  };

  /**
   * default render
   */
  render() {
    return (
      <div className="card card-block">
        <h4 className="card-title">{this.props.title}</h4>
        <p className="card-text Card__body">{this.props.body}</p>
        <p className="card-text">
          <small className="text-muted">{this.props.description}</small>
        </p>
      </div>
    );
  }
}

export default Card;
