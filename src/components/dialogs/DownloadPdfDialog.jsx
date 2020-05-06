import React from "react";
import PropTyes from "prop-types";
import { useTranslation } from "react-i18next";
import Dialog from "./Dialog";

const DownloadPdfDialog = props => {
  const { t } = useTranslation();

  return (
    <Dialog
      {...props}
      title={t("DIALOG.DOWNLOAD_PDF")}
      cancelTitle={t("DIALOG.CANCEL")}
      actionTitle={t("DIALOG.DOWNLOAD")}
    >
      <p>{t("DIALOG.DOWNLOAD_INFO")}</p>
    </Dialog>
  );
};

DownloadPdfDialog.propTypes = {
  analysis: PropTyes.shape({
    name: PropTyes.string.isRequired
  })
};

DownloadPdfDialog.defaultProps = {
  analysis: null
};
export default DownloadPdfDialog;
