import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/GroupTableRow.css';

/**
 * table view rendering a group passed as props
 */
class GroupTableRow extends Component {
  static propTypes = {
    group: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    clickHandler: PropTypes.func,
    renameHandler: PropTypes.func,
    deleteHandler: PropTypes.func,
    index: PropTypes.number.isRequired,
  };

  static defaultProps = {
    clickHandler: () => {},
    renameHandler: () => {},
    deleteHandler: () => {},
  };

  /**
   * handler for clicks on the row -> calls passed delegate
   * with index
   */
  handleRowClick = () => {
    this.props.clickHandler(this.props.index);
  };

  /**
   * handler for delete clicks
   */
  handleDeleteClick = (event) => {
    // forwardig to handler and making sure row does not get triggered
    this.props.deleteHandler(this.props.index, this.props.group.id);
    event.stopPropagation();
  };

  handleRenameClick = (event) => {
    // forwardig to handler and making sure row does not get triggered
    this.props.renameHandler(this.props.index, this.props.group.id);
    event.stopPropagation();
  };

  /**
   * default render -> renders the table row with group information
   */
  render() {
    return (
      <tr key={this.props.group.id} onClick={this.handleRowClick}>
        <td className="GroupTableRow--groupNameCell">
          {this.props.group.name}
        </td>
        <td className="GroupTableRow--groupTypeCell">Gruppe</td>
        <td className="GroupTableRow--groupActionCell">
          <button
            className="btn btn-primary btn-outline btn-sm"
            onClick={this.handleRenameClick}
          >
            Umbenennen
          </button>
          <button
            onClick={this.handleDeleteClick}
            className="btn btn-danger btn-outline btn-sm"
          >
            Löschen
          </button>
        </td>
      </tr>
    );
  }
}

export default GroupTableRow;
