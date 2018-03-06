import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from './Dialog';

/**
 * Dialog to rename a group
 */
class RenameGroupDialog extends Component {
  static propTypes = {
    group: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    group: null,
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
  handleRenameClick = () => {
    // todo add validation
    if (this.groupName) {
      this.props.onAction(this.props.group.id, this.groupName);
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
        onAction={this.handleRenameClick}
        title="Gruppe umbenennen"
        cancelTitle="Abbrechen"
        actionTitle="Umbenennen"
      >
        <p>
          {`Bitte geben Sie den neuen Namen für ${this.props.group &&
            this.props.group.name} an.`}
        </p>
        <input
          type="text"
          className="form-control"
          placeholder={this.props.group && this.props.group.name}
          onChange={this.handleInputchange}
          ref={(ref) => {
            this.groupNameInput = ref;
          }}
        />
      </Dialog>
    );
  }
}

export default RenameGroupDialog;
