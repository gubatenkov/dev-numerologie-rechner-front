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
    number: PropTypes.number.isRequired,
  };

  static defaultProps = {
    onStepClick: () => {},
    current: false,
    done: false,
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
    let circleStyle = 'step_num__circle';
    if (this.props.current) {
      circleStyle += ' step_num__circle--current';
    } else if (this.props.done) {
      circleStyle += ' step_num__circle--done';
    }

    // adapting styling of name based on status
    let nameStyle = 'step_num__stepName';
    if (this.props.current) {
      nameStyle += ' step_num__stepName--current';
    }

    return (
      <div className="step__num">
        {this.props.number && (
          <div className="step_num_stepNumber">{this.props.number}</div>
        )}
        <div className={circleStyle} />
        <div
          className={nameStyle}
          onClick={this.handleStepClick}
          role="button"
          tabIndex={0}
        >
          {this.props.name}
        </div>
      </div>
    );
  }
}

export default Step;
