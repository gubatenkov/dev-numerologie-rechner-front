import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter, Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import ToastNotifications from 'cogo-toast';
import Button from 'react-bootstrap/Button';

import '../styles/UserHome.css';

// importing ad banners
import BANNER_BOTTOM from '../images/banner_numerologie_ausbildung.gif';
import BANNER_BOOK_1 from '../images/banner_numerologie-buecher-1.png';
import BANNER_BOOK_2 from '../images/banner_numerologie-buecher-2.png';

import TitleBar from './TitleBar';
import NavigationBar from './NavigationBar';
import AdArea from './AdArea';
import AdAreaItem from './AdAreaItem';
import AnalysisBrowser from './AnalysisBrowser';
import SaveAnalysisDialog from './dialogs/SaveAnalysisDialog';
import LoadingIndicator from './LoadingIndicator';
import ConfirmUserDeletionDialog from './dialogs/ConfirmUserDeletionDialog';
import CreditsInfoButton from './CreditsInfoButton';
import CreditsBuyModal from './CreditsBuyModal';

import { currentUserQuery } from '../graphql/Queries';
import { saveAnalysisMutation, deleteUserMutation } from '../graphql/Mutations';

import { deleteUserAuthData } from '../utils/AuthUtils';

const SAVE_ANALYSIS_COMMAND = 'saveAnalysis';

/**
 * Home screen of the user displaying analyses, groups and credits
 */
class UserHome extends Component {
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
      isBuyModalOpen: false,
      isBuyProcessing: false,
      loading: false,
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
    // setting loading state
    this.setState({
      loading: true,
    });

    // deleting user from server
    await this.props.deleteUser();

    // setting loading state
    this.setState({
      loading: false,
    });

    // logging user out
    this.handleLogout();
  };

  handleUsedCredit = () => {
    if (this.props.data && this.props.data.refetch) {
      this.props.data.refetch();
    }
  };

  toggleBuyModal = () => {
    this.setState({
      isBuyModalOpen: !this.state.isBuyModalOpen,
    });
  };

  handleBuy = () => {
    this.setState({
      isBuyProcessing: true,
    });
  };

  handleSuccessfulPurchase = () => {
    this.props.data.refetch();
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
          data.analyses.push(saveAnalysis);
          store.writeQuery({ query: currentUserQuery, data });
        },
      });
      this.setState({ loading: false });

      // redirecting to user home
      this.props.history.push('/userHome');

      // sending notification to user
      ToastNotifications.success(
        `Die Analyse ${name} wurde erfolgreich erstellt.`,
        { position: 'top-right' },
      );
    } catch (error) {
      // informing user of error
      ToastNotifications.error('Analyse konnte nicht gespreichert werden.', {
        position: 'top-right',
      });
    }
  }

  /**
   * default component render
   */
  render() {
    if (!this.props.data.loading && this.props.data.error) {
      return <Redirect to="/login" />;
    }

    if (
      this.props.data.loading
      || !this.props.data
      || !this.props.data.currentUser
      || this.state.isBuyProcessing
    ) {
      return <LoadingIndicator text="Lade..." />;
    }

    const { isBuyModalOpen } = this.state;

    return (
      <div>
        {this.state.loading && <LoadingIndicator />}
        <NavigationBar
          handleDeleteUser={() => this.setState({ userDeletionDialogOpen: true })}
        />
        <TitleBar
          primaryActionTitle="Anfrage an Berater"
          secondaryActionTitle="Neue Analyse"
          onSecondaryAction={() => this.props.history.push('/analysisInput')}
          onPrimaryAction={() => {
            ToastNotifications.error(
              'Anfragen an Numerologie-Berater sind derzeit nicht verfügbar.',
              { position: 'top-right' },
            );
          }}
          renderLeftButtons={() => (
            <>
              <CreditsInfoButton
                credits={this.props.data.currentUser.credits}
              />
              <Button variant="success" onClick={this.toggleBuyModal}>
                <i className="fa fa-icon fa-shopping-cart" />
                {' '}
Guthaben kaufen
              </Button>
            </>
          )}
        />
        <div className="UserHomeContentArea">
          <div className="UserHomeLeftAdArea">
            <AdArea horizontal={false}>
              <AdAreaItem
                link="https://www.psychologischenumerologie.eu/buecher/psychologische-numerologie-band-1/"
                image={BANNER_BOOK_1}
              />
              <AdAreaItem
                link="https://www.psychologischenumerologie.eu/buecher/psychologische-numerologie-band-2/"
                image={BANNER_BOOK_2}
              />
            </AdArea>
          </div>
          <div className="UserHomeContent">
            <AnalysisBrowser
              groups={this.props.data.currentUser.groups}
              analyses={this.props.data.analyses}
              credits={this.props.data.currentUser.credits}
              onInsuficientCredits={this.toggleBuyModal}
              onUsedCredit={this.handleUsedCredit}
            />
            <AdArea horizontal>
              <AdAreaItem
                link="https://www.psychologischenumerologie.eu/event/psychologische-numerologie-2018/2018-10-05/"
                image={BANNER_BOTTOM}
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
              const firstName = this.props.computedMatch.params.firstNames.split(
                ',',
              )[0];
              const firstNameComfort = this.props.computedMatch.params.firstNames.split(
                ',',
              )[1];
              const lastName = this.props.computedMatch.params.lastName.split(
                ',',
              )[0];
              const lastNameComfort = this.props.computedMatch.params.lastName.split(
                ',',
              )[1];
              const { dateOfBirth } = this.props.computedMatch.params;

              // constructing name
              analysisName = `${firstName} ${lastName} / ${firstNameComfort} ${lastNameComfort}, ${dateOfBirth}`;
            } else {
              // constructing name
              analysisName = `${this.props.computedMatch.params.firstNames} ${this.props.computedMatch.params.lastName}, ${this.props.computedMatch.params.dateOfBirth}`;
            }

            // saving analysis
            this.saveAnalysis(analysisName, group.id);

            // hiding dialog
            this.setState({ saveDialogOpen: false, loading: true });
          }}
          groups={this.props.data.currentUser.groups}
        />
        <ConfirmUserDeletionDialog
          isOpen={this.state.userDeletionDialogOpen}
          onClose={() => this.setState({
            userDeletionDialogOpen: false,
          })}
          onAction={() => {
            // dismissing dialog
            this.setState({ userDeletionDialogOpen: false });

            // deleting user
            this.handleDeleteUser();
          }}
        />

        <CreditsBuyModal
          credits={this.props.data.currentUser.credits}
          wpAccessToken={this.props.data.currentUser.wpAccessToken}
          show={isBuyModalOpen}
          onHide={this.toggleBuyModal}
          onBuy={this.handleBuy}
          onSuccessfulPurchase={this.handleSuccessfulPurchase}
        />
      </div>
    );
  }
}

// props validation
UserHome.propTypes = {
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

export default compose(
  graphql(currentUserQuery),
  graphql(saveAnalysisMutation, { name: 'saveAnalysis' }),
  graphql(deleteUserMutation, { name: 'deleteUser' }),
)(withRouter(UserHome));
