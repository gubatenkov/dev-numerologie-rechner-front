import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { withRouter, Redirect } from "react-router-dom";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";

import "../styles/UserHome.scss";

import NavigationBar from "./NavigationBar";
import AnalysisBrowser from "./AnalysisBrowser";
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

const UserHome = props => {
  const { t } = useTranslation();

  const LoadingOverlay = useLoadingOverlay();
  const User = useUser();
  const handleUsedCredit = () => {
    User.fetchUser();
  };

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
