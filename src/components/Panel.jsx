import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/Panel.css';

/**
 * Represents a panel in the UI code
 */
class Panel extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string,
    children: PropTypes.node,
    footer: PropTypes.element,
    actions: PropTypes.arrayOf(PropTypes.element),
    className: PropTypes.string,
  };

  static defaultProps = {
    id: null,
    children: null,
    footer: null,
    actions: null,
    className: '',
  };

  /**
   * default render
   */
  render() {
    // defining panel base class
    const panelBaseClass = `panel panel-bordered panel-default ${
      this.props.className
    }`;

    return (
      <div className={panelBaseClass} id={this.props.id}>
        <div className="panel-heading">
          {this.props.title && (
            <h5 className="panel-title">{this.props.title}</h5>
          )}
          {this.props.actions && (
            <div className="panel-actions">{this.props.actions}</div>
          )}
        </div>
        <div className="panel-body">{this.props.children}</div>
        {this.props.footer && (
          <div className="panel-footer">{this.props.footer}</div>
        )}
      </div>
    );
  }
}
export default Panel;
