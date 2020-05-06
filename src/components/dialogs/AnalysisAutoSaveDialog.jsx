import React from "react";
import { useTranslation } from "react-i18next";
import Dialog from "./Dialog";

const AnalysisAutoSaveDialog = props => {
  const { t } = useTranslation();
  return (
    <Dialog
      {...props}
      title={t("DIALOG.SAVE_ANALYSIS")}
      cancelTitle={t("DIALOG.NO")}
      actionTitle={t("DIALOG.YES_SAVE")}
    >
      <p>{t("DIALOG.SAVE_BEFORE_LEAVING")}</p>
    </Dialog>
  );
};

export default AnalysisAutoSaveDialog;
