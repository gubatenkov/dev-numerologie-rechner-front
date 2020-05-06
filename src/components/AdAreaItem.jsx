import React from "react";
import PropTypes from "prop-types";

const AdAreaItem = props => {
  return (
    <a href={props.link} target="_blank" rel="noopener noreferrer">
      <img src={props.image} alt="ad" />
    </a>
  );
};

AdAreaItem.propTypes = {
  link: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};
export default AdAreaItem;
