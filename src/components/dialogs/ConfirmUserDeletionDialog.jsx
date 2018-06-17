import React, { Component } from 'react';

import Dialog from './Dialog';

/**
 * dialog that prompts the user to confirm the deletion of a group
 */
class ConfirmUserDeletionDialog extends Component {
  static propTypes = {};

  /**
   * default render
   */
  render() {
    return (
      <Dialog
        {...this.props}
        title="Benutzer löschen"
        cancelTitle="Abbrechen"
        actionTitle="Löschen"
      >
        <p>
          {'Sind Sie sicher, dass Sie Ihren Benutzer und alle Daten sowie alle Analysen löschen wollen?'}
        </p>
      </Dialog>
    );
  }
}

export default ConfirmUserDeletionDialog;
