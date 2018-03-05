import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { NotificationManager } from 'react-notifications';
import _ from 'lodash';

import Panel from './Panel';
import GroupTableRow from './GroupTableRow';
import AnalysisTableRow from './AnalysisTableRow';
import NavigationDropdownMenu from './NavigationDropdownMenu';
import NavigationDropdownMenuItem from './NavigationDropdownMenuItem';

import CreateGroupDialog from './dialogs/CreateGroupDialog';
import ConfirmDeletionDialog from './dialogs/ConfirmDeletionDialog';
import RenameGroupDialog from './dialogs/RenameGroupDialog';

import { currentUserQuery } from '../graphql/Queries';
import { deleteGroupMutation, createGroupMutation } from '../graphql/Mutations';

import '../styles/AnalysisBrowser.css';

/**
 * browser that allows users to view and organize
 * their analyses and groups
 */
class AnalysisBrowser extends Component {
  static propTypes = {
    analyses: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      inputs: PropTypes.arrayOf(PropTypes.shape({
        firstNames: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        dateOfBirth: PropTypes.string.isRequired,
      })).isRequired,
    })).isRequired,
    groups: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
    createGroup: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  /**
   * default constructor
   */
  constructor(props) {
    super(props);

    // getting initial state from server
    // TODO replace with real server call
    this.state = {
      expandedIndex: -1,
      confirmGroupDeletionDialogOpen: false,
      createGroupDialogOpen: false,
      renameGroupDialopOpen: false,
    };
  }

  // group to be deleted and not yet confirmed
  groupToBeDeleted = null;

  // group to be renamed
  groupToBeRenamed = null;

  /**
   * handler method for clicks on rows
   * @param index the index of the group that was clicked
   */
  handleRowClick = (index) => {
    // if index is not already set -> setting new index
    // else resetting
    if (index !== this.state.expandedIndex) {
      this.setState({
        expandedIndex: index,
      });
    } else {
      this.setState({
        expandedIndex: -1,
      });
    }
  };

  /**
   * handler for the creation of a group
   * @param groupName the name of the new group to be created
   */
  createGroup = async (groupName) => {
    try {
      // performing mutation call
      await this.props.createGroup({
        variables: {
          groupName,
        },
        update: (store, { data: { createAnalysisGroup } }) => {
          // gettint the query from the local cache and adding group
          const data = store.readQuery({ query: currentUserQuery });
          data.currentUser.groups.push(createAnalysisGroup);
          store.writeQuery({ query: currentUserQuery, data });
        },
      });
      NotificationManager.success(`Die Gruppe ${groupName} wurde erfolgreich erstellt.`);
    } catch (error) {
      // error occured -> displaying notification
      NotificationManager.error(error.graphQLErrors[0].message);
    }
  };

  /**
   * handler for the rename action of group rows
   * @param index the index of the item to rename
   * @param id the id of the item to rename
   */
  renameGroup = (index, id) => {
    console.log(`Rename item ${id} @ ${index}`);
  };

  /**
   *  deletes the group identified by id from the server
   * @param id: the id of the group to be deleted
   */
  deleteGroup = async (id) => {
    // deleting group
    try {
      const deletedGroup = await this.props.deleteGroup({
        variables: {
          id,
        },
        update: (store, { data: { deleteAnalysisGroup } }) => {
          // gettint the query from the local cache and deleting group
          const data = store.readQuery({ query: currentUserQuery });
          // getting index of item to delete
          const groupIndex = _.findIndex(
            data.currentUser.groups,
            item =>
              item.id === deleteAnalysisGroup.id &&
              item.name === deleteAnalysisGroup.name,
          );

          // deleting item if present
          if (groupIndex > -1) {
            data.currentUser.groups.splice(groupIndex, 1);
          }

          // writing object back to cache
          store.writeQuery({ query: currentUserQuery, data });
        },
      });

      // shooting notification informting the user
      NotificationManager.success(`Die Gruppe ${
        deletedGroup.data.deleteAnalysisGroup.name
      } wurde erfolgreich gelöscht.`);
    } catch (error) {
      NotificationManager.error('Gruppe konnte nicht gelöscht werden.');
    }
  };

  /**
   * handler for clicks on the delete action of group rows
   * @param index the index of the group to delete
   * @param id the id of the group to delete
   */
  handleGroupDeleteClick = async (index, id) => {
    // setting group that is about to be deleted
    this.groupToBeDeleted = this.props.groups[index];

    // showing confirm dilog
    this.setState({
      confirmGroupDeletionDialogOpen: true,
    });
  };

  /**
   * handler for showing a specific analysis
   * @param id the id of the analysis to show
   */
  handleAnalysisShowClick = (analysis) => {
    const analysisInput = analysis.inputs[0];
    this.props.history.push(`/resultPersonal/${analysisInput.firstNames}/${analysisInput.lastName}/${
      analysisInput.dateOfBirth
    }`);
  };

  /**
   * handler for deleting a specific analysis
   * @param id the id of the analysis to be deleted
   */
  handleAnalysisDeleteClick = (id) => {
    console.log(`Delete analysis ${id}`);
  };

  /**
   * default render method rendering panel and table of groups and analyses
   */
  render() {
    // determining content of panel based on if there is data or not
    let panelContent = null;
    if (this.props.groups.length > 0) {
      panelContent = (
        <table className="table table-striped table-hover AnalysisBrowser--table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Typ</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {this.props.groups.map((group, index) => {
              // adding group row to result
              const groupCellContent = [
                <GroupTableRow
                  key={group.id}
                  group={group}
                  index={index}
                  clickHandler={this.handleRowClick}
                  renameHandler={(renameIndex, id) => {
                    // setting group that is about to be renamed
                    this.groupToBeRenamed = this.props.groups[renameIndex];

                    // showing dialog
                    this.setState({
                      renameGroupDialopOpen: true,
                    });
                  }}
                  deleteHandler={(deleteIndex, id) => {
                    // setting group that is about to be deleted
                    this.groupToBeDeleted = this.props.groups[deleteIndex];

                    // showing confirm dilog
                    this.setState({
                      confirmGroupDeletionDialogOpen: true,
                    });
                  }}
                />,
              ];

              // if index of current group is expanded
              // -> rendering analyses as well
              if (this.state.expandedIndex === index) {
                groupCellContent.push(this.props.analyses
                    .filter(analysis => analysis.group.id === group.id)
                    .map(analysis => (
                      <AnalysisTableRow
                        key={analysis.id}
                        analysis={analysis}
                        deleteHandler={this.handleAnalysisDeleteClick}
                        showHandler={this.handleAnalysisShowClick}
                      />
                    )));
              }

              // returning accumulated rows for group
              return groupCellContent;
            })}
          </tbody>
        </table>
      );
    } else {
      panelContent = (
        <p className="AnalysisBrowser--placeholder">
          Keine Gruppen oder Analysen
        </p>
      );
    }
    return (
      <div>
        <Panel
          title="Analysen"
          actions={[
            <NavigationDropdownMenu
              key="AddGroupAnalysis"
              name="+"
              direction="right"
              navbar
            >
              <NavigationDropdownMenuItem
                onClick={() => {
                  this.setState({ createGroupDialogOpen: true });
                }}
              >
                Gruppe
              </NavigationDropdownMenuItem>
              <NavigationDropdownMenuItem onClick={() => {}}>
                Analyse
              </NavigationDropdownMenuItem>
            </NavigationDropdownMenu>,
          ]}
        >
          {panelContent}
        </Panel>
        <ConfirmDeletionDialog
          group={this.groupToBeDeleted}
          isOpen={this.state.confirmGroupDeletionDialogOpen}
          onClose={() => {
            // clearing to be deleted group and hiding dialog
            this.setState({ confirmGroupDeletionDialogOpen: false });
            this.groupToBeDeleted = null;
          }}
          onAction={() => {
            // hiding dialog, deleting group and clearing to be deleted group
            this.setState({ confirmGroupDeletionDialogOpen: false });
            this.deleteGroup(this.groupToBeDeleted.id);
            this.groupToBeDeleted = null;
          }}
        />
        <CreateGroupDialog
          isOpen={this.state.createGroupDialogOpen}
          onClose={() => this.setState({ createGroupDialogOpen: false })}
          onAction={(groupName) => {
            // calling handler
            this.createGroup(groupName);

            // hiding dialog
            this.setState({ createGroupDialogOpen: false });
          }}
          groups={this.props.groups.map(item => item.name)}
        />
        <RenameGroupDialog
          isOpen={this.state.renameGroupDialopOpen}
          onClose={() => {
            // clearing to be renamed field
            this.groupToBeRenamed = null;

            // hiding dialog
            this.setState({ renameGroupDialopOpen: false });
          }}
          onAction={(index, id) => {
            // renaming group
            this.renameGroup(index, id);

            // hiding dialog
            this.setState({ renameGroupDialopOpen: false });
          }}
          group={this.groupToBeRenamed}
        />
      </div>
    );
  }
}

export default compose(
  graphql(deleteGroupMutation, { name: 'deleteGroup' }),
  graphql(createGroupMutation, { name: 'createGroup' }),
)(withRouter(AnalysisBrowser));
