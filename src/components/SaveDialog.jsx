import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/SaveDialog.css';

class SaveDialog extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    groups: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSave: PropTypes.func,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    isOpen: false,
    onSave: () => {},
    onClose: () => {},
  };

  /**
   * default lifecycle method
   */
  componentDidMount() {
    // updating body class of the site to prevent scrolling
    document.body.classList.toggle('noScroll', this.props.isOpen);
  }

  /**
   * default licecylce method that makes sure component
   * parameters are set upon display/hide
   */
  componentDidUpdate() {
    // updating body class of the site to prevent scrolling
    document.body.classList.toggle('noScroll', this.props.isOpen);
  }

  /**
   * default render
   */
  render() {
    // if detail view not open -> not showing it
    if (this.props.isOpen === false) {
      return null;
    }

    // rendering dialog
    return (
      <div
        className="modal fade show"
        id="examplePositionCenter"
        aria-labelledby="examplePositionCenter"
        role="dialog"
        tabIndex="-1"
        style={{ display: 'block' }}
      >
        <div className="modal-dialog modal-center">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
              <h4 className="modal-title">Analyse Speichern</h4>
            </div>
            <div className="modal-body">
              <p>Gruppe</p>
              <div className="dropdown">
                <select className="form-control">
                  {this.props.groups.map(item => <option>{item}</option>)}
                </select>
              </div>
              <p>
                <small>
                  Bitte geben Sie die Gruppe an der die Analyse zugeordnet
                  werden soll.
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
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  onClick={this.props.onClose}
                >
                  Abbrechen
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.props.onSave}
                >
                  Speichern
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SaveDialog;
