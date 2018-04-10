import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';

import '../styles/UserHome.css';

import TitleBar from './TitleBar';
import NavigationBar from './NavigationBar';
import AdArea from './AdArea';
import AnalysisBrowser from './AnalysisBrowser';
import CreditWidget from './CreditWidget';
import SaveAnalysisDialog from './dialogs/SaveAnalysisDialog';
import LoadingIndicator from './LoadingIndicator';

import { currentUserQuery } from '../graphql/Queries';
import { saveAnalysisMutation } from '../graphql/Mutations';

const SAVE_ANALYSIS_COMMAND = 'saveAnalysis';

/**
 * Home screen of the user displaying analyses, groups and credits
 */
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
    saveAnalysis: PropTypes.func.isRequired,
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
   * saves the analysis passed to user home
   * @param name: the name of the new analysis
   * @param groupId: the id of the group of the new analysis
   */
  async saveAnalysis(name, groupId) {
    try {
      // performing mutation call
      await this.props.saveAnalysis({
        variables: {
          name,
          group: groupId,
          inputs: [
            {
              firstNames: this.props.computedMatch.params.firstNames,
              lastName: this.props.computedMatch.params.lastName,
              dateOfBirth: this.props.computedMatch.params.dateOfBirth,
            },
          ],
        },
        update: (store, { data: { saveAnalysis } }) => {
          // gettint the query from the local cache and adding group
          const data = store.readQuery({ query: currentUserQuery });
          data.currentUser.analyses.push(saveAnalysis);
          store.writeQuery({ query: currentUserQuery, data });
        },
      });
      NotificationManager.success(`Die Analyse ${name} wurde erfolgreich erstellt.`);
    } catch (error) {
      // error occured -> displaying notification
      NotificationManager.error('Analyse konnte nicht gespreichert werden.');
    }
  }

  /**
   * default component render
   */
  render() {
    if (
      this.props.data.loading ||
      !this.props.data ||
      !this.props.data.currentUser
    ) {
      return <LoadingIndicator />;
    }

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
            {this.props.data.currentUser.credits &&
              this.props.data.currentUser.credits.length > 0 && (
                <CreditWidget
                  credits={this.props.data.currentUser.credits}
                  handleBuyCredits={() => console.log('buy credits!')}
                />
              )}
            <AdArea />
          </div>
        </div>
        <SaveAnalysisDialog
          isOpen={this.state.saveDialogOpen}
          onClose={() => this.setState({ saveDialogOpen: false })}
          onSave={(group) => {
            // constructing name for analysis
            const analysisName = `${
              this.props.computedMatch.params.firstNames
            } ${this.props.computedMatch.params.lastName}, ${
              this.props.computedMatch.params.dateOfBirth
            }`;
            // saving analysis
            this.saveAnalysis(analysisName, group.id);

            // hiding dialog
            this.setState({ saveDialogOpen: false });
          }}
          groups={this.props.data.currentUser.groups}
        />
        <NotificationContainer />
      </div>
    );
  }
}

export default compose(
  graphql(currentUserQuery),
  graphql(saveAnalysisMutation, { name: 'saveAnalysis' }),
)(withRouter(UserHome));
