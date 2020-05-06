import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Dialog from "./Dialog";
import { useEffect, useState } from "react";

const RenameGroupDialog = props => {
  const { t } = useTranslation();
  const [groupName, setgroupName] = useState(null);
  const [groupNameInput, setGroupNameInput] = useState(null);

  useEffect(() => {
    if (groupNameInput) {
      groupNameInput.focus();
    }
  });

  const handleRenameClick = () => {
    // todo add validation
    if (groupName) {
      props.onAction(props.group.id, groupName);
    }
  };

  const handleInputchange = newGroupName => {
    setgroupName(newGroupName.target.value);
  };

  return (
    <Dialog
      {...props}
      onAction={handleRenameClick}
      title={t("DIALOG.RENAME_GROUP")}
      cancelTitle={t("DIALOG.CANCEL")}
      actionTitle={t("DIALOG.RENAME")}
    >
      <p>
        {t("DIALOG.ENTER_NAME_FOR_GROUP", {
          name: props.group && props.group.name
        })}
      </p>
      <input
        type="text"
        className="form-control"
        placeholder={props.group && props.group.name}
        onChange={handleInputchange}
        ref={ref => {
          setGroupNameInput(ref);
        }}
      />
    </Dialog>
  );
};

RenameGroupDialog.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }),
  onAction: PropTypes.func.isRequired
};

RenameGroupDialog.defaultProps = {
  group: null
};

export default RenameGroupDialog;
