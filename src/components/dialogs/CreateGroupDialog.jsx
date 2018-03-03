import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from './Dialog';

/**
 * Dialog to save an analysis
 */
class CreateGroupDialog extends Component {
  static propTypes = {
    groups: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAction: PropTypes.func,
  };

  static defaultProps = {
    onAction: () => {},
  };

  /**
   * default lifecylce method
   */
  componentDidUpdate() {
    // if rendered and input is there -> focusing
    if (this.groupNameInput) {
      this.groupNameInput.focus();
    }
  }

  // member for the group name
  groupName = null;

  // input ref
  groupNameInput = null;

  /**
   * handler for clicks on the create button
   */
  handleCreateClick = () => {
    // todo add validation
    if (this.groupName) {
      this.props.onAction(this.groupName);
    }
  };

  /**
   * handler for the user changing the name of the new group
   * @param newGroupName: the new input text to the group name field
   */
  handleInputchange = (newGroupName) => {
    this.groupName = newGroupName.target.value;
  };

  /**
   * default render method
   */
  render() {
    return (
      <Dialog
        {...this.props}
        onAction={this.handleCreateClick}
        title="Neue Gruppe erstellen"
        cancelTitle="Abbrechen"
        actionTitle="Erstellen"
      >
        <p>Bitte geben Sie den Namen der neuen Gruppe an</p>
        <input
          type="text"
          className="form-control"
          placeholder="Neue Gruppe"
          onChange={this.handleInputchange}
          ref={(ref) => {
            this.groupNameInput = ref;
          }}
        />
      </Dialog>
    );
  }
}

export default CreateGroupDialog;
