import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { graphql, withApollo } from 'react-apollo';
import * as compose from 'lodash.flowright';

import { personalResultsByIdQuery } from '../graphql/Queries';

import LoadingIndicator from './LoadingIndicator';
import AnalysisResultPersonalRender from './AnalysisResultPersonalRender';
import AnalysisResultPersonalCompareRender from './AnalysisResultPersonalCompareRender';

class AnalysisResultPersonalById extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        analysisId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  render() {
    if (this.props.data.loading) {
      return <LoadingIndicator text="Berechne Auswertung für Namen..." />;
    }

    if (this.props.data.error) {
      return <LoadingIndicator text={this.props.data.error.message} />;
    }

    const { data } = this.props;
    const { analysis: baseAnalysis } = data;
    const { personalAnalysisResults, ...analysis } = baseAnalysis;

    if (personalAnalysisResults.length === 2) {
      return <AnalysisResultPersonalCompareRender
        {...this.props}
        error={data.error}
        loading={data.loading}
        analysis={analysis}
        personalAnalysisResults={personalAnalysisResults}
      />;
    }

    const [personalAnalysisResult] = personalAnalysisResults;
    return <AnalysisResultPersonalRender
      error={data.error}
      loading={data.loading}
      analysis={analysis}
      personalAnalysisResult={personalAnalysisResult}
    />;
  }
}

export default compose(graphql(personalResultsByIdQuery, {
  options: params => ({ variables: {
      id: parseInt(params.match.params.analysisId, 10),
      isPdf: false,
      longTexts: false,
    },
  }),
}))(withApollo(withRouter(AnalysisResultPersonalById)));
