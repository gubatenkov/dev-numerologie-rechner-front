import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { graphql, compose, withApollo } from 'react-apollo';

import { personalResultsQuery } from '../graphql/Queries';

import LoadingIndicator from './LoadingIndicator';
import AnalysisResultPersonalRender from './AnalysisResultPersonalRender';

/**
 * result screen for personal analysis
 */
class AnalysisResultPersonal extends Component {
  static propTypes = {
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
  };

  /**
   * default render
   */
  render() {
    if (this.props.data.loading) {
      return <LoadingIndicator text="Berechne Auswertung für Namen..." />;
    }

    if (this.props.data.error) {
      return <LoadingIndicator text={this.props.data.error.message} />;
    }

    const { personalAnalyses } = this.props.data;

    const [personalAnalysisResult] = personalAnalyses;
    return <AnalysisResultPersonalRender
      error={this.props.data.error}
      loading={this.props.data.loading}
      analysis={null}
      personalAnalysisResult={personalAnalysisResult}
    />;
  }
}

export default compose(graphql(personalResultsQuery, {
  options: params => ({
    variables: { inputs: [{
      firstNames: params.match.params.firstNames,
      lastName: params.match.params.lastName,
      dateOfBirth: params.match.params.dateOfBirth,
    }]},
  }),
}))(withApollo(withRouter(AnalysisResultPersonal)));
