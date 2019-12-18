import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MainContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return <div className="main-container">{this.props.children}</div>;
  }
}

export default MainContainer;
