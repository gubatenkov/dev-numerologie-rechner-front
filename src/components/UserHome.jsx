import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import '../styles/UserHome.css';
import TitleBar from './TitleBar';
import NavigationBar from './NavigationBar';
import AdArea from './AdArea';
import AnalysisBrowser from './AnalysisBrowser';
import PaketWidget from './PaketWidget';
import SaveDialog from './SaveDialog';

const currentUserQuery = gql`
  query currentUser {
    currentUser {
      email
      groups {
        id
        name
      }
      analyses {
        id
        name
        groupId
        inputs {
          firstNames
          lastName
          dateOfBirth
        }
      }
      credits {
        type {
          name
        }
        value
      }
    }
  }
`;
const SAVE_ANALYSIS_COMMAND = 'saveAnalysis';

class UserHome extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    computedMatch: PropTypes.shape({
      params: PropTypes.shape({
        userAction: PropTypes.string,
        firstNames: PropTypes.string,
        lastName: PropTypes.string,
        dateOfBirth: PropTypes.string,
      }),
    }).isRequired,
  };
  /**
   * default constructor
   */
  constructor(props) {
    super(props);

    // setting initial state
    this.state = {
      saveDialogOpen:
        this.props.computedMatch.params.userAction === SAVE_ANALYSIS_COMMAND,
    };
  }

  /**
   * default component render
   */
  render() {
    if (this.props.data.loading) {
      return <h1>Loading...</h1>;
    }

    // console.log(this.props.computedMatch.params.userAction);
    // console.log(this.props.computedMatch.params.firstNames);
    // console.log(this.props.computedMatch.params.lastName);
    // console.log(this.props.computedMatch.params.dateOfBirth);

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
            <AnalysisBrowser
              groups={this.props.data.currentUser.groups}
              analyses={this.props.data.currentUser.analyses}
            />
            <PaketWidget />
            <AdArea />
          </div>
        </div>
        <SaveDialog
          isOpen={this.state.saveDialogOpen}
          groups={this.props.data.currentUser.groups.map(group => group.name)}
          onClose={() => this.setState({ saveDialogOpen: false })}
          onSave={() => this.setState({ saveDialogOpen: false })}
        />
      </div>
    );
  }
}

export default graphql(currentUserQuery)(withRouter(UserHome));
