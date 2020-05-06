import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Dialog from "./Dialog";

const SaveAnalysisDialog = props => {
  const { t } = useTranslation();
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <Dialog
      isOpen={props.isOpen}
      onClose={props.onClose}
      onAction={() => props.onSave(selectedGroup)}
      title={t("DIALOG.SAVE_ANALYSIS")}
      cancelTitle={t("DIALOG.CANCEL")}
      actionTitle={t("DIALOG.YES")}
    >
      <p>{t("DIALOG.GROUP")}</p>
      <div className="dropdown">
        <select
          className="form-control"
          onChange={newSelect => {
            setSelectedGroup(
              props.groups.find(item => item.name === newSelect.target.value)
            );
          }}
        >
          {props.groups.map(item => (
            <option key={item.name}>{item.name}</option>
          ))}
        </select>
      </div>
      <p>
        <small>{t("DIALOG.CHOOSE_GROUP")}</small>
      </p>
    </Dialog>
  );
};

SaveAnalysisDialog.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

SaveAnalysisDialog.defaultProps = {
  isOpen: false
};

export default SaveAnalysisDialog;
