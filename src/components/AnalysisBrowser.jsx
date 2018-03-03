import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import Panel from './Panel';
import GroupTableRow from './GroupTableRow';
import AnalysisTableRow from './AnalysisTableRow';
import NavigationDropdownMenu from './NavigationDropdownMenu';
import NavigationDropdownMenuItem from './NavigationDropdownMenuItem';

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
    handleCreateGroup: PropTypes.func,
    handleCreateAnalysis: PropTypes.func,
  };

  static defaultProps = {
    handleCreateGroup: () => {},
    handleCreateAnalysis: () => {},
  };
  constructor(props) {
    super(props);

    // getting initial state from server
    // TODO replace with real server call
    this.state = {
      analyses: props.analyses,
      groups: props.groups,
      expandedIndex: -1,
    };
  }

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
   * handler for clicks on the rename action of group rows
   * @param index the index of the item to rename
   * @param id the id of the item to rename
   */
  handleGroupRenameClick = (index, id) => {
    console.log(`Rename item ${id} @ ${index}`);
  };

  /**
   * handler for clicks on the delete action of group rows
   * @param index the index of the group to delete
   * @param id the id of the group to delete
   */
  handleGroupDeleteClick = (index, id) => {
    console.log(`Delete item ${id} @ ${index}`);
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
    return (
      <Panel
        title="Analysen"
        actions={[
          <NavigationDropdownMenu
            key="AddGroupAnalysis"
            name="+"
            direction="right"
            navbar
          >
            <NavigationDropdownMenuItem onClick={this.props.handleCreateGroup}>
              Gruppe
            </NavigationDropdownMenuItem>
            <NavigationDropdownMenuItem
              onClick={this.props.handleCreateAnalysis}
            >
              Analyse
            </NavigationDropdownMenuItem>
          </NavigationDropdownMenu>,
        ]}
      >
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
                  renameHandler={this.handleGroupRenameClick}
                  deleteHandler={this.handleGroupDeleteClick}
                />,
              ];

              // if index of current group is expanded
              // -> rendering analyses as well
              if (this.state.expandedIndex === index) {
                groupCellContent.push(this.state.analyses
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
      </Panel>
    );
  }
}

export default withRouter(AnalysisBrowser);
