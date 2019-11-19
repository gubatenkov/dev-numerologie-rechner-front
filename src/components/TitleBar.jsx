import React from 'react';
import PropTypes from 'prop-types';

/**
 * title bar on top of screen featuring a page title showing the user
 * names and dob of the currently displayed analysis
 */
const TitleBar = (props) => (
  <div>
    <div>
      <h1>{props.primaryHeading}</h1>
      <h2>{props.primarySubheading}</h2>
    </div>
    <div>
      <h1>{props.secondaryHeading}</h1>
      <h2>{props.secondarySubHeading}</h2>
      <div>
        {(props.secondaryHeading || props.secondarySubHeading) && <div>x</div>}
      </div>
    </div>
  </div>
);

TitleBar.propTypes = {
  primaryHeading: PropTypes.string.isRequired,
  primarySubheading: PropTypes.string,
  secondaryHeading: PropTypes.string,
  secondarySubHeading: PropTypes.string,
  onRemoveSecondary: PropTypes.func,
};

export default TitleBar;
