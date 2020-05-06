import React, { useState } from "react";
import PropTypes from "prop-types";

import { withRouter, Redirect } from "react-router-dom";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";
import ToastNotifications from "cogo-toast";

import "../styles/UserHome.scss";

import NavigationBar from "./NavigationBar";
import AnalysisBrowser from "./AnalysisBrowser";
import SaveAnalysisDialog from "./dialogs/SaveAnalysisDialog";
import LoadingIndicator from "./LoadingIndicator";
import CreditsBuyModal from "./CreditsBuy/CreditsBuyModal";
import Footer from "./Footer";

import { saveAnalysisMutation } from "../graphql/Mutations";
import MainContainer from "./MainContainer";
import CreditsOverview from "./CreditsOverview";
import { useUser } from "../contexts/UserContext";
const SAVE_ANALYSIS_COMMAND = "saveAnalysis";

/**
 * Home screen of the user displaying analyses, groups and credits
 */
const UserHome = props => {
  const [saveDialogOpen, setSaveDialogOpen] = useState(
    props.computedMatch.params.userAction === SAVE_ANALYSIS_COMMAND
  );
  const [loading, setLoading] = useState(false);
  const User = useUser();
  const handleUsedCredit = () => {
    User.fetchUser();
  };

  /**
   * saves the analysis passed to user home
   * @param name: the name of the new analysis
   * @param groupId: the id of the group of the new analysis
   */
  async function saveAnalysis(name, groupId) {
    // decoding url param values
    const firstNames = decodeURIComponent(
      props.computedMatch.params.firstNames
    );
    const lastNames = decodeURIComponent(props.computedMatch.params.lastNames);
    const dateOfBirth = decodeURIComponent(
      props.computedMatch.params.dateOfBirth
    );

    // one or more names?
    let nameInputs = [];
    if (lastNames.split(",").length > 1) {
      const firstNamesArray = firstNames.split(",");
      const lastNamesArray = lastNames.split(",");
      nameInputs = firstNamesArray.map((item, index) => ({
        firstNames: item,
        lastName: lastNamesArray[index],
        dateOfBirth
      }));
    } else {
      nameInputs = [
        {
          firstNames,
          lastName: lastNames,
          dateOfBirth
        }
      ];
    }

    try {
      // performing mutation call
      await props.saveAnalysis({
        variables: {
          name,
          group: groupId,
          inputs: nameInputs
        }
      });

      setLoading(false);

      // redirecting to user home
      props.history.push("/userHome");

      // sending notification to user
      ToastNotifications.success(
        `Die Analyse ${name} wurde erfolgreich erstellt.`,
        { position: "top-right" }
      );

      // graphql ignores refetches if the same call is already pending, therefore we wait 2sec (randomly) and continue with a refetch
      setTimeout(() => {
        User.fetchUser();
      }, 2000);
    } catch (error) {
      // informing user of error
      ToastNotifications.error("Analyse konnte nicht gespreichert werden.", {
        position: "top-right"
      });
    }
  }

  if (!User.isFetching && !User.user) {
    console.log("GQL error");
    return <Redirect to="/login" />;
  }

  if (props.error) {
    console.log(props.error);
  }

  if (!User.user) {
    return <LoadingIndicator text="Lade..." />;
  }

  return (
    <MainContainer>
      {loading && <LoadingIndicator />}
      <NavigationBar />
      <div className="UserHomeContentArea">
        <div className="UserHomeContent">
          <CreditsOverview credits={User.user.currentUser.credits} />
          <AnalysisBrowser
            groups={User.user.currentUser.groups}
            analyses={User.user.analyses}
            credits={User.user.currentUser.credits}
            onUsedCredit={handleUsedCredit}
            resultConfiguration={User.user.currentUser.resultConfiguration}
            onRefetch={() => {
              User.fetchUser();
            }}
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
        isOpen={saveDialogOpen}
        onClose={() => setSaveDialogOpen(false)}
        onSave={group => {
          // decoding url param values
          const firstNames = decodeURIComponent(
            props.computedMatch.params.firstNames
          );
          const lastNames = decodeURIComponent(
            props.computedMatch.params.lastNames
          );
          const dateOfBirth = decodeURIComponent(
            props.computedMatch.params.dateOfBirth
          );

          // constructing name for analysis
          let analysisName;
          if (lastNames.split(",").length > 1) {
            // gettin names
            const firstName = firstNames.split(",")[0];
            const firstNameComfort = firstNames.split(",")[1];
            const lastName = lastNames.split(",")[0];
            const lastNameComfort = lastNames.split(",")[1];

            // constructing name
            analysisName = `${firstName} ${lastName} / ${firstNameComfort} ${lastNameComfort}, ${dateOfBirth}`;
          } else {
            // constructing name
            analysisName = `${firstNames} ${lastNames}, ${dateOfBirth}`;
          }

          // saving analysis
          saveAnalysis(analysisName, group.id);
          // hiding dialog
          setSaveDialogOpen(false);
          setLoading(true);
        }}
        groups={User.user.currentUser.groups}
      />
      <CreditsBuyModal />
      <Footer />
    </MainContainer>
  );
};

// props validation
UserHome.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  computedMatch: PropTypes.shape({
    params: PropTypes.shape({
      userAction: PropTypes.string,
      firstNames: PropTypes.string,
      lastName: PropTypes.string,
      dateOfBirth: PropTypes.string
    })
  }).isRequired,
  saveAnalysis: PropTypes.func.isRequired
};

export default compose(graphql(saveAnalysisMutation, { name: "saveAnalysis" }))(
  withRouter(UserHome)
);
