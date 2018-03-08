import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from './Dialog';

/**
 * Dialog to save an analysis
 */
class SaveAnalysisDialog extends Component {
  static propTypes = {
    groups: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })).isRequired,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isOpen: false,
  };

  /**
   * default constructor
   */
  constructor(props) {
    super(props);

    // setting default group
    [this.selectedGroup] = this.props.groups;
  }

  // selected group
  selectedGroup = null;

  /**
   * default render method
   */
  render() {
    return (
      <Dialog
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        onAction={() =>
          this.props.onSave(this.selectedGroup)
        }
        title="Analyse Speichern"
        cancelTitle="Abbrechen"
        actionTitle="Speichern"
      >
        <p>Gruppe</p>
        <div className="dropdown">
          <select
            className="form-control"
            onChange={(newSelect) => {
              // setting group
              this.selectedGroup = this.props.groups.find(item => item.name === newSelect.target.value);
            }}
          >
            {this.props.groups.map(item => (
              <option key={item.name}>{item.name}</option>
            ))}
          </select>
        </div>
        <p>
          <small>
            Bitte geben Sie die Gruppe an der die Analyse zugeordnet werden
            soll.
          </small>
        </p>
      </Dialog>
    );
  }
}

export default SaveAnalysisDialog;
