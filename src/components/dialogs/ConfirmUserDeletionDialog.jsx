import React from "react";
import { useTranslation } from "react-i18next";
import Dialog from "./Dialog";

const ConfirmUserDeletionDialog = props => {
  const { t } = useTranslation();
  return (
    <Dialog
      {...props}
      title={t("DIALOG.DELETE_USER")}
      cancelTitle={t("DIALOG.CANCEL")}
      actionTitle={t("DIALOG.DELETE")}
    >
      <p>{t("DIALOG.DELETE_USER_INFO")}</p>
    </Dialog>
  );
};

export default ConfirmUserDeletionDialog;
