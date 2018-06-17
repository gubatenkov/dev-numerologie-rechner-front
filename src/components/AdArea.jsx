import React, { Component } from 'react';

import '../styles/AdArea.css';

/**
 * advertisment in the product
 */
class AdArea extends Component {
  render() {
    return (
      <div className="AdArea">
        <img className="AdArea__Banner" src={this.props.banner} alt="logo" />
      </div>
    );
  }
}

export default AdArea;
