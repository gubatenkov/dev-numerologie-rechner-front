import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import '../styles/UserHome.css';
import TitleBar from './TitleBar';
import NavigationBar from './NavigationBar';
import AdArea from './AdArea';
import AnalysisBrowser from './AnalysisBrowser';
import PaketWidget from './PaketWidget';
import SaveDialog from './SaveDialog';

import { getUserGroups } from '../utils/Server';

class UserHome extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };
  /**
   * default constructor
   */
  constructor(props) {
    super(props);

    // setting initial state
    this.state = {
      saveDialogOpen: true,
    };
  }

  /**
   * default component render
   */
  render() {
    return (
      <div>
        <NavigationBar />
        <TitleBar
          primaryActionTitle="Anfrage an Berater"
          secondaryActionTitle="Neue Analyse"
          onSecondaryAction={() => this.props.history.push('/analysisInput')}
        />
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
        <SaveDialog
          isOpen={this.state.saveDialogOpen}
          groups={getUserGroups()}
          onClose={() => this.setState({ saveDialogOpen: false })}
          onSave={() => this.setState({ saveDialogOpen: false })}
        />
      </div>
    );
  }
}

export default withRouter(UserHome);
