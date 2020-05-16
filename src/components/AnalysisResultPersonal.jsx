import React from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
import { graphql, withApollo } from "react-apollo";
import * as compose from "lodash.flowright";
import { useTranslation } from "react-i18next";
import {
  buildPersonalAnalysisByNameQuery,
  buildPersonalAnalysisByIdQuery,
  userSettingsQuery
} from "../graphql/Queries";

import { useLoadingOverlay } from "../contexts/LoadingOverlayContext";
import AnalysisResultPersonalRender from "./AnalysisResultPersonalRender";
import { deleteUserAuthData } from "../utils/AuthUtils";

const AnalysisResultPersonal = props => {
  const { t } = useTranslation();
  const LoadingOverlay = useLoadingOverlay();

  const { personalAnalysesById, personalAnalysesByNames, currentUser } = props;
  let personalAnalysisResults = [];

  try {
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

    if (props.match.params.analysisId && personalAnalysesById) {
      personalAnalysisResults =
        personalAnalysesById.analysis.personalAnalysisResults;
    } else {
      personalAnalysisResults = personalAnalysesByNames.personalAnalysisResults;
    }
  } catch (error) {
    console.log("error AnalysisResultPersonal:", error.message);
    deleteUserAuthData();
    props.history.push("/login");
  }

  LoadingOverlay.hide();

  return (
    <AnalysisResultPersonalRender
      personalAnalysisResult={personalAnalysisResults[0]}
      personalAnalysisCompareResult={personalAnalysisResults[1]}
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
  graphql(buildPersonalAnalysisByIdQuery(false), {
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
  }),
  graphql(buildPersonalAnalysisByNameQuery(false), {
    options: params => {
      const firstNames = decodeURIComponent(params.match.params.firstNames);
      const lastNames = decodeURIComponent(params.match.params.lastNames);
      const dateOfBirth = decodeURIComponent(params.match.params.dateOfBirth);

      const options = {
        fetchPolicy: "network-only"
      };

      // if more than one first name => splitting and getting results for both names
      if (firstNames.split(",").length > 1) {
        options.variables = {
          inputs: [
            {
              firstNames: firstNames.split(",")[0],
              lastName: lastNames.split(",")[0],
              dateOfBirth
            },
            {
              firstNames: firstNames.split(",")[1],
              lastName: lastNames.split(",")[1],
              dateOfBirth
            }
          ]
        };
      } else {
        options.variables = {
          inputs: [
            {
              firstNames,
              lastName: lastNames,
              dateOfBirth
            }
          ]
        };
      }

      return options;
    },

    skip: params => !params.match.params.firstNames,
    name: "personalAnalysesByNames"
  })
)(withApollo(withRouter(AnalysisResultPersonal)));
