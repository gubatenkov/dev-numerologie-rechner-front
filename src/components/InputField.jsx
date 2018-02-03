import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Represents a panel in the UI code
 */
class InputField extends Component {
  static propTypes = {
    icon: PropTypes.string,
    fieldName: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    icon: null,
    onChange: () => {},
  };

  render() {
    return (
      <div className="form-group">
        <div className="input-group input-group-icon">
          {this.props.icon && (
            <span className="input-group-addon">
              <span className={`icon ${this.props.icon}`} aria-hidden="true" />
            </span>
          )}
          <input
            type="text"
            className="form-control"
            placeholder={this.props.fieldName}
            onChange={this.props.onChange}
          />
        </div>
      </div>
    );
  }
}

export default InputField;
