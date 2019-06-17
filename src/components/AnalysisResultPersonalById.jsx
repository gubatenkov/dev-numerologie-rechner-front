import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { graphql, compose, withApollo } from 'react-apollo';

import { personalResultsByIdQuery } from '../graphql/Queries';

import AnalysisResultPersonalRender from './AnalysisResultPersonalRender';

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
    return <AnalysisResultPersonalRender {...this.props} />;
  }
}

export default compose(graphql(personalResultsByIdQuery, {
  options: params => ({ variables: {
      id: parseInt(params.match.params.analysisId, 10),
      longTexts: false,
    },
  }),
}))(withApollo(withRouter(AnalysisResultPersonalById)));
