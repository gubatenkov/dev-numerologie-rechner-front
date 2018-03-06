import React, { Component } from 'react';
import PropTyes from 'prop-types';

import Dialog from './Dialog';

/**
 * dialog that prompts the user to confirm the deletion of an analysis
 */
class ConfirmAnalysisDeletionDialog extends Component {
  static propTypes = {
    analysis: PropTyes.shape({
      name: PropTyes.string.isRequired,
    }),
  };

  static defaultProps = {
    analysis: null,
  };

  /**
   * default render
   */
  render() {
    return (
      <Dialog
        {...this.props}
        title="Analyse löschen"
        cancelTitle="Abbrechen"
        actionTitle="Löschen"
      >
        <p>
          {`Sind Sie sicher dass Sie die Analyse "${this.props.analysis &&
            this.props.analysis.name}" löschen wollen? `}
        </p>
      </Dialog>
    );
  }
}

export default ConfirmAnalysisDeletionDialog;
