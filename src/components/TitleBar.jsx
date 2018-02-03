import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import '../styles/TitleBar.css';

/**
 * title bar on top of screen featuring a page title,
 * sub-information, a back action as well as multipe action
 * buttons (right)
 */
class TitleBar extends Component {
  static propTypes = {
    backTitle: PropTypes.string,
    backRoute: PropTypes.string,
    badgeTitle: PropTypes.string,
    title: PropTypes.string.isRequired,
    primaryActionTitle: PropTypes.string,
    secondaryActionTitle: PropTypes.string,
  };

  static defaultProps = {
    backTitle: null,
    backRoute: '/',
    badgeTitle: null,
    primaryActionTitle: null,
    secondaryActionTitle: null,
  };

  render() {
    return (
      <div className="barContainer">
        <div className="barContainer__leftElements">
          {this.props.backTitle && (
            <Link to={this.props.backRoute}>
              <button className="btn btn-default">
                {this.props.backTitle}
              </button>
            </Link>
          )}
        </div>
        <div className="barTitle">
          {this.props.badgeTitle && (
            <span className="barTitle__badge badge badge-primary">
              {this.props.badgeTitle}
            </span>
          )}
          ;
          <h1 className="page-title">{this.props.title}</h1>
        </div>
        <div className="barContainer__rightElements">
          {this.props.secondaryActionTitle && (
            <button className="btn btn-default">
              {this.props.secondaryActionTitle}
            </button>
          )}
          {this.props.primaryActionTitle && (
            <button className="btn btn-success">
              {this.props.primaryActionTitle}
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default TitleBar;
