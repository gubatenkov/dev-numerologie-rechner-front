import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/Steps.css';

/**
 * a container component for steps that draws a connection
 * line between steps and handles alignment of steps
 */
class Steps extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };
  /**
   * default render - steps are passed as children
   */
  render() {
    return (
      <div className="steps__num">
        <div className="steps_num_connector" />
        {this.props.children}
      </div>
    );
  }
}

export default Steps;
