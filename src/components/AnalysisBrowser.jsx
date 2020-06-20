import React, { useState } from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
import { graphql, withApollo } from "react-apollo";
import * as compose from "lodash.flowright";
import ToastNotifications from "cogo-toast";

import CreateGroupDialog from "./dialogs/CreateGroupDialog";
import ConfirmGroupDeletionDialog from "./dialogs/ConfirmGroupDeletionDialog";
import ConfirmAnalysisDeletionDialog from "./dialogs/ConfirmAnalysisDeletionDialog";
import RenameGroupDialog from "./dialogs/RenameGroupDialog";
import ConfirmUseCreditDialog from "./dialogs/ConfirmUseCreditDialog";
import { getUserAuthData } from "../utils/AuthUtils";
import { getAnalysisPdfQuery } from "../graphql/Queries";
import {
  deleteGroupMutation,
  createGroupMutation,
  renameGroupMutation,
  deleteAnalysisMutation,
  useCreditMutation
} from "../graphql/Mutations";
import "../styles/AnalysisBrowser.scss";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import AnalysisBrowserToggle from "./AnalysisBrowserToggle";
import AnalysisListEntry, { LONG_TYPE, SHORT_TYPE } from "./AnalysisListEntry";
import NavigationDropdownMenuItem from "./NavigationDropdownMenuItem";
import NavigationDropdownMenu from "./NavigationDropdownMenu";
import iconGroup from "../images/icon_group.svg";
import iconAnalysis from "../images/icon_analysis.svg";
import iconDelete from "../images/icon_delete.svg";
import iconEdit from "../images/icon_edit.svg";
import {
  ActionToggleIcon,
  AddToggleIcon
} from "./Dropdowns/DropdownMenuAddUtils";
import { useBuyModal } from "../contexts/BuyModalContext";
import { useTranslation } from "react-i18next";
import { useLoadingOverlay } from "../contexts/LoadingOverlayContext";

