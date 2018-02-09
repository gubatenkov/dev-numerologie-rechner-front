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
    horizontal: PropTypes.bool,
  };

  static defaultProps = {
    children: null,
    horizontal: false,
  };

  /**
   * default render - steps are passed as children
   */
  render() {
    return (
      <div
        className={
          this.props.horizontal ? 'steps--horizontal' : 'steps--vertical'
        }
      >
        <div
          className={
            this.props.horizontal
              ? 'steps_Connector--horizontal'
              : 'steps_Connector--vertical'
          }
        />
        {this.props.children}
      </div>
    );
  }
}

export default Steps;
