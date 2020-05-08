import React from "react";
import PropTypes from "prop-types";

import "../styles/Card.css";

const Card = props => {
  return (
    <div className="card card-block">
      <h4 className="card-title">{props.title}</h4>
      <p className="card-text Card__body">{props.body}</p>
      <p className="card-text">
        <small className="text-muted">{props.description}</small>
      </p>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired
};

export default Card;
