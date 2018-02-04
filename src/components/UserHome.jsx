import React, { Component } from 'react';

import '../styles/UserHome.css';

import TitleBar from './TitleBar';
import NavigationBar from './NavigationBar';
import AdArea from './AdArea';
import AnalysisBrowser from './AnalysisBrowser';
import PaketWidget from './PaketWidget';

class UserHome extends Component {
  /**
   * default component render
   */
  render() {
    return (
      <div>
        <NavigationBar />
        <TitleBar primaryActionTitle="Anfrage an Berater" />
        <div className="UserHomeContentArea">
          <div className="UserHomeLeftAdArea">
            <AdArea />
          </div>
          <div className="UserHomeContent">
            <AnalysisBrowser />
            <PaketWidget />
            <AdArea />
          </div>
        </div>
      </div>
    );
  }
}

export default UserHome;
