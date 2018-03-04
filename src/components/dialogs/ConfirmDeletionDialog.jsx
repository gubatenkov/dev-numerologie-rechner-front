import React, { Component } from 'react';
import PropTyes from 'prop-types';

import Dialog from './Dialog';

/**
 * dialog that prompts the user to confirm the deletion of a dialog
 */
class ConfirmGroupDeletionDialog extends Component {
  static propTypes = {
    group: PropTyes.shape({
      name: PropTyes.string.isRequired,
    }),
  };

  static defaultProps = {
    group: null,
  };

  /**
   * default render
   */
  render() {
    return (
      <Dialog
        {...this.props}
        title="Gruppe löschen"
        cancelTitle="Abbrechen"
        actionTitle="Löschen"
      >
        <p>
          {`Sind Sie sicher dass Sie die Gruppe "${this.props.group &&
            this.props.group.name}" und alle Analysen in dieser Gruppe
          löschen wollen? `}
        </p>
      </Dialog>
    );
  }
}

export default ConfirmGroupDeletionDialog;
