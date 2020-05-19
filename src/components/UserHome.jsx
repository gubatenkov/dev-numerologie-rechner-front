import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { withRouter, Redirect } from "react-router-dom";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";
import ToastNotifications from "cogo-toast";

import "../styles/UserHome.scss";

import NavigationBar from "./NavigationBar";
import AnalysisBrowser from "./AnalysisBrowser";
import SaveAnalysisDialog from "./dialogs/SaveAnalysisDialog";
import {
  useLoadingOverlay,
  LoadingOverlayProvider
} from "../contexts/LoadingOverlayContext";
import LoadingOverlayComp from "./LoadingOverlay";
import CreditsBuyModal from "./CreditsBuy/CreditsBuyModal";
import Footer from "./Footer";

import { saveAnalysisMutation } from "../graphql/Mutations";
import MainContainer from "./MainContainer";
import CreditsOverview from "./CreditsOverview";
import { useUser } from "../contexts/UserContext";

const SAVE_ANALYSIS_COMMAND = "saveAnalysis";

const UserHome = props => {
  const { t } = useTranslation();

  const [saveDialogOpen, setSaveDialogOpen] = useState(
    props.computedMatch.params.userAction === SAVE_ANALYSIS_COMMAND
  );
  const LoadingOverlay = useLoadingOverlay();
  const User = useUser();
  const handleUsedCredit = () => {
    User.fetchUser();
  };

  async function saveAnalysis(name, groupId) {
    const firstNames = decodeURIComponent(
      props.computedMatch.params.firstNames
    );
    const lastNames = decodeURIComponent(props.computedMatch.params.lastNames);
    const dateOfBirth = decodeURIComponent(
      props.computedMatch.params.dateOfBirth
    );

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
      await props.saveAnalysis({
        variables: {
          name,
          group: groupId,
          inputs: nameInputs
        }
      });

      LoadingOverlay.hide();

      props.history.push("/userHome");

      ToastNotifications.success(
        t("TOAST.ANALYSIS_CREATED_SUCCESSFULLY", {
          name
        }),
        { position: "top-right" }
      );

      // graphql ignores refetches if the same call is already pending, therefore we wait 2sec (randomly) and continue with a refetch
      setTimeout(() => {
        User.fetchUser();
      }, 2000);
    } catch (error) {
      ToastNotifications.error(
        t("TOAST.GRAPHQL_ERROR", { errorMessage: error.message }),
        {
          position: "top-right"
        }
      );
    }
  }

  if (!User.isFetching && !User.user) {
    console.log("GQL error: no User");
    return <Redirect to="/login" />;
  }

  if (props.error) {
    console.log(props.error);
  }

  if (!User.user) {
    LoadingOverlay.showWithText(t("LOADING"));
    return null;
  }
  LoadingOverlay.hide();
  return (
    <MainContainer>
      <NavigationBar />
      <div className="UserHomeContentArea">
        <div className="UserHomeContent">
          <CreditsOverview credits={User.user.currentUser.credits} />
          <LoadingOverlayProvider>
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
            <LoadingOverlayComp />
          </LoadingOverlayProvider>
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
          const firstNames = decodeURIComponent(
            props.computedMatch.params.firstNames
          );
          const lastNames = decodeURIComponent(
            props.computedMatch.params.lastNames
          );
          const dateOfBirth = decodeURIComponent(
            props.computedMatch.params.dateOfBirth
          );

          let analysisName;
          if (lastNames.split(",").length > 1) {
            const firstName = firstNames.split(",")[0];
            const firstNameComfort = firstNames.split(",")[1];
            const lastName = lastNames.split(",")[0];
            const lastNameComfort = lastNames.split(",")[1];

            analysisName = `${firstName} ${lastName} / ${firstNameComfort} ${lastNameComfort}, ${dateOfBirth}`;
          } else {
            analysisName = `${firstNames} ${lastNames}, ${dateOfBirth}`;
          }

          saveAnalysis(analysisName, group.id);
          setSaveDialogOpen(false);
          LoadingOverlay.showWithText();
        }}
        groups={User.user.currentUser.groups}
      />
      <CreditsBuyModal />
      <Footer />
    </MainContainer>
  );
};

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
