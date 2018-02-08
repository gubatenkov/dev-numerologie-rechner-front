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
    vertical: PropTypes.bool,
  };

  static defaultProps = {
    children: null,
    vertical: true,
  };
  /**
   * default render - steps are passed as children
   */
  render() {
    return (
      <div
        className={
          this.props.vertical ? 'steps__num_vertical' : 'steps__num_horizontal'
        }
      >
        <div
          className={
            this.props.vertical
              ? 'steps_num_connector_vertical'
              : 'steps_num_connector_horizontal'
          }
        />
        {this.props.children}
      </div>
    );
  }
}

export default Steps;
