import React, { Component } from 'react';
import Panel from './Panel';

import '../styles/PaketWidget.css';

/**
 * Widget that displays the current paket
 * status of the user and allows for upgrade / downgrade
 */
class PaketWidget extends Component {
  /**
   * default constructor
   */
  constructor(props) {
    super(props);

    // setting initial state
    // TODO fetch this from server or get passed
    // as prop if this becomes dumb method
    this.state = {
      packageName: 'Druck Paket',
      packageFeatures: [
        'Unbeschränkte Anzahl an Analysen',
        'Kurztextversionen der Analysen',
        'Speoicherung der Analysen',
        'Druck der Analysen',
      ],
    };
  }
  /**
   * handler for click on change plan
   */
  handleChangePlanClick = () => {
    // TODO handle change of plan here
    console.log('change plan clicked!');
  };

  /**
   * default render method
   */
  render() {
    return (
      <Panel
        title="Aktuelles Paket"
        footer={
          <p>
            * Es handelt sich um ein Abo und wird daher monatlich verlängert.
          </p>
        }
        actions={[
          <a href="" key="ChangePlan" onClick={this.handleChangePlanClick}>
            Ändern
          </a>,
        ]}
      >
        <div className="PaketWidgetContent">
          <p>Sie nutzen derzeit das:</p>
          <span className="badge badge-primary PaketWidgetContent--Badge">
            <h1>
              {this.state.packageName}
              <sup>
                <small>*</small>
              </sup>
            </h1>
          </span>
          <p>Inkludiert </p>
          <ul>
            {this.state.packageFeatures.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </Panel>
    );
  }
}

export default PaketWidget;
