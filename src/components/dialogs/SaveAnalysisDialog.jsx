import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from './Dialog';

/**
 * Dialog to save an analysis
 */
class SaveAnalysisDialog extends Component {
  static propTypes = {
    groups: PropTypes.arrayOf(PropTypes.string).isRequired,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isOpen: false,
  };

  /**
   * default render method
   */
  render() {
    return (
      <Dialog
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        onAction={this.props.onSave}
        title="Analyse Speichern"
        cancelTitle="Abbrechen"
        actionTitle="Speichern"
      >
        <p>Gruppe</p>
        <div className="dropdown">
          <select className="form-control">
            {this.props.groups.map(item => <option key={item}>{item}</option>)}
          </select>
        </div>
        <p>
          <small>
            Bitte geben Sie die Gruppe an der die Analyse zugeordnet werden
            soll.
          </small>
        </p>
        <input
          type="text"
          className="form-control"
          placeholder="Meine Persönlichkeitsanalyse"
        />
        <p>
          <small>
            Bitte geben Sie den Namen an unter dem die Analyse gespeichert
            werden soll.
          </small>
        </p>
      </Dialog>
    );
  }
}

export default SaveAnalysisDialog;
