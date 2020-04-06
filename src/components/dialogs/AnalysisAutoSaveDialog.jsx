import React, { Component } from "react";

import Dialog from "./Dialog";

class AnalysisAutoSaveDialog extends Component {
  static propTypes = {};

  static defaultProps = {};

  /**
   * default render
   */
  render() {
    return (
      <Dialog
        {...this.props}
        title="Analyse speichern"
        cancelTitle="Nein"
        actionTitle="Ja, bitte speichern"
      >
        <p>
          {`Wollen Sie diese Analyse vor dem Verlassen der Seite speichern?`}
        </p>
      </Dialog>
    );
  }
}

export default AnalysisAutoSaveDialog;
