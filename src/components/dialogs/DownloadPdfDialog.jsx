import React, { Component } from 'react';
import PropTyes from 'prop-types';

import Dialog from './Dialog';

/**
 * dialog that prompts the user to confirm the deletion of an analysis
 */
class DownloadPdfDialog extends Component {
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
        title="Download PDF"
        cancelTitle="Cancel"
        actionTitle="Download"
      >
        <p>
          {`How do you want to get your PDF file?`}
        </p>
      </Dialog>
    );
  }
}

export default DownloadPdfDialog;
