import PropTypes from "prop-types";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useQuery } from "@apollo/react-hooks";

import { withRouter } from "react-router-dom";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import ToastNotifications from "cogo-toast";
import * as compose from "lodash.flowright";
import { graphql } from "react-apollo";
import LongBody from "./LongBody";

import { PERSONAL_RESULT_CONFIGURATION_DEFAULT_ID } from "../utils/Configuration";

import { introTextQuery } from "../graphql/Queries";

import { useLoadingOverlay } from "../contexts/LoadingOverlayContext";
import { useUser } from "../contexts/UserContext";
import { saveAnalysisMutation } from "../graphql/Mutations";
import Header from "./Header";
// import AnalForm from "../components/Forms/AnalForm";
import AnalBlock from "./AnalBlock";
import FooterHoriz from "./FooterHoriz";
import Results from "./Sections/Results";
import usePdfTrigger from "../utils/hooks/usePdfTrigger";
import PopupBase from "./Popups/PopupBase";
import BoxWithCards from "./BoxWithCards/BoxWithCards";
import { TYPE_ID_MATRIX } from "../utils/Constants";
import Popup from "./Popups/Popup";
import Topbar from "./Topbar";
// import useAnalysis from "../utils/useAnalysis";
// import moment from "moment";
import Sidebar from "./SidebarD2";
import BaseBtn from "./Buttons/BaseBtn/BaseBtn";

