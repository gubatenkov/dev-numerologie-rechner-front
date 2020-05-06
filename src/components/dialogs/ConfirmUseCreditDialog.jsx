import React from "react";
import PropTyes from "prop-types";
import { useTranslation } from "react-i18next";
import Dialog from "./Dialog";

const ConfirmUseCreditDialog = props => {
  const { t } = useTranslation();
  return (
    <Dialog
      {...props}
      title={t("DIALOG.USE_CREDITS")}
      cancelTitle={t("DIALOG.CANCEL")}
      actionTitle={t("DIALOG.YES_USE_IT")}
    >
      <p>{t("DIALOG.USE_CREDIT_INFO")}</p>
    </Dialog>
  );
};

ConfirmUseCreditDialog.propTypes = {
  analysis: PropTyes.shape({
    name: PropTyes.string.isRequired
  })
};

ConfirmUseCreditDialog.defaultProps = {
  analysis: null
};

export default ConfirmUseCreditDialog;
