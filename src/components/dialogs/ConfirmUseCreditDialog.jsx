import React, { Component } from 'react';
import PropTyes from 'prop-types';

import Dialog from './Dialog';

/**
 * dialog that prompts the user to confirm the deletion of an analysis
 */
class ConfirmUseCreditDialog extends Component {
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
        title="Guthaben verwenden"
        cancelTitle="Abbrechen"
        actionTitle="Ja, bitte Guthaben verwenden"
      >
        <p>
          {`Sie sind dabei, einen Guthaben-Punkt für die Erstellung eines Numeroskop-PDFs zu verwenden. Möchten Sie dies? `}
        </p>
      </Dialog>
    );
  }
}

export default ConfirmUseCreditDialog;
