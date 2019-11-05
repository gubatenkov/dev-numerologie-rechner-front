import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { graphql, withApollo } from 'react-apollo';
import * as compose from 'lodash.flowright';
import _ from 'lodash';
import ToastNotifications from 'cogo-toast';

import Panel from './Panel';
import GroupTableRow from './GroupTableRow';
import AnalysisTableRow from './AnalysisTableRow';
import NavigationDropdownMenu from './NavigationDropdownMenu';
import NavigationDropdownMenuItem from './NavigationDropdownMenuItem';
import LoadingIndicator from './LoadingIndicator';

import CreateGroupDialog from './dialogs/CreateGroupDialog';
import ConfirmGroupDeletionDialog from './dialogs/ConfirmGroupDeletionDialog';
import ConfirmAnalysisDeletionDialog from './dialogs/ConfirmAnalysisDeletionDialog';
import RenameGroupDialog from './dialogs/RenameGroupDialog';
import ConfirmUseCreditDialog from './dialogs/ConfirmUseCreditDialog';

import {
  PersonalResultConfiguration,
  OVERALL_INTRO_KEY,
} from '../utils/Config';
import { getUserAuthData } from '../utils/AuthUtils';
import { createPDFFromAnalysisResult } from '../utils/PdfBuilder';
import {
  currentUserQuery,
  buildPersonalAnalysisByIdQuery,
  introTextQuery,
} from '../graphql/Queries';
import {
  deleteGroupMutation,
  createGroupMutation,
  renameGroupMutation,
  deleteAnalysisMutation,
  useCreditMutation,
} from '../graphql/Mutations';

import '../styles/AnalysisBrowser.css';

