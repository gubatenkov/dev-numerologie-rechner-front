import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { graphql, withApollo } from 'react-apollo';
import * as compose from 'lodash.flowright';
import _ from 'lodash';
import ToastNotifications from 'cogo-toast';

import LoadingIndicator from './LoadingIndicator';

import CreateGroupDialog from './dialogs/CreateGroupDialog';
import ConfirmGroupDeletionDialog from './dialogs/ConfirmGroupDeletionDialog';
import ConfirmAnalysisDeletionDialog from './dialogs/ConfirmAnalysisDeletionDialog';
import RenameGroupDialog from './dialogs/RenameGroupDialog';
import ConfirmUseCreditDialog from './dialogs/ConfirmUseCreditDialog';

import { getConfigurationForId } from '../utils/Configuration';
import { OVERALL_INTRO_KEY } from '../utils/Constants';
import { getUserAuthData } from '../utils/AuthUtils';
import { createPDFFromAnalysisResult } from '../pdf/PdfBuilder';
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

import '../styles/AnalysisBrowser.scss';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import AnalysisBrowserToggle from './AnalysisBrowserToggle';
import AnalysisListEntry from './AnalysisListEntry';
import NavigationDropdownMenuItem from './NavigationDropdownMenuItem';
import NavigationDropdownMenu from './NavigationDropdownMenu';
import iconGroup from '../images/icon_group.svg';
import iconAnalysis from '../images/icon_analysis.svg';

const AnalysisBrowser = props => {
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
    false
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
  const createGroup = async groupName => {
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
        { position: 'top-right' }
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
        { position: 'top-right' }
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
  const deleteGroup = async id => {
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
            item =>
              item.id === deleteAnalysisGroup.id &&
              item.name === deleteAnalysisGroup.name
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
        { position: 'top-right' }
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
  const deleteAnalysis = async id => {
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
            item => item.id === deleteAnalysis.id
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
        { position: 'top-right' }
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
  const createAnalysisPdf = async targetAnalysis => {
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
          id: targetAnalysis.id,
          isPdf: true,
          longTexts: targetAnalysis.longTexts || false,
        },
      });

      // getting user default result configuration
      const resultConfiguration = getConfigurationForId(
        props.resultConfiguration
      );

      // getting section ids to get intro texts for including overall intro text
      const sectionIds = resultConfiguration.map(section => section.name);
      sectionIds.push(OVERALL_INTRO_KEY(props.resultConfiguration));

      // getting intro texts for all sections in configuration
      const { introTexts } = (await props.client.query({
        query: introTextQuery,
        variables: {
          sectionIds,
          isPdf: true,
          longText: targetAnalysis.longTexts || false,
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
          resultConfiguration,
          props.resultConfiguration,
          introTexts,
          personalAnalysisResult.firstNames,
          personalAnalysisResult.lastName,
          `Namensvergleich_${personalAnalysisResult.firstNames}_${personalAnalysisResult.lastName}_${personalAnalysisResultCompare.firstNames}_${personalAnalysisResultCompare.lastName}.pdf`,
          analysis.longTexts,
          personalAnalysisResultCompare,
          personalAnalysisResultCompare.firstNames,
          personalAnalysisResultCompare.lastName
        );
      } else {
        const [personalAnalysisResult] = analysis.personalAnalysisResults;
        await createPDFFromAnalysisResult(
          personalAnalysisResult,
          resultConfiguration,
          props.resultConfiguration,
          introTexts,
          personalAnalysisResult.firstNames,
          personalAnalysisResult.lastName,
          `Persönlichkeitsnumeroskop_${personalAnalysisResult.firstNames}_${personalAnalysisResult.lastName}.pdf`,
          analysis.longTexts
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
    const filtered = credits.filter(c => c.type === type);
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
      });
      props.onUsedCredit();
      ToastNotifications.success(
        'Das Guthaben wurde erfolgreich eingelöst. Sie können das PDF nun herunterladen.',
        { position: 'top-right' }
      );
    } catch (error) {
      console.log('Using credit failed');
      console.log(error);
      ToastNotifications.error(
        'Es ist ein Fehler aufgetreten und das Guthaben konnte nicht eingelöst werden.',
        { position: 'top-right' }
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
      <Accordion defaultActiveKey="641">
        {props.groups.map((group, index) => {
          const analysisOfGroup = props.analyses.filter(
            analysis => analysis.group.id === group.id
          );

          return (
            <Card key={group.id}>
              <Card.Header>
                <AnalysisBrowserToggle
                  eventKey={group.id}
                  canExpand={analysisOfGroup.length > 0}
                >
                  {group.name}
                </AnalysisBrowserToggle>
              </Card.Header>
              <Accordion.Collapse eventKey={group.id}>
                <Card.Body>
                  {analysisOfGroup.map(analyis => (
                    <AnalysisListEntry key={analyis.id} analyis={analyis} />
                  ))}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
        })}
      </Accordion>
    );
  } else {
    panelContent = (
      <p className="AnalysisBrowser--placeholder">
        Keine Gruppen oder Analysen
      </p>
    );
  }
  return (
    <div className="analysis-browser">
      {loading && <LoadingIndicator text={loadingText} />}
      <div className="panel-header">
        <div className="header">Analysen</div>
        <div>
          <NavigationDropdownMenu key="AddGroupAnalysis" name="+">
            <NavigationDropdownMenuItem
              onClick={() => setCreateGroupDialogOpen(true)}
            >
              <img src={iconGroup} alt="" /> Gruppe
            </NavigationDropdownMenuItem>
            <NavigationDropdownMenuItem
              onClick={() => props.history.push('/analysisInput')}
            >
              <img src={iconAnalysis} alt="" /> Analyse
            </NavigationDropdownMenuItem>
          </NavigationDropdownMenu>
        </div>
      </div>
      <div className="panel-content">{panelContent}</div>
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
        onAction={groupName => {
          // calling handler
          createGroup(groupName);

          // hiding dialog
          setCreateGroupDialogOpen(false);
          setLoading(true);
        }}
        groups={props.groups.map(item => item.name)}
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
        })
      ).isRequired,
    })
  ).isRequired,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
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
  graphql(useCreditMutation, { name: 'useCredit' })
)(withApollo(withRouter(AnalysisBrowser)));
