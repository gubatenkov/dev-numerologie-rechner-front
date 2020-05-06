import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Dialog from "./Dialog";
import { useEffect, useState } from "react";

const CreateGroupDialog = props => {
  const { t } = useTranslation();
  const [groupName, setGroupName] = useState(null);
  const [groupNameInput, setGroupNameInput] = useState(null);

  useEffect(() => {
    if (groupNameInput) {
      groupNameInput.focus();
    }
  });

  const handleCreateClick = () => {
    // todo add validation
    if (groupName) {
      props.onAction(groupName);
    }
  };

  const handleInputchange = newGroupName => {
    setGroupName(newGroupName.target.value);
  };

  return (
    <Dialog
      {...props}
      onAction={handleCreateClick}
      title={t("DIALOG.CREATE_NEW_GROUP")}
      cancelTitle={t("DIALOG.CANCEL")}
      actionTitle={t("DIALOG.CREATE")}
    >
      <p>{t("DIALOG.GROUP_NAME")}</p>
      <input
        type="text"
        className="form-control"
        placeholder={t("DIALOG.NEW_GROUP")}
        onChange={handleInputchange}
        ref={ref => {
          setGroupNameInput(ref);
        }}
      />
    </Dialog>
  );
};

CreateGroupDialog.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAction: PropTypes.func
};

CreateGroupDialog.defaultProps = {
  onAction: () => {}
};

export default CreateGroupDialog;
