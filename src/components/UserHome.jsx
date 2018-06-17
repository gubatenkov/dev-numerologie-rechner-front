import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';

import '../styles/UserHome.css';

// importing ad banners
import BANNER_NEWLETTER from '../images/banner_newletter.gif';
import BANNER_BOOKS from '../images/banner_books.gif';

import TitleBar from './TitleBar';
import NavigationBar from './NavigationBar';
import AdArea from './AdArea';
import AdAreaItem from './AdAreaItem';
import AnalysisBrowser from './AnalysisBrowser';
import CreditWidget from './CreditWidget';
import SaveAnalysisDialog from './dialogs/SaveAnalysisDialog';
import LoadingIndicator from './LoadingIndicator';
import ConfirmUserDeletionDialog from './dialogs/ConfirmUserDeletionDialog';

import { currentUserQuery } from '../graphql/Queries';
import { saveAnalysisMutation, deleteUserMutation } from '../graphql/Mutations';

import { deleteUserAuthData } from '../utils/AuthUtils';

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
    deleteUser: PropTypes.func.isRequired,
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
      userDeletionDialogOpen: false,
    };
  }

  /**
   * handler for logout click
   */
  handleLogout = () => {
    // removing token from local storage => logout
    deleteUserAuthData();

    // navigating to input for user
    this.props.history.push('/analysisInput');

    // reloading to clear cache
    window.location.reload();
  };

  /**
   * handler for deleting the current user
   */
  handleDeleteUser = async () => {
    // deleting user from server
    await this.props.deleteUser();

    // logging user out
    this.handleLogout();
  };

  /**
   * saves the analysis passed to user home
   * @param name: the name of the new analysis
   * @param groupId: the id of the group of the new analysis
   */
  async saveAnalysis(name, groupId) {
    // one or more names?
    let nameInputs = [];
    if (this.props.computedMatch.params.lastName.split(',').length > 1) {
      const firstNames = this.props.computedMatch.params.firstNames.split(',');
      const lastNames = this.props.computedMatch.params.lastName.split(',');
      nameInputs = firstNames.map((item, index) => ({
        firstNames: item,
        lastName: lastNames[index],
        dateOfBirth: this.props.computedMatch.params.dateOfBirth,
      }));
    } else {
      nameInputs = [
        {
          firstNames: this.props.computedMatch.params.firstNames,
          lastName: this.props.computedMatch.params.lastName,
          dateOfBirth: this.props.computedMatch.params.dateOfBirth,
        },
      ];
    }

    try {
      // performing mutation call
      await this.props.saveAnalysis({
        variables: {
          name,
          group: groupId,
          inputs: nameInputs,
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
        <NavigationBar
          handleDeleteUser={() =>
            this.setState({ userDeletionDialogOpen: true })
          }
        />
        <TitleBar
          primaryActionTitle="Anfrage an Berater"
          secondaryActionTitle="Neue Analyse"
          onSecondaryAction={() => this.props.history.push('/analysisInput')}
          onPrimaryAction={() =>
            NotificationManager.error('Anfragen an Numerologie-Berater sind derzeit nicht verfügbar.')
          }
        />
        <div className="UserHomeContentArea">
          <div className="UserHomeLeftAdArea">
            <AdArea horizontal={false}>
              <AdAreaItem
                link="https://www.psychologischenumerologie.eu/buecher/psychologische-numerologie-band-1/"
                image={BANNER_BOOKS}
              />
              <AdAreaItem
                link="https://www.psychologischenumerologie.eu/buecher/psychologische-numerologie-band-2/"
                image={BANNER_BOOKS}
              />
            </AdArea>
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
            <AdArea horizontal>
              <AdAreaItem
                link="https://www.psychologischenumerologie.eu/newsletter/"
                image={BANNER_NEWLETTER}
              />
              <AdAreaItem
                link="https://www.psychologischenumerologie.eu/events/list/"
                image={BANNER_NEWLETTER}
              />
            </AdArea>
          </div>
        </div>
        <SaveAnalysisDialog
          isOpen={this.state.saveDialogOpen}
          onClose={() => this.setState({ saveDialogOpen: false })}
          onSave={(group) => {
            // constructing name for analysis
            let analysisName;
            if (
              this.props.computedMatch.params.lastName.split(',').length > 1
            ) {
              // gettin names
              const firstName = this.props.computedMatch.params.firstNames.split(',')[0];
              const firstNameComfort = this.props.computedMatch.params.firstNames.split(',')[1];
              const lastName = this.props.computedMatch.params.lastName.split(',')[0];
              const lastNameComfort = this.props.computedMatch.params.lastName.split(',')[1];
              const { dateOfBirth } = this.props.computedMatch.params;

              // constructing name
              analysisName = `${firstName} ${lastName} / ${firstNameComfort} ${lastNameComfort}, ${dateOfBirth}`;
            } else {
              // constructing name
              analysisName = `${this.props.computedMatch.params.firstNames} ${
                this.props.computedMatch.params.lastName
              }, ${this.props.computedMatch.params.dateOfBirth}`;
            }

            // saving analysis
            this.saveAnalysis(analysisName, group.id);

            // hiding dialog
            this.setState({ saveDialogOpen: false });
          }}
          groups={this.props.data.currentUser.groups}
        />
        <ConfirmUserDeletionDialog
          isOpen={this.state.userDeletionDialogOpen}
          onClose={() =>
            this.setState({
              userDeletionDialogOpen: false,
            })
          }
          onAction={() => {
            // dismissing dialog
            this.setState({ userDeletionDialogOpen: false });

            // deleting user
            this.handleDeleteUser();
          }}
        />
        <NotificationContainer />
      </div>
    );
  }
}

export default compose(
  graphql(currentUserQuery),
  graphql(saveAnalysisMutation, { name: 'saveAnalysis' }),
  graphql(deleteUserMutation, { name: 'deleteUser' }),
)(withRouter(UserHome));
