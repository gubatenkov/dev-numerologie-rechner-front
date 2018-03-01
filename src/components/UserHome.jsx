import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

import '../styles/UserHome.css';

import TitleBar from './TitleBar';
import NavigationBar from './NavigationBar';
import AdArea from './AdArea';
import AnalysisBrowser from './AnalysisBrowser';
import CreditWidget from './CreditWidget';
import SaveAnalysisDialog from './dialogs/SaveAnalysisDialog';
import CreateGroupDialog from './dialogs/CreateGroupDialog';
import LoadingIndicator from './LoadingIndicator';

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
        group {
          id
        }
        inputs {
          firstNames
          lastName
          dateOfBirth
        }
      }
      credits {
        type {
          name
          description
        }
        value
      }
    }
  }
`;

const createGroupMutation = gql`
  mutation createGroup($groupName: String!) {
    createAnalysisGroup(name: $groupName) {
      id
      name
    }
  }
`;

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
    createGroup: PropTypes.func.isRequired,
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
      createGroupDialogOpen: false,
      createAnalysisDialogOpen: false,
    };
  }

  /**
   * handler for the creation of a group
   * @param groupName the name of the new group to be created
   */
  handleCreateGroup = (groupName) => {
    // performing mutation call
    this.props
      .createGroup({
        variables: {
          groupName,
        },
      })
      .then(() =>
        NotificationManager.success(`Die Gruppe ${groupName} wurde erfolgreich erstellt.`));
  };

  /**
   * handler for renaming a group
   * @param id the id of the group to be renamed
   * @param newName the name to rename into
   */
  handleRenameGroup = (id, newName) => {
    // todo implement
    console.log(`Renaming Group ${id} into ${newName}`);
  };

  /**
   * handler for deleting a group
   * @param id: the id of the group to be deleted
   */
  handleDeleteGroup = (id) => {
    // todo implement
    console.log(`Deleting Group ${id}`);
  };

  /**
   * default component render
   */
  render() {
    if (this.props.data.loading) {
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
              handleCreateGroup={() =>
                this.setState({ createGroupDialogOpen: true })
              }
              handleCreateAnalysis={() => {
                this.setState({ createAnalysisDialogOpen: true });
              }}
            />
            <CreditWidget
              credits={this.props.data.currentUser.credits}
              handleBuyCredits={() => console.log('buy credits!')}
            />
            <AdArea />
          </div>
        </div>
        <SaveAnalysisDialog
          isOpen={this.state.saveDialogOpen}
          onClose={() => this.setState({ saveDialogOpen: false })}
          onSave={() => this.setState({ saveDialogOpen: false })}
          groups={this.props.data.currentUser.groups.map(item => item.name)}
        />
        <CreateGroupDialog
          isOpen={this.state.createGroupDialogOpen}
          onClose={() => this.setState({ createGroupDialogOpen: false })}
          onAction={(groupName) => {
            // calling handler
            this.handleCreateGroup(groupName);

            // hiding dialog
            this.setState({ createGroupDialogOpen: false });
          }}
          groups={this.props.data.currentUser.groups.map(item => item.name)}
        />
        <NotificationContainer />
      </div>
    );
  }
}

export default compose(
  graphql(currentUserQuery),
  graphql(createGroupMutation, { name: 'createGroup' }),
)(withRouter(UserHome));