const AnalysisBrowser = props => {
  const [
    confirmGroupDeletionDialogOpen,
    setConfirmGroupDeletionDialogOpen
  ] = useState(false);
  const [
    confirmAnalysisDeletionDialogOpen,
    setConfirmAnalysisDeletionDialogOpen
  ] = useState(false);
  const [confirmUseCreditDialogOpen, setConfirmUseCreditDialogOpen] = useState(
    false
  );
  const [createGroupDialogOpen, setCreateGroupDialogOpen] = useState(false);
  const [renameGroupDialogOpen, setRenameGroupDialogOpen] = useState(false);
  const [creditToBeUsed, setCreditToBeUsed] = useState(false);
  const [groupToBeRenamed, setGroupToBeRenamed] = useState(null);
  const [groupToBeDeleted, setGroupToBeDeleted] = useState(null);
  const [analysisToBeDeleted, setAnalysisToBeDeleted] = useState(null);
  const [activeKey, setActiveKey] = useState(
    props.groups && props.groups.length > 0 ? props.groups[0].id : undefined
  );

  const buyModal = useBuyModal();
  const LoadingOverlay = useLoadingOverlay();
  const { t } = useTranslation();

  const createGroup = async groupName => {
    try {
      await props.createGroup({
        variables: {
          groupName
        }
      });
      ToastNotifications.success(
        t("TOAST.GROUP_CREATED_SUCCESSFULLY", { groupName }),
        { position: "top-right" }
      );
      props.onRefetch();
    } catch (error) {
      ToastNotifications.error(
        t("TOAST.GRAPHQL_ERROR", {
          errorMessage: error.graphQLErrors[0].message
        }),
        {
          position: "top-right"
        }
      );
    }
    LoadingOverlay.hide();
  };

  const renameGroup = async (newName, id) => {
    const { renameGroup } = props;
    try {
      await renameGroup({
        variables: {
          id,
          newName
        }
      });
      ToastNotifications.success(
        t("TOAST.GROUP_RENAMED_SUCCESSFULLY", { groupName: newName }),
        { position: "top-right" }
      );
      props.onRefetch();
    } catch (error) {
      ToastNotifications.error(
        t("TOAST.GRAPHQL_ERROR", {
          errorMessage: error.graphQLErrors[0].message
        }),
        {
          position: "top-right"
        }
      );
    }
    LoadingOverlay.hide();
  };

  const deleteGroup = async id => {
    try {
      const deletedGroup = await props.deleteGroup({
        variables: {
          id
        }
      });

      ToastNotifications.success(
        t("TOAST.GROUP_DELETED_SUCCESSFULLY", {
          groupName: deletedGroup.data.deleteAnalysisGroup.name
        }),
        { position: "top-right" }
      );
      props.onRefetch();
    } catch (error) {
      ToastNotifications.error(
        t("TOAST.GRAPHQL_ERROR", {
          errorMessage: error.graphQLErrors[0].message
        }),
        {
          position: "top-right"
        }
      );
    }
    LoadingOverlay.hide();
  };

  const deleteAnalysis = async id => {
    try {
      const deletedAnalysis = await props.deleteAnalysis({
        variables: {
          id
        }
      });

      ToastNotifications.success(
        t("TOAST.ANALYSIS_DELETED_SUCCESSFULLY", {
          analysisName: deletedAnalysis.data.deleteAnalysis.name
        }),
        { position: "top-right" }
      );
      props.onRefetch();
    } catch (error) {
      ToastNotifications.error(
        t("TOAST.GRAPHQL_ERROR", {
          errorMessage: error.graphQLErrors[0].message
        }),
        {
          position: "top-right"
        }
      );
    }
    LoadingOverlay.hide();
  };

  const getAnalysisPdf = async targetAnalysis => {
    const authUser = getUserAuthData();
    if (!authUser || !authUser.token || !authUser.email) {
      props.history.push("/login");
      return;
    }
    LoadingOverlay.showWithText(t("CREATE_PDF_LOADING_INFO"));

    try {
      const result = await props.client.query({
        query: getAnalysisPdfQuery,
        variables: {
          id: targetAnalysis.id,
          longTexts: targetAnalysis.longTexts || false
        }
      });

      LoadingOverlay.showWithText(t("DOWNLOADING_PDF"));
      let fileName;
      if (targetAnalysis.personalAnalysisResults.length > 1) {
        fileName = t("COMPARE_PDF_NAME", {
          firstname: targetAnalysis.inputs[0].firstNames,
          lastname: targetAnalysis.inputs[0].lastName,
          compareFirstname: targetAnalysis.inputs[1].firstNames,
          compareLastname: targetAnalysis.inputs[1].lastName
        });
      } else {
        fileName = t("PDF_NAME", {
          firstname: targetAnalysis.inputs[0].firstNames,
          lastname: targetAnalysis.inputs[0].lastName
        });
      }
      const linkSource = `data:application/pdf;base64,${result.data.getAnalysisPdf}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } catch (error) {
      console.log("Creating PDF failed", error);
    } finally {
      // to see the download overlay for a sec
      setTimeout(() => {
        LoadingOverlay.hide();
      }, 1000);
    }
  };

  const handleOnUseCredit = (analysisId, type) => {
    const { credits } = props;
    const filtered = credits.filter(c => c.type === type);
    if (filtered.length === 1 && filtered[0].total > 0) {
      setConfirmUseCreditDialogOpen(true);
      setCreditToBeUsed({ analysisId, type });
    } else {
      buyModal.setIsOpen(true);
    }
  };

  const spendCredit = async () => {
    LoadingOverlay.showWithText(t("USING_CREDITS_LOADING_INFO"));
    try {
      const { analysisId, type } = creditToBeUsed;
      await props.useCredit({
        variables: {
          analysisId,
          type
        }
      });
      props.onUsedCredit();
      ToastNotifications.success(t("TOAST.CREDITS_USED_SUCCESSFULLY"), {
        position: "top-right"
      });
    } catch (error) {
      ToastNotifications.error(
        t("TOAST.GRAPHQL_ERROR", {
          errorMessage: error.graphQLErrors[0].message
        }),
        {
          position: "top-right"
        }
      );
    } finally {
      LoadingOverlay.hide();
    }
  };

  let panelContent = null;

  if (props.groups.length > 0) {
    panelContent = (
      <Accordion
        defaultActiveKey={
          props.groups && props.groups.length > 0
            ? props.groups[0].id
            : undefined
        }
        activeKey={activeKey}
      >
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
                  isCollapsed={activeKey === group.id}
                  onClick={() => {
                    if (activeKey === group.id) {
                      setActiveKey("");
                    } else {
                      setActiveKey(group.id);
                    }
                  }}
                >
                  {group.isDefault ? t(group.name) : group.name}
                </AnalysisBrowserToggle>
                {!group.isDefault && (
                  <NavigationDropdownMenu
                    key="menu"
                    customToggle={ActionToggleIcon}
                  >
                    <NavigationDropdownMenuItem
                      onClick={() => {
                        setGroupToBeRenamed(group);
                        setRenameGroupDialogOpen(true);
                      }}
                    >
                      <img src={iconEdit} alt="" /> {t("RENAME")}
                    </NavigationDropdownMenuItem>
                    <NavigationDropdownMenuItem
                      onClick={() => {
                        // setting group that is about to be deleted
                        setGroupToBeDeleted(group);
                        // showing confirm dilog
                        setConfirmGroupDeletionDialogOpen(true);
                      }}
                    >
                      <img src={iconDelete} alt="" /> {t("DELETE")}
                    </NavigationDropdownMenuItem>
                  </NavigationDropdownMenu>
                )}
              </Card.Header>
              <Accordion.Collapse eventKey={group.id}>
                <Card.Body>
                  {analysisOfGroup.map(analysis => (
                    <AnalysisListEntry
                      key={analysis.id}
                      analysis={analysis}
                      credits={props.credits}
                      onAnalysisDelete={ev => {
                        setAnalysisToBeDeleted(analysis);
                        setConfirmAnalysisDeletionDialogOpen(true);
                      }}
                      onShortPdfClicked={() => {
                        getAnalysisPdf({ ...analysis, longTexts: false });
                      }}
                      onBuyShortPdfClicked={() => {
                        handleOnUseCredit(analysis.id, SHORT_TYPE);
                      }}
                      onLongPdfClicked={() => {
                        getAnalysisPdf({ ...analysis, longTexts: true });
                      }}
                      onBuyLongPdfClicked={() => {
                        handleOnUseCredit(analysis.id, LONG_TYPE);
                      }}
                    />
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
        {t("NO_GROUPS_OR_ANALYSIS")}
      </p>
    );
  }
  return (
    <div className="akb-analysis-browser">
      <div className="panel-header">
        <div className="header"> {t("ANALYSISS")}</div>
        <div>
          <NavigationDropdownMenu
            key="AddGroupAnalysis"
            customToggle={AddToggleIcon}
          >
            <NavigationDropdownMenuItem
              onClick={() => setCreateGroupDialogOpen(true)}
            >
              <img src={iconGroup} alt="" /> {t("GROUP")}
            </NavigationDropdownMenuItem>
            <NavigationDropdownMenuItem
              onClick={() => props.history.push("/analysisInput")}
            >
              <img src={iconAnalysis} alt="" /> {t("ANALYSIS")}
            </NavigationDropdownMenuItem>
          </NavigationDropdownMenu>
        </div>
      </div>
      <div className="akb-group-headline">{t("GROUPS")}</div>
      <div className="panel-content">{panelContent}</div>
      <ConfirmGroupDeletionDialog
        group={groupToBeDeleted}
        isOpen={confirmGroupDeletionDialogOpen}
        onClose={() => {
          setConfirmGroupDeletionDialogOpen(false);
          setGroupToBeDeleted(null);
        }}
        onAction={() => {
          setConfirmGroupDeletionDialogOpen(false);
          LoadingOverlay.showWithText();
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
          setConfirmAnalysisDeletionDialogOpen(false);
          LoadingOverlay.showWithText();
          deleteAnalysis(analysisToBeDeleted.id);
          setAnalysisToBeDeleted(null);
        }}
      />
      <CreateGroupDialog
        isOpen={createGroupDialogOpen}
        onClose={() => setCreateGroupDialogOpen(false)}
        onAction={groupName => {
          createGroup(groupName);
          setCreateGroupDialogOpen(false);
          LoadingOverlay.showWithText();
        }}
        groups={props.groups.map(item => item.name)}
      />
      <RenameGroupDialog
        isOpen={renameGroupDialogOpen}
        onClose={() => {
          setGroupToBeRenamed(null);
          setRenameGroupDialogOpen(false);
        }}
        onAction={(id, newName) => {
          renameGroup(newName, id);

          setRenameGroupDialogOpen(false);
          LoadingOverlay.showWithText();
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
          dateOfBirth: PropTypes.string.isRequired
        })
      ).isRequired
    })
  ).isRequired,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  createGroup: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  renameGroup: PropTypes.func.isRequired,
  deleteAnalysis: PropTypes.func.isRequired,
  onRefetch: PropTypes.func.isRequired
};

AnalysisBrowser.defaultProps = {};

export default compose(
  graphql(deleteGroupMutation, { name: "deleteGroup" }),
  graphql(createGroupMutation, { name: "createGroup" }),
  graphql(renameGroupMutation, { name: "renameGroup" }),
  graphql(deleteAnalysisMutation, { name: "deleteAnalysis" }),
  graphql(useCreditMutation, { name: "useCredit" })
)(withApollo(withRouter(AnalysisBrowser)));