const AnalysisBrowser = (props) => {
  // declaring state variables
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [
    confirmGroupDeletionDialogOpen,
    setConfirmGroupDeletionDialogOpen,
  ] = useState(false);
  const [
    confirmAnalysisDeletionDialogOpen,
    setConfirmAnalysisDeletionDialogOpen,
  ] = useState(false);
  const [confirmUseCreditDialogOpen, setConfirmUseCreditDialogOpen] = useState(
    false,
  );
  const [createGroupDialogOpen, setCreateGroupDialogOpen] = useState(false);
  const [renameGroupDialogOpen, setRenameGroupDialogOpen] = useState(false);
  const [creditToBeUsed, setCreditToBeUsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(false);

  const [groupToBeRenamed, setGroupToBeRenamed] = useState(null);
  const [groupToBeDeleted, setGroupToBeDeleted] = useState(null);
  const [analysisToBeDeleted, setAnalysisToBeDeleted] = useState(null);

  /**
   * handler for the creation of a group
   * @param groupName the name of the new group to be created
   */
  const createGroup = async (groupName) => {
    try {
      // performing mutation call to create group
      await props.createGroup({
        variables: {
          groupName,
        },
        update: (store, { data: { createAnalysisGroup } }) => {
          // getting the query from the local cache and adding group
          const data = store.readQuery({ query: currentUserQuery });
          data.currentUser.groups.push(createAnalysisGroup);
          store.writeQuery({ query: currentUserQuery, data });
        },
      });
      // notifying user
      ToastNotifications.success(
        `Die Gruppe ${groupName} wurde erfolgreich erstellt.`,
        { position: 'top-right' },
      );
    } catch (error) {
      // error occured -> displaying notification
      ToastNotifications.error(error.graphQLErrors[0].message, {
        position: 'top-right',
      });
    }
    // resetting loading
    setLoading(false);
  };

  /**
   * handler for the rename action of group rows
   * @param newName the name to be renamed to
   * @param id the id of the item to renamed
   */
  const renameGroup = async (newName, id) => {
    // getting createGroup mutation
    const { renameGroup } = props;
    try {
      // performing mutation call
      await renameGroup({
        variables: {
          id,
          newName,
        },
      });
      // notifying user
      ToastNotifications.success(
        `Die Gruppe ${newName} wurde erfolgreich umbenannt.`,
        { position: 'top-right' },
      );
    } catch (error) {
      // error occured -> displaying notification
      ToastNotifications.error('Die Gruppe konnte nicht umbenannt werden', {
        position: 'top-right',
      });
    }
    // resetting loading state
    setLoading(false);
  };

  /**
   * deletes the group identified by id from the server
   * @param id: the id of the group to be deleted
   */
  const deleteGroup = async (id) => {
    // deleting group
    try {
      const deletedGroup = await props.deleteGroup({
        variables: {
          id,
        },
        update: (store, { data: { deleteAnalysisGroup } }) => {
          // gettint the query from the local cache and deleting group
          const data = store.readQuery({ query: currentUserQuery });
          // getting index of item to delete
          const groupIndex = _.findIndex(
            data.currentUser.groups,
            (item) => item.id === deleteAnalysisGroup.id
              && item.name === deleteAnalysisGroup.name,
          );

          // deleting item if present
          if (groupIndex > -1) {
            data.currentUser.groups.splice(groupIndex, 1);
          }

          // writing object back to cache
          store.writeQuery({ query: currentUserQuery, data });
        },
      });

      // informing the user
      ToastNotifications.success(
        `Die Gruppe ${deletedGroup.data.deleteAnalysisGroup.name} wurde erfolgreich gelöscht.`,
        { position: 'top-right' },
      );
    } catch (error) {
      console.log(error);
      ToastNotifications.error('Gruppe konnte nicht gelöscht werden.', {
        position: 'top-right',
      });
    }
    // resetting loading state
    setLoading(false);
  };

  /**
   * handler for deleting a specific analysis
   * @param id the id of the analysis to be deleted
   */
  const deleteAnalysis = async (id) => {
    // deleting analysis
    try {
      const deletedAnalysis = await props.deleteAnalysis({
        variables: {
          id,
        },
        update: (store, { data: { deleteAnalysis } }) => {
          // getting the query from the local cache and deleting analysis
          const data = store.readQuery({ query: currentUserQuery });

          // getting index of item to delete
          const analysisIndex = _.findIndex(
            data.analyses,
            (item) => item.id === deleteAnalysis.id,
          );

          // deleting item if present
          if (analysisIndex > -1) {
            data.analyses.splice(analysisIndex, 1);
          }

          // writing object back to cache
          store.writeQuery({ query: currentUserQuery, data });
        },
      });

      // shooting notification informting the user
      ToastNotifications.success(
        `Die Analyse ${deletedAnalysis.data.deleteAnalysis.name} wurde erfolgreich gelöscht.`,
        { position: 'top-right' },
      );
    } catch (error) {
      ToastNotifications.error('Analyse konnte nicht gelöscht werden.', {
        position: 'top-right',
      });
    }
    // resetting loading state
    setLoading(false);
  };

  /**
   * creates a pdf for the analysis and opens it in a new tab
   */
  const createAnalysisPdf = async (pdfToBeDownloaded) => {
    // checking if logged in => otherwise redirecting to login
    const authUser = getUserAuthData();
    if (!authUser || !authUser.token || !authUser.email) {
      props.history.push('/login');
      return;
    }

    // setting activity indicator
    setLoading(true);
    setLoadingText('Berechne detaillierte Auswertung und erstelle PDF...');

    try {
      // getting long texts used for pdf (if allowed)
      const result = await props.client.query({
        query: buildPersonalAnalysisByIdQuery(true),
        variables: {
          id: pdfToBeDownloaded.id,
          isPdf: true,
          longTexts: pdfToBeDownloaded.longTexts || false,
        },
      });

      // TODO: how to determine configuration? Save with analysis?
      const configuration = PersonalResultConfiguration.LEVELS;

      // getting section ids to get intro texts for including overall intro text
      const sectionIds = configuration.map((section) => section.name);
      sectionIds.push(OVERALL_INTRO_KEY);

      // getting intro texts for all sections in configuration
      const { introTexts } = (await props.client.query({
        query: introTextQuery,
        variables: {
          sectionIds,
          isPdf: true,
          longText: pdfToBeDownloaded.longTexts || false,
        },
      })).data;

      // getting analysis from result
      const { analysis } = result.data;

      // creating pdf and downloading with custom name
      if (analysis.personalAnalysisResults.length > 1) {
        const [
          personalAnalysisResult,
          personalAnalysisResultCompare,
        ] = analysis.personalAnalysisResults;
        await createPDFFromAnalysisResult(
          personalAnalysisResult,
          PersonalResultConfiguration.LEVELS,
          introTexts,
          personalAnalysisResult.firstNames,
          personalAnalysisResult.lastName,
          `Namensvergleich_${personalAnalysisResult.firstNames}_${personalAnalysisResult.lastName}_${personalAnalysisResultCompare.firstNames}_${personalAnalysisResultCompare.lastName}.pdf`,
          pdfToBeDownloaded.longTexts,
          personalAnalysisResultCompare,
          personalAnalysisResultCompare.firstNames,
          personalAnalysisResultCompare.lastName,
        );
      } else {
        const [personalAnalysisResult] = analysis.personalAnalysisResults;
        await createPDFFromAnalysisResult(
          personalAnalysisResult,
          PersonalResultConfiguration.LEVELS,
          introTexts,
          personalAnalysisResult.firstNames,
          personalAnalysisResult.lastName,
          `Persönlichkeitsnumeroskop_${personalAnalysisResult.firstNames}_${personalAnalysisResult.lastName}.pdf`,
          pdfToBeDownloaded.longTexts,
        );
      }
    } catch (error) {
      console.log('Creating PDF failed');
      console.log(error);
    } finally {
      // removing loading indicator
      setLoading(false);
      setLoadingText(null);
    }
  };

  /**
   * handles the spending of a credit = decreases the available credits and associates a given
   * credit with an analysis
   * @param {string} analysisId the id of the analysis to spend the credit on
   * @param {string} type type of the credit to be used (e.g. long and short)
   */
  const handleOnUseCredit = (analysisId, type) => {
    const { credits, onInsufficientCredits } = props;
    const filtered = credits.filter((c) => c.type === type);
    if (filtered.length === 1 && filtered[0].total > 0) {
      // opening confirm dialog and storing credits to be used
      setConfirmUseCreditDialogOpen(true);
      setCreditToBeUsed({ analysisId, type });
    } else {
      onInsufficientCredits();
    }
  };

  /**
   * uses a user credit
   */
  const spendCredit = async () => {
    // showing loading indicator
    setLoading(true);
    setLoadingText('Ihr Guthaben wird eingelöst...');
    try {
      // preparing arguments to use credit
      const { analysisId, type } = creditToBeUsed;
      await props.useCredit({
        variables: {
          analysisId,
          type,
        },
        update: (store, { data: { useCredit: analysis } }) => {},
      });
      props.onUsedCredit();
      ToastNotifications.success(
        'Das Guthaben wurde erfolgreich eingelöst. Sie können das PDF nun herunterladen.',
        { position: 'top-right' },
      );
    } catch (error) {
      console.log('Using credit failed');
      console.log(error);
      ToastNotifications.error(
        'Es ist ein Fehler aufgetreten und das Guthaben konnte nicht eingelöst werden.',
        { position: 'top-right' },
      );
    } finally {
      setLoading(false);
      setLoadingText(null);
    }
  };

  // render
  // determining content of panel based on if there is data or not
  let panelContent = null;
  if (props.groups.length > 0) {
    panelContent = (
      <table className="table table-striped table-hover AnalysisBrowser--table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Typ</th>
            <th />
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {props.groups.map((group, index) => {
            // adding group row to result
            const groupCellContent = [
              <GroupTableRow
                key={group.id}
                group={group}
                index={index}
                elementsInGroup={
                  props.analyses.filter(
                    (analysis) => analysis.group.id === group.id,
                  ).length
                }
                clickHandler={(clickIndex) => {
                  // if index is not already set -> setting new index
                  // else resetting
                  if (clickIndex !== expandedIndex) {
                    setExpandedIndex(clickIndex);
                  } else {
                    setExpandedIndex(-1);
                  }
                }}
                renameHandler={(renameIndex) => {
                  // setting group that is about to be renamed
                  setGroupToBeRenamed(props.groups[renameIndex]);

                  // showing dialog
                  setRenameGroupDialogOpen(true);
                }}
                deleteHandler={(deleteIndex) => {
                  // setting group that is about to be deleted
                  setGroupToBeDeleted(props.groups[deleteIndex]);

                  // showing confirm dilog
                  setConfirmGroupDeletionDialogOpen(true);
                }}
              />,
            ];

            // if index of current group is expanded
            // -> rendering analyses as well
            if (expandedIndex === index) {
              groupCellContent.push(
                props.analyses
                  .filter((analysis) => analysis.group.id === group.id)
                  .map((analysis) => (
                    <AnalysisTableRow
                      key={analysis.id}
                      analysis={analysis}
                      deleteHandler={(analysisId) => {
                        // getting analysis to be deleted
                        setAnalysisToBeDeleted(
                          _.find(
                            props.analyses,
                            (item) => item.id === analysisId,
                          ),
                        );

                        // showing confirm dialog
                        setConfirmAnalysisDeletionDialogOpen(true);
                      }}
                      showHandler={() => {
                        props.history.push(`/resultPersonal/${analysis.id}`);
                      }}
                      onUseCredit={(type) => {
                        handleOnUseCredit(analysis.id, type);
                      }}
                      onPdfDownload={(longTexts) => {
                        createAnalysisPdf({ ...analysis, longTexts });
                      }}
                    />
                  )),
              );
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
      {loading && <LoadingIndicator text={loadingText} />}
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
              onClick={() => setCreateGroupDialogOpen(true)}
            >
              Gruppe
            </NavigationDropdownMenuItem>
            <NavigationDropdownMenuItem
              onClick={() => props.history.push('/analysisInput')}
            >
              Analyse
            </NavigationDropdownMenuItem>
          </NavigationDropdownMenu>,
        ]}
      >
        {panelContent}
      </Panel>
      <ConfirmGroupDeletionDialog
        group={groupToBeDeleted}
        isOpen={confirmGroupDeletionDialogOpen}
        onClose={() => {
          // clearing to be deleted group and hiding dialog
          setConfirmGroupDeletionDialogOpen(false);
          setGroupToBeDeleted(null);
        }}
        onAction={() => {
          // hiding dialog, deleting group and clearing to be deleted group
          setConfirmGroupDeletionDialogOpen(false);
          setLoading(true);
          deleteGroup(groupToBeDeleted.id);
          setGroupToBeDeleted(null);
        }}
      />
      <ConfirmAnalysisDeletionDialog
        analysis={analysisToBeDeleted}
        isOpen={confirmAnalysisDeletionDialogOpen}
        onClose={() => {
          setConfirmAnalysisDeletionDialogOpen(false);
          setAnalysisToBeDeleted(null);
        }}
        onAction={() => {
          // hiding dialog, deleting analysis and clearing to be deleted group
          setConfirmAnalysisDeletionDialogOpen(false);
          setLoading(true);
          deleteAnalysis(analysisToBeDeleted.id);
          setAnalysisToBeDeleted(null);
        }}
      />
      <CreateGroupDialog
        isOpen={createGroupDialogOpen}
        onClose={() => setCreateGroupDialogOpen(false)}
        onAction={(groupName) => {
          // calling handler
          createGroup(groupName);

          // hiding dialog
          setCreateGroupDialogOpen(false);
          setLoading(true);
        }}
        groups={props.groups.map((item) => item.name)}
      />
      <RenameGroupDialog
        isOpen={renameGroupDialogOpen}
        onClose={() => {
          // clearing to be renamed field
          setGroupToBeRenamed(null);

          // hiding dialog
          setRenameGroupDialogOpen(false);
        }}
        onAction={(id, newName) => {
          // renaming group
          renameGroup(newName, id);

          // hiding dialog
          setRenameGroupDialogOpen(false);
          setLoading(true);
        }}
        group={groupToBeRenamed}
      />
      <ConfirmUseCreditDialog
        isOpen={confirmUseCreditDialogOpen}
        onClose={() => {
          setConfirmUseCreditDialogOpen(false);
          setCreditToBeUsed(null);
        }}
        onAction={() => {
          setConfirmUseCreditDialogOpen(false);
          spendCredit();
        }}
      />
    </div>
  );
};

AnalysisBrowser.propTypes = {
  analyses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      inputs: PropTypes.arrayOf(
        PropTypes.shape({
          firstNames: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
          dateOfBirth: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  createGroup: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  renameGroup: PropTypes.func.isRequired,
  deleteAnalysis: PropTypes.func.isRequired,
};

AnalysisBrowser.defaultProps = {};

export default compose(
  graphql(deleteGroupMutation, { name: 'deleteGroup' }),
  graphql(createGroupMutation, { name: 'createGroup' }),
  graphql(renameGroupMutation, { name: 'renameGroup' }),
  graphql(deleteAnalysisMutation, { name: 'deleteAnalysis' }),
  graphql(useCreditMutation, { name: 'useCredit' }),
)(withApollo(withRouter(AnalysisBrowser)));
