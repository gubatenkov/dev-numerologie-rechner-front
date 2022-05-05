import ToastNotifications from "cogo-toast";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { client } from "../../index";
import { getUserAuthData } from "../AuthUtils";
import { getAnalysisPdfQuery } from "../../graphql/Queries";
import { useLoadingOverlay } from "../../contexts/LoadingOverlayContext";
import { useState } from "react";

const usePdfTrigger = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const authUser = getUserAuthData();
  const LoadingOverlay = useLoadingOverlay();
  const [isGenerating, setGenerating] = useState(false);

  const getAnalysisPdf = async targetAnalysis => {
    if (!authUser || !authUser.token || !authUser.email) {
      history.push("/login");
      return;
    }

    if (!localStorage.getItem("isPdfLoading")) {
      LoadingOverlay.showWithText(t("CREATE_PDF_LOADING_INFO"));
      try {
        setGenerating(true);
        localStorage.setItem("isPdfLoading", "1");
        const result = await client.query({
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
        ToastNotifications.error(t("Please, try to download PDF later"), {
          position: "top-right"
        });
      } finally {
        setGenerating(false);
        localStorage.setItem("isPdfLoading", "");
        // to see the download overlay for a sec
        setTimeout(() => {
          LoadingOverlay.hide();
        }, 1000);
      }
    } else {
      ToastNotifications.error(
        t("Please wait, previous document is not downloaded yet"),
        {
          position: "top-right"
        }
      );
    }
  };

  return [getAnalysisPdf, isGenerating];
};

export default usePdfTrigger;
