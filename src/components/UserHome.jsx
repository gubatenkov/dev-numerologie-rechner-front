import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter, Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import ToastNotifications from 'cogo-toast';

import '../styles/UserHome.scss';

import NavigationBar from './NavigationBar';
import AnalysisBrowser from './AnalysisBrowser';
import SaveAnalysisDialog from './dialogs/SaveAnalysisDialog';
import LoadingIndicator from './LoadingIndicator';
import CreditsBuyModal from './CreditsBuyModal';
import Footer from './Footer';

import { currentUserQuery } from '../graphql/Queries';
import { saveAnalysisMutation } from '../graphql/Mutations';
import MainContainer from './MainContainer';
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
      isBuyModalOpen: false,
      isBuyProcessing: false,
      loading: false,
    };
  }

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
    // decoding url param values
    const firstNames = decodeURIComponent(
      this.props.computedMatch.params.firstNames
    );
    const lastNames = decodeURIComponent(
      this.props.computedMatch.params.lastNames
    );
    const dateOfBirth = decodeURIComponent(
      this.props.computedMatch.params.dateOfBirth
    );

    // one or more names?
    let nameInputs = [];
    if (lastNames.split(',').length > 1) {
      const firstNamesArray = firstNames.split(',');
      const lastNamesArray = lastNames.split(',');
      nameInputs = firstNamesArray.map((item, index) => ({
        firstNames: item,
        lastName: lastNamesArray[index],
        dateOfBirth,
      }));
    } else {
      nameInputs = [
        {
          firstNames,
          lastName: lastNames,
          dateOfBirth,
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
        { position: 'top-right' }
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
      console.log('GQL error');
      console.log(this.props.data.error);
      return <Redirect to="/login" />;
    }

    if (this.props.error) {
      console.log(this.props.error);
    }

    if (
      this.props.data.loading ||
      !this.props.data ||
      !this.props.data.currentUser ||
      this.state.isBuyProcessing
    ) {
      return <LoadingIndicator text="Lade..." />;
    }

    const { isBuyModalOpen } = this.state;

    return (
      <MainContainer>
        {this.state.loading && <LoadingIndicator />}
        <NavigationBar
          handleDeleteUser={() =>
            this.setState({ userDeletionDialogOpen: true })
          }
        />
        <div className="UserHomeContentArea">
          <div className="UserHomeContent">
            <AnalysisBrowser
              groups={this.props.data.currentUser.groups}
              analyses={this.props.data.analyses}
              credits={this.props.data.currentUser.credits}
              onInsufficientCredits={this.toggleBuyModal}
              onUsedCredit={this.handleUsedCredit}
              resultConfiguration={
                this.props.data.currentUser.resultConfiguration
              }
            />
            {/* We will hide Ads at the beginning */}
            {/*<AdArea horizontal>*/}
              {/*<AdAreaItem*/}
                {/*link="https://www.psychologischenumerologie.eu/event/psychologische-numerologie-2018/2018-10-05/"*/}
                {/*image={BANNER_BOTTOM}*/}
              {/*/>*/}
            {/*</AdArea>*/}
          </div>
        </div>
        <SaveAnalysisDialog
          isOpen={this.state.saveDialogOpen}
          onClose={() => this.setState({ saveDialogOpen: false })}
          onSave={group => {
            // decoding url param values
            const firstNames = decodeURIComponent(
              this.props.computedMatch.params.firstNames
            );
            const lastNames = decodeURIComponent(
              this.props.computedMatch.params.lastNames
            );
            const dateOfBirth = decodeURIComponent(
              this.props.computedMatch.params.dateOfBirth
            );

            // constructing name for analysis
            let analysisName;
            if (lastNames.split(',').length > 1) {
              // gettin names
              const firstName = firstNames.split(',')[0];
              const firstNameComfort = firstNames.split(',')[1];
              const lastName = lastNames.split(',')[0];
              const lastNameComfort = lastNames.split(',')[1];

              // constructing name
              analysisName = `${firstName} ${lastName} / ${firstNameComfort} ${lastNameComfort}, ${dateOfBirth}`;
            } else {
              // constructing name
              analysisName = `${firstNames} ${lastNames}, ${dateOfBirth}`;
            }

            // saving analysis
            this.saveAnalysis(analysisName, group.id);

            // hiding dialog
            this.setState({ saveDialogOpen: false, loading: true });
          }}
          groups={this.props.data.currentUser.groups}
        />

        <CreditsBuyModal
          credits={this.props.data.currentUser.credits}
          wpAccessToken={this.props.data.currentUser.wpAccessToken}
          show={isBuyModalOpen}
          onHide={this.toggleBuyModal}
          onBuy={this.handleBuy}
          onSuccessfulPurchase={this.handleSuccessfulPurchase}
        />
        <Footer />
      </MainContainer>
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
};

export default compose(
  graphql(currentUserQuery),
  graphql(saveAnalysisMutation, { name: 'saveAnalysis' })
)(withRouter(UserHome));
