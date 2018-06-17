import React, { Component } from 'react';

import '../styles/AdArea.css';

/**
 * advertisment in the product
 */
class AdArea extends Component {
  render() {
    return (
      <div className={this.props.horizontal ? 'AdArea--horizontal' : 'AdArea'}>
        {this.props.children}
      </div>
    );
  }
}

export default AdArea;
