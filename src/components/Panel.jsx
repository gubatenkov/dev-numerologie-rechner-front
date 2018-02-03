import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/Panel.css';

/**
 * Represents a panel in the UI code
 */
class Panel extends Component {
  render() {
    return (
      <div className="panel panel-bordered panel-default" id={this.props.id}>
        <div className="panel-heading">
          {this.props.title &&
          <h5 className="panel-title">
            {this.props.title}
          </h5>}
        </div>
        <div className="panel-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

/**
 * proptypes
 */
Panel.propTypes = {
  id: PropTypes.string,
};
export default Panel;
