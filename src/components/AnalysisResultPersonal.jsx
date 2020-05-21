import React from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
import { graphql, withApollo, useQuery } from "react-apollo";
import * as compose from "lodash.flowright";
import { useTranslation } from "react-i18next";
import {
  buildPersonalAnalysisByNameQuery,
  buildPersonalAnalysisByIdQuery,
  userSettingsQuery
} from "../graphql/Queries";

import { useLoadingOverlay } from "../contexts/LoadingOverlayContext";
import AnalysisResultPersonalRender from "./AnalysisResultPersonalRender";
import { useUser } from "../contexts/UserContext";
import { prepOptionsAnalysisByName } from "../utils/GraphlqlUtil";

const AnalysisResultPersonal = props => {
  const { t } = useTranslation();
  const LoadingOverlay = useLoadingOverlay();
  const User = useUser();

  const {
    personalAnalysesById,
    currentUser,
    match: { params }
  } = props;
  let personalAnalysisResults = [];
  let config = [];

  const options = prepOptionsAnalysisByName(params, User.currentLanguage.id);

  const personalAnalysesByNames = useQuery(
    buildPersonalAnalysisByNameQuery,
    options
  );
  if (
    (personalAnalysesById && personalAnalysesById.loading) ||
    (personalAnalysesByNames && personalAnalysesByNames.loading) ||
    (currentUser && currentUser.loading)
  ) {
    LoadingOverlay.showWithText(t("CALCULATING_RESULT_FOR_NAME"));
    return null;
  }

  const error =
    (personalAnalysesById && personalAnalysesById.error) ||
    (personalAnalysesByNames && personalAnalysesByNames.error);
  if (error) {
    console.error(error);
    LoadingOverlay.showWithText(t("ERROR_OCCURED"));
    return null;
  }

  // if current user query throws error => this means user is not authenticated
  if (currentUser && currentUser.error) {
    console.log("user not authenticated");
  }

  // this component fetches results in two cases
  // a) An id of a stored analysis is provided => fetching result based on input parameters of stored id
  // b) Input parameters (names + dob) are provided => fetching results based on input parameters passed
  // both queries are configured for this component and are skipped if the params are not passed

  if (params.analysisId && personalAnalysesById) {
    User.setCurrentAnalysis(personalAnalysesById);
    personalAnalysisResults =
      personalAnalysesById.analysis.personalAnalysisResults;
    config = personalAnalysesById.analysisConfiguration;
  } else {
    User.setCurrentAnalysis(personalAnalysesByNames);
    personalAnalysisResults =
      personalAnalysesByNames.data.personalAnalysisResults;
    config = personalAnalysesByNames.data.analysisConfiguration;
  }

  LoadingOverlay.hide();

  return (
    <AnalysisResultPersonalRender
      personalAnalysisResult={personalAnalysisResults[0]}
      personalAnalysisCompareResult={personalAnalysisResults[1]}
      configuration={config}
      user={currentUser.currentUser}
    />
  );
};

AnalysisResultPersonal.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      firstNames: PropTypes.string,
      lastNames: PropTypes.string,
      dateOfBirth: PropTypes.string,
      analysisId: PropTypes.string
    }).isRequired
  }).isRequired
};

export default compose(
  graphql(userSettingsQuery, {
    name: "currentUser"
  }),
  graphql(buildPersonalAnalysisByIdQuery, {
    options: params => ({
      variables: {
        id: parseInt(params.match.params.analysisId, 10),
        isPdf: false,
        longTexts: false
      },
      update: "network-only"
    }),
    skip: params => !params.match.params.analysisId,
    name: "personalAnalysesById"
  })
)(withApollo(withRouter(AnalysisResultPersonal)));
