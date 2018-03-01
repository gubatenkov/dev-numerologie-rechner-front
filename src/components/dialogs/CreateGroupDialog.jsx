import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from './Dialog';

/**
 * Dialog to save an analysis
 */
class CreateGroupDialog extends Component {
  static propTypes = {
    groups: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {};

  /**
   * default render method
   */
  render() {
    return (
      <Dialog
        {...this.props}
        title="Neue Gruppe erstellen"
        cancelTitle="Abbrechen"
        actionTitle="Erstellen"
      >
        <p>
          Bitte geben Sie den Namen der neuen Gruppe an
        </p>
        <input type="text" className="form-control" placeholder="Neue Gruppe" />
      </Dialog>
    );
  }
}

export default CreateGroupDialog;
