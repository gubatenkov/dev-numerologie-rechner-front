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
import ConfirmGroupDeletionDialog from './dialogs/ConfirmGroupDeletionDialog';
import ConfirmAnalysisDeletionDialog from './dialogs/ConfirmAnalysisDeletionDialog';
import RenameGroupDialog from './dialogs/RenameGroupDialog';

import { currentUserQuery } from '../graphql/Queries';
import {
  deleteGroupMutation,
  createGroupMutation,
  renameGroupMutation,
  deleteAnalysis,
} from '../graphql/Mutations';

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
    renameGroup: PropTypes.func.isRequired,
    deleteAnalysis: PropTypes.func.isRequired,
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
      confirmAnalysisDeletionDialogOpen: false,
      createGroupDialogOpen: false,
      renameGroupDialopOpen: false,
    };
  }

  // group to be deleted and not yet confirmed
  groupToBeDeleted = null;

  // group to be renamed
  groupToBeRenamed = null;

  // analysis about to be deleted (yet to be confirmed)
  analysisToBeDeleted = null;

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
   * @param newName the name to be renamed to
   * @param id the id of the item to renamed
   */
  renameGroup = async (newName, id) => {
    try {
      // performing mutation call
      await this.props.renameGroup({
        variables: {
          id,
          newName,
        },
      });
      NotificationManager.success(`Die Gruppe ${newName} wurde erfolgreich umbenannt.`);
    } catch (error) {
      // error occured -> displaying notification
      NotificationManager.error('Die Gruppe konnte nicht umbenannt werden');
    }
  };

  /**
   * deletes the group identified by id from the server
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
   * handler for deleting a specific analysis
   * @param id the id of the analysis to be deleted
   */
  deleteAnalysis = async (id) => {
    // deleting analysis
    try {
      const deletedAnalysis = await this.props.deleteAnalysis({
        variables: {
          id,
        },
        update: (store, { data: { deleteAnalysis } }) => {
          // getting the query from the local cache and deleting analysis
          const data = store.readQuery({ query: currentUserQuery });

          // getting index of item to delete
          const analysisIndex = _.findIndex(
            data.currentUser.analyses,
            item => item.id === deleteAnalysis.id,
          );

          // deleting item if present
          if (analysisIndex > -1) {
            data.currentUser.analyses.splice(analysisIndex, 1);
          }

          // writing object back to cache
          store.writeQuery({ query: currentUserQuery, data });
        },
      });

      // shooting notification informting the user
      NotificationManager.success(`Die Analyse ${
        deletedAnalysis.data.deleteAnalysis.name
      } wurde erfolgreich gelöscht.`);
    } catch (error) {
      NotificationManager.error('Analyse konnte nicht gelöscht werden.');
    }
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
                  clickHandler={(clickIndex) => {
                    // if index is not already set -> setting new index
                    // else resetting
                    if (clickIndex !== this.state.expandedIndex) {
                      this.setState({
                        expandedIndex: clickIndex,
                      });
                    } else {
                      this.setState({
                        expandedIndex: -1,
                      });
                    }
                  }}
                  renameHandler={(renameIndex) => {
                    // setting group that is about to be renamed
                    this.groupToBeRenamed = this.props.groups[renameIndex];

                    // showing dialog
                    this.setState({
                      renameGroupDialopOpen: true,
                    });
                  }}
                  deleteHandler={(deleteIndex) => {
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
                        deleteHandler={(analysisId) => {
                          // getting analysis to be deleted
                          this.analysisToBeDeleted = _.find(
                            this.props.analyses,
                            item => item.id === analysisId,
                          );

                          // showing confirm dialog
                          this.setState({
                            confirmAnalysisDeletionDialogOpen: true,
                          });
                        }}
                        showHandler={() => {
                          // getting input of analysis = names and dob
                          const analysisInput = analysis.inputs[0];

                          // navigating to analysis results
                          this.props.history.push(`/resultPersonal/${analysisInput.firstNames}/${
                              analysisInput.lastName
                            }/${analysisInput.dateOfBirth}`);
                        }}
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
        <ConfirmGroupDeletionDialog
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
        <ConfirmAnalysisDeletionDialog
          analysis={this.analysisToBeDeleted}
          isOpen={this.state.confirmAnalysisDeletionDialogOpen}
          onClose={() => {
            this.setState({ confirmAnalysisDeletionDialogOpen: false });
            this.analysisToBeDeleted = null;
          }}
          onAction={() => {
            // hiding dialog, deleting analysis and clearing to be deleted group
            this.setState({ confirmAnalysisDeletionDialogOpen: false });
            this.deleteAnalysis(this.analysisToBeDeleted.id);
            this.analysisToBeDeleted = null;
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
          onAction={(id, newName) => {
            // renaming group
            this.renameGroup(newName, id);

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
  graphql(renameGroupMutation, { name: 'renameGroup' }),
  graphql(deleteAnalysis, { name: 'deleteAnalysis' }),
)(withRouter(AnalysisBrowser));