const AnalysisResultPersonalRender = props => {
  // const [startAnalysis] = useAnalysis();
  const [isPDFSaving, setPDFSaving] = useState(false);
  const [isLongPopupOpen, setLongPopupOpen] = useState(false);
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [triggerDownloadPdf, isPDFGenerating] = usePdfTrigger();
  const { t } = useTranslation();
  const User = useUser();
  const [isForProfessionals, setForProfessionals] = useState(false);
  const {
    user,
    match: {
      params: { resultConfigurationId }
    },
    personalAnalysisResult,
    // personalAnalysisCompareResult,
    // match: {
    //   params: { analysisId }
    // },
    configuration
  } = props;
  const LoadingOverlay = useLoadingOverlay();

  const resultConfig = configuration;

  const resultConfigId =
    resultConfigurationId || PERSONAL_RESULT_CONFIGURATION_DEFAULT_ID;

  const sectionIds = resultConfig.map(section => section.name);
  sectionIds.push(resultConfigId.toLowerCase());

  const { loading, error, data } = useQuery(introTextQuery, {
    variables: {
      sectionIds,
      isPdf: false,
      longText: false,
      langId: User.currentLanguage.id
    }
  });

  if (loading) {
    LoadingOverlay.showWithText(t("GENERATE_REPORT"));
    return null;
  }

  if (error) {
    LoadingOverlay.showWithText(t("ERROR_OCCURED"));
    return null;
  }

  const { introTexts } = data;

  const buildTourDataStructure = (
    resultData,
    configuration,
    introTexts,
    user
  ) => {
    return configuration.map(resultSection => {
      const sectionIntroText = introTexts.filter(
        text => text.sectionId === resultSection.name
      )[0];

      const resultSectionElements = [];

      if (!user || user.showCategoryExplanations) {
        resultSectionElements.push({
          type: "sectionIntroText",
          title: sectionIntroText.title,
          text: sectionIntroText.text
        });
      }

      resultSection.tables.forEach(resultTable => {
        resultSectionElements.push(
          ...resultTable.numberIds
            .map(numberId => ({
              ..._.get(resultData, numberId),
              type: "resultText"
            }))
            .filter(item => item.result.type !== TYPE_ID_MATRIX)
            .filter(item => item.result.value || item.result.list.length > 0)
        );
      });

      return {
        sectionName: resultSection.name,
        sectionElements: resultSectionElements
      };
    });
  };

  const buildContentDataStructure = (configuration, result) =>
    configuration.map(configSection => {
      const numberTitles = [];
      configSection.tables.forEach(table =>
        numberTitles.push(
          ...table.numberIds.map(numberId => {
            const numberResult = _.get(result, numberId);
            const { name } = numberResult;
            const value =
              numberResult.result.type === "number"
                ? numberResult.result.value
                : null;

            const title = `${name} ${value ? `= ${value}` : ""}`;

            return {
              title,
              anchor: numberResult.numberId
            };
          })
        )
      );

      return {
        name: configSection.name,
        titles: numberTitles
      };
    });

  async function saveAnalysis(name, groupId) {
    const firstNames = decodeURIComponent(props.match.params.firstNames);
    const lastNames = decodeURIComponent(props.match.params.lastNames);
    const dateOfBirth = decodeURIComponent(props.match.params.dateOfBirth);

    let nameInputs = [];
    if (lastNames.split(",").length > 1) {
      const firstNamesArray = firstNames.split(",");
      const lastNamesArray = lastNames.split(",");
      nameInputs = firstNamesArray.map((item, index) => ({
        firstNames: item,
        lastName: lastNamesArray[index],
        dateOfBirth
      }));
    } else {
      nameInputs = [
        {
          firstNames,
          lastName: lastNames,
          dateOfBirth
        }
      ];
    }

    try {
      setPDFSaving(true);
      const result = await props.saveAnalysis({
        variables: {
          name,
          group: groupId,
          inputs: nameInputs
        }
      });

      LoadingOverlay.hide();
      User.setIsAnalResultWasSaved(true);
      ToastNotifications.success(
        t("TOAST.ANALYSIS_CREATED_SUCCESSFULLY", {
          name
        }),
        { position: "top-right" }
      );
      setPDFSaving(false);

      // graphql ignores refetches if the same call is already pending, therefore we wait 2sec (randomly) and continue with a refetch
      setTimeout(() => {
        User.fetchUser();
      }, 2000);
      // return saved analysis
      return result.data.saveAnalysis;
    } catch (error) {
      setPDFSaving(false);
      User.setIsAnalResultWasSaved(false);
      ToastNotifications.error(
        t("TOAST.GRAPHQL_ERROR", { errorMessage: error.message }),
        {
          position: "top-right"
        }
      );
    }
  }

  LoadingOverlay.hide();

  // const onSubmit = data => {
  //   const { name, lastname, altname, altlastname, day, month, year } = data;
  //   const formatedDate = moment(`${year}-${month}-${day}`).format("DD.MM.YYYY");
  //   startAnalysis(name, lastname, altname, altlastname, formatedDate);
  // };

  const structure = buildContentDataStructure(
    resultConfig,
    personalAnalysisResult
  );

  const sections = resultConfig.reduce((acc, el) => {
    const items = el.tables.map(table => ({
      rows: table.numberIds.map(numberId =>
        _.get(personalAnalysisResult, numberId)
      ),
      showTitle: Boolean(table.showTitle),
      name: table.name,
      accessLevel: personalAnalysisResult.accessLevel
    }));

    const section = {
      sectionHeading: el.name,
      groups: items
    };

    acc.push(section);

    return acc;
  }, []);

  const saveNamedAnalysis = async () => {
    const firstNames = decodeURIComponent(props.match.params.firstNames);
    const lastNames = decodeURIComponent(props.match.params.lastNames);
    const dateOfBirth = decodeURIComponent(props.match.params.dateOfBirth);

    let analysisName;
    if (lastNames.split(",").length > 1) {
      const firstName = firstNames.split(",")[0];
      const firstNameComfort = firstNames.split(",")[1];
      const lastName = lastNames.split(",")[0];
      const lastNameComfort = lastNames.split(",")[1];

      analysisName = `${firstName} ${lastName} / ${firstNameComfort} ${lastNameComfort}, ${dateOfBirth}`;
    } else {
      analysisName = `${firstNames} ${lastNames}, ${dateOfBirth}`;
    }
    // My analyses group id is hardcoded
    return await saveAnalysis(analysisName, 641);
  };

  const handleDownloadClick = async () => {
    const analysisId = decodeURIComponent(props.match.params.analysisId);

    // try to find existing analysis in the Users analysis list by id from URL
    if (analysisId !== "undefined") {
      const anal = User.user.analyses.find(
        analysis => analysis.id === analysisId
      );
      // if analysis was found, try generate & download it
      if (anal) {
        triggerDownloadPdf(anal);
      } else {
        // in bad case we show messsage to user
        ToastNotifications.error(t("Please, try to download PDF later"), {
          position: "top-right"
        });
      }
    } else {
      // if no analysis id is provided, we need to save the analysis first
      const saved = await saveNamedAnalysis();
      // then generate & download the pdf
      triggerDownloadPdf(saved);
    }
  };

  // function that tells if analysis can be downloaded
  const isDownloadable = () => {
    // if user authenticated and pdf is not generating right now and analysis is not saving
    if (!isPDFGenerating && !isPDFSaving) {
      return true;
    }
    return false;
  };

  const openPopup = () => {
    setPopupVisibility(true);
  };

  const closePopup = () => {
    setPopupVisibility(false);
  };

  const sectionsData = buildTourDataStructure(
    personalAnalysisResult,
    resultConfig,
    introTexts,
    user
  );

  const handleMoreClick = sectionName => {
    const index = sectionsData.findIndex(
      section => section.sectionName === sectionName
    );
    setCurrentSectionIdx(index);
    setLongPopupOpen(true);
  };

  const handleNavClick = dir => {
    dir === "next"
      ? setCurrentSectionIdx(currentSectionIdx + 1)
      : setCurrentSectionIdx(currentSectionIdx - 1);
  };

  const renderDownloadBtn = () => {
    if (!User?.user) {
      return (
        <button className="aside-btn blue-btn" disabled={true}>
          <span>{t("ASIDE_DOWNLOADBTN_UNAUTH_TEXT")}</span>
        </button>
      );
    } else {
      return isDownloadable() ? (
        <button
          className="aside-btn blue-btn"
          onClick={handleDownloadClick}
          disabled={!isDownloadable()}
        >
          <span>{t("ASIDE_DOWNLOADBTN_AUTH_TEXT")}</span>
        </button>
      ) : (
        <button
          className="aside-btn blue-btn no-img"
          onClick={handleDownloadClick}
          disabled={!isDownloadable()}
        >
          <Spinner animation="border" role="status" variant="light" />
        </button>
      );
    }
  };

  return (
    <>
      <section className="anal">
        <Header
          user={User?.user}
          plusBtn={openPopup}
          isSidebarVisible={isSidebarVisible}
          onOpen={() => setSidebarVisible(true)}
          onClose={() => setSidebarVisible(false)}
        />
        <Sidebar isVisible={isSidebarVisible} openPopup={openPopup} />
        <div className="container">
          <div className="anal-inner">
            <BaseBtn className="anal-btn__back" href="/" link>
              {"< Personal analyses"}
            </BaseBtn>
            <h1 className="anal-title">
              {`
                ${personalAnalysisResult.firstNames}
                ${personalAnalysisResult.lastName}
              `}
            </h1>
            <p className="anal-date">{personalAnalysisResult.dateOfBirth}</p>
            {/* <h1 className="anal-title">{t("ANAL_TITLE_TEXT")}</h1> */}
            {/* <div className="anal-form__wrapper">
              <AnalForm onSubmit={onSubmit} />
            </div> */}
            {renderDownloadBtn()}
          </div>
          {User?.user && <AnalBlock anals={User?.user?.analyses} />}
        </div>
      </section>
      <Results
        sidebarItems={structure}
        renderItems={sections}
        downloadBtn={renderDownloadBtn}
        onBuyClick={openPopup}
        onMoreClick={handleMoreClick}
      />
      <FooterHoriz />
      {isPopupVisible && (
        <PopupBase
          name="Pricing"
          title="Read all texts of numerological analysis!"
          onClose={closePopup}
          children={<BoxWithCards />}
        />
      )}
      {isLongPopupOpen && (
        <Popup>
          <Topbar
            toggleValue={isForProfessionals}
            onToggleChange={() => setForProfessionals(!isForProfessionals)}
            onCrossClick={() => setLongPopupOpen(false)}
          />
          <LongBody
            section={sectionsData[currentSectionIdx]}
            isForProfessionals={isForProfessionals}
            onNavClick={handleNavClick}
            prevName={sectionsData[currentSectionIdx - 1]?.sectionName}
            nextName={sectionsData[currentSectionIdx + 1]?.sectionName}
          />
        </Popup>
      )}
    </>
  );
};

// setting proptypes
AnalysisResultPersonalRender.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default compose(graphql(saveAnalysisMutation, { name: "saveAnalysis" }))(
  withRouter(AnalysisResultPersonalRender)
);
