import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { graphql, withApollo } from 'react-apollo';
import * as compose from 'lodash.flowright';

import {
  buildPersonalAnalysisByNameQuery,
  buildPersonalAnalysisByIdQuery,
} from '../graphql/Queries';

import LoadingIndicator from './LoadingIndicator';
import AnalysisResultPersonalRender from './AnalysisResultPersonalRender';
import AnalysisResultPersonalCompareRender from './AnalysisResultPersonalCompareRender';

/**
 * result screen for personal analysis
 */
const AnalysisResultPersonal = (props) => {
  const { data } = props;
  if (data.loading) {
    return <LoadingIndicator text="Berechne Auswertung für Namen..." />;
  }

  if (data.error) {
    return <LoadingIndicator text={data.error.message} />;
  }

  // getting result from response data dependent on mode of this component (id or name)
  let personalAnalysisResult = [];
  if (props.match.params.analysisId) {
    personalAnalysisResult = data.analysis.personalAnalysisResults;
  } else {
    personalAnalysisResult = data.personalAnalyses;
  }

  // determining configuration for result
  //const configuration = props.match.params.resultConfig || Con 

  // rendering single or compare result based on result
  if (personalAnalysisResult.length > 1) {
    return (
      <AnalysisResultPersonalCompareRender
        error={data.error}
        loading={data.loading}
        analysis={null}
        personalAnalysisResults={personalAnalysisResult}
        //configuration={}
      />
    );
  }

  // returning render component with result param set (vs. analysis)
  return (
    <AnalysisResultPersonalRender
      error={data.error}
      loading={data.loading}
      analysis={null}
      personalAnalysisResult={personalAnalysisResult[0]}
    />
  );
};

// prop types validation
AnalysisResultPersonal.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      firstNames: PropTypes.string,
      lastNames: PropTypes.string,
      dateOfBirth: PropTypes.string,
      analysisId: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

// constructing query with input parameters taken from URL params
export default compose(
  graphql(buildPersonalAnalysisByIdQuery(false), {
    options: (params) => ({
      // query by id (skipped if no id present)
      // returning input variables
      // initializing with fetch policy that will not use cache
      // this is needed as this query returns different results based on the user status (logged in vs. guest)
      // and the purchased and used credits for an analysis this query refers to (no credit, short/long) credit
      // Therefore caching can be likely wrong.
      variables: {
        id: parseInt(params.match.params.analysisId, 10),
        isPdf: false,
        longTexts: false,
      },
      fetchPolicy: 'network-only',
    }),
    // skipping this query if no id is provided
    skip: (params) => !params.match.params.analysisId,
  }),
  graphql(buildPersonalAnalysisByNameQuery(false), {
    options: (params) => {
      // decoding url param values
      const firstNames = decodeURIComponent(params.match.params.firstNames);
      const lastNames = decodeURIComponent(params.match.params.lastNames);
      const dateOfBirth = decodeURIComponent(params.match.params.dateOfBirth);

      // configuring options object to return
      // initializing with fetch policy that will not use cache
      // this is needed as this query returns different results based on the user status (logged in vs. guest)
      // and the purchased and used credits for an analysis this query refers to (no credit, short/long) credit
      // Therefore caching can be likely wrong.
      const options = {
        fetchPolicy: 'network-only',
      };

      // if more than one first name => splitting and getting results for both names
      if (firstNames.split(',').length > 1) {
        options.variables = {
          inputs: [
            {
              firstNames: firstNames.split(',')[0],
              lastName: lastNames.split(',')[0],
              dateOfBirth,
            },
            {
              firstNames: firstNames.split(',')[1],
              lastName: lastNames.split(',')[1],
              dateOfBirth,
            },
          ],
        };
      } else {
        options.variables = {
          inputs: [
            {
              firstNames,
              lastName: lastNames,
              dateOfBirth,
            },
          ],
        };
      }

      return options;
    },
    // skipping this query if no names are provided
    skip: (params) => !params.match.params.firstNames,
  }),
)(withApollo(withRouter(AnalysisResultPersonal)));
