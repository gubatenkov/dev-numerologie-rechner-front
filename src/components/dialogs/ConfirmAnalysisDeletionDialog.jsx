import React from "react";
import PropTyes from "prop-types";
import { useTranslation } from "react-i18next";
import Dialog from "./Dialog";

const ConfirmAnalysisDeletionDialog = props => {
  const { t } = useTranslation();
  return (
    <Dialog
      {...props}
      title={t("DIALOG.DELETE_ANALYSIS")}
      cancelTitle={t("CANCEL")}
      actionTitle={t("DELETE")}
    >
      <p>
        {t("DIALOG.SURE_TO_DELETE_NAME", {
          name: props.analysis && props.analysis.name
        })}
      </p>
    </Dialog>
  );
};

ConfirmAnalysisDeletionDialog.propTypes = {
  analysis: PropTyes.shape({
    name: PropTyes.string.isRequired
  })
};

ConfirmAnalysisDeletionDialog.defaultProps = {
  analysis: null
};

export default ConfirmAnalysisDeletionDialog;
