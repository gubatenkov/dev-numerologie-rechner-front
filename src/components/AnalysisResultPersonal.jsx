import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { graphql, withApollo } from 'react-apollo';
import * as compose from 'lodash.flowright';

import { buildPersonalAnalysisQuery } from '../graphql/Queries';

import LoadingIndicator from './LoadingIndicator';
import AnalysisResultPersonalRender from './AnalysisResultPersonalRender';

/**
 * result screen for personal analysis
 */
const AnalysisResultPersonal = (props) => {
  const {data} = props;
  if (data.loading) {
    return <LoadingIndicator text="Berechne Auswertung für Namen..." />;
  }

  if (data.error) {
    return <LoadingIndicator text={data.error.message} />;
  }

  // getting result from response data
  const [personalAnalysisResult] = data.personalAnalyses;

  // returning render component with result param set (vs. analysis)
  return <AnalysisResultPersonalRender
    error={data.error}
    loading={data.loading}
    analysis={null}
    personalAnalysisResult={personalAnalysisResult}
  />;
} 

// prop types validation
AnalysisResultPersonal.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      firstNames: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      dateOfBirth: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired, 
}

// constructing query with input parameters taken from URL params
export default compose(graphql(buildPersonalAnalysisQuery(false), {
  options: params => ({
    variables: { inputs: [{
      firstNames: params.match.params.firstNames,
      lastName: params.match.params.lastName,
      dateOfBirth: params.match.params.dateOfBirth,
    }]},
  }),
}))(withApollo(withRouter(AnalysisResultPersonal)));
