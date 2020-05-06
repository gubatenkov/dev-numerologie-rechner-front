import React from "react";
import PropTyes from "prop-types";
import { useTranslation } from "react-i18next";
import Dialog from "./Dialog";

const ConfirmGroupDeletionDialog = props => {
  const { t } = useTranslation();
  return (
    <Dialog
      {...props}
      title={t("DIALOG.DELETE_GROUP")}
      cancelTitle={t("DIALOG.CANCEL")}
      actionTitle={t("DIALOG.DELETE")}
    >
      <p>
        {t("DIALOG.SURE_TO_DELETE_GROUP", {
          group: props.group && props.group.name
        })}
      </p>
    </Dialog>
  );
};

ConfirmGroupDeletionDialog.propTypes = {
  group: PropTyes.shape({
    name: PropTyes.string.isRequired
  })
};

ConfirmGroupDeletionDialog.defaultProps = {
  group: null
};

export default ConfirmGroupDeletionDialog;
