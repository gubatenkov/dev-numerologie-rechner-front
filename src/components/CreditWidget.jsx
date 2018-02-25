import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Panel from './Panel';
import Card from './Card';

import '../styles/CreditWidget.css';

/**
 * Widget displaying the users different credit values
 * and allows to purchase additional credits
 */
class CreditWidget extends Component {
  static propTypes = {
    credits: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
      value: PropTypes.number.isRequired,
    })).isRequired,
    handleBuyCredits: PropTypes.func.isRequired,
  };

  /**
   * default render
   */
  render() {
    return (
      <Panel
        title="Guthaben"
        actions={[
          <a href="" key="addCredits" onClick={this.props.handleBuyCredits}>
            Kaufen
          </a>,
        ]}
      >
        <div className="card-columns creditCardColumns">
          {this.props.credits.map(credit => (
            <Card
              key={credit.type.name}
              title={credit.type.name}
              body={credit.value}
              description={credit.type.description}
            />
          ))}
        </div>
      </Panel>
    );
  }
}

export default CreditWidget;
