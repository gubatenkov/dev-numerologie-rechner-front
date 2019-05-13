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
        title="Use credit"
        cancelTitle="Abbrechen"
        actionTitle="Use"
      >
        <p>
          {`You about to use your credit, are you sure? `}
        </p>
      </Dialog>
    );
  }
}

export default ConfirmUseCreditDialog;
