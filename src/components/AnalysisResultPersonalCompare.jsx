import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { graphql, withApollo } from 'react-apollo';
import * as compose from 'lodash.flowright';

import { personalResultsQuery } from '../graphql/Queries';

import LoadingIndicator from './LoadingIndicator';
import AnalysisResultPersonalCompareRender from './AnalysisResultPersonalCompareRender';

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
        lastNames: PropTypes.string.isRequired,
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

    return <AnalysisResultPersonalCompareRender
      {...this.props}
      error={this.props.data.error}
      loading={this.props.data.loading}
      analysis={null}
      personalAnalysisResults={personalAnalyses}
    />;
  }
}

export default compose(graphql(personalResultsQuery, {
  options: params => ({
    variables: { inputs: [{
      firstNames: params.match.params.firstNames.split(',')[0],
      lastName: params.match.params.lastNames.split(',')[0],
      dateOfBirth: params.match.params.dateOfBirth,
    }, {
      firstNames: params.match.params.firstNames.split(',')[1],
      lastName: params.match.params.lastNames.split(',')[1],
      dateOfBirth: params.match.params.dateOfBirth,
    }]},
  }),
}))(withApollo(withRouter(AnalysisResultPersonal)));
