import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/Step.css';

/**
 * step as part of a steps component
 * draws a circle (dependent on state e {current, done} and the name of the step)
 * use in a Steps container
 */
class Step extends Component {
  static propTypes = {
    onStepClick: PropTypes.func,
    name: PropTypes.string.isRequired,
    current: PropTypes.bool,
    done: PropTypes.bool,
    horizontal: PropTypes.bool,
  };

  static defaultProps = {
    onStepClick: () => {},
    current: false,
    done: false,
    horizontal: false,
  };
  /**
   * handler for clicks on step, redirects to own handler
   */
  handleStepClick = () => {
    if (this.props.onStepClick) {
      this.props.onStepClick(this.props.name);
    }
  };
  /**
   * default render method displaying the step number, cirlce and name
   */
  render() {
    // adapting styling of circle based on status
    let circleStyle = this.props.horizontal
      ? 'Step__Circle--horizontal'
      : 'Step__Circle';
    if (this.props.current) {
      circleStyle += ' Step__Circle--current';
    } else if (this.props.done) {
      circleStyle += ' Step__Circle--done';
    }

    // adapting styling of name based on status
    let nameStyle = this.props.horizontal
      ? 'Step__StepName--horizontal'
      : 'Step__StepName';
    if (this.props.current) {
      nameStyle += ' Step__StepName--current';
    }

    return (
      <div className={this.props.horizontal ? 'Step--horizontal' : 'Step'}>
        <div className={circleStyle} />
        <div className={nameStyle} onClick={this.handleStepClick} role="button">
          {this.props.name}
        </div>
      </div>
    );
  }
}

export default Step;
