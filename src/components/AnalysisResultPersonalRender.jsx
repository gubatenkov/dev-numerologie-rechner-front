import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";

import { withRouter } from "react-router-dom";
import _ from "lodash";
// import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ToastNotifications from "cogo-toast";
import * as compose from "lodash.flowright";
import { graphql } from "react-apollo";

// icons
// import bookIconWhite from "../images/icon_openBook_white.svg";
// import bookIconPrimary from "../images/icon_openBook_primary.svg";
// import saveIconPrimary from "../images/icon_save_primary.svg";
// import iconBackPrimary from "../images/icon_back_primary.svg";
// import iconClosePrimary from "../images/icon_close_primary.svg";

// components
// import TitleBar from "./TitleBar";
// import NavigationBar from "./NavigationBar";
// import ContentNavigation from "./ContentNavigation";
// import ResultPanel from "./ResultPanel";
// import ResultTable from "./ResultTable";
// import TourView from "./TourView";
// import TextButton from "./Buttons/TextButton";
// import NameInputDialog from "./dialogs/NameInputDialog";
// import Footer from "./Footer";
// import CreditsBuyModal from "./CreditsBuy/CreditsBuyModal";
// import AnalysisAutoSaveDialog from "./dialogs/AnalysisAutoSaveDialog";

// import { MOBILE_RESOLUTION_THRESHOLD } from "../utils/Constants";

import { PERSONAL_RESULT_CONFIGURATION_DEFAULT_ID } from "../utils/Configuration";

import {
  introTextQuery
  // userSettingsQuery
} from "../graphql/Queries";

// import { TYPE_ID_MATRIX } from "../utils/Constants";

// import ActionBar from "./ActionBar";
import { useLoadingOverlay } from "../contexts/LoadingOverlayContext";
// import MainContainer from "./MainContainer";
import { useUser } from "../contexts/UserContext";
// import SaveAnalysisDialog from "./dialogs/SaveAnalysisDialog";
import { saveAnalysisMutation } from "../graphql/Mutations";
import Header from "./Header";
import AnalForm from "../components/Forms/AnalForm";
import AnalBlock from "./AnalBlock";
import FooterHoriz from "./FooterHoriz";
import Results from "./Sections/Results";
import usePdfTrigger from "../utils/hooks/usePdfTrigger";
import PopupBase from "./Popups/PopupBase";
import BoxWithCards from "./BoxWithCards/BoxWithCards";
import { TYPE_ID_MATRIX } from "../utils/Constants";
import TourView from "./TourView";
import Popup from "./Popups/Popup";
import Topbar from "./Topbar";

// const ContentArea = styled.div`
//   display: flex;
//   align-content: flex-start;
//   flex-direction: row;
// `;

// const ResultContent = styled.div`
//   padding: 0 15px;
//   @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
//   }
//   width: 100%;
// `;

const AnalysisResultPersonalRender = props => {
  // const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  // const [userSettings, setUserSettings] = useState(props.user);
  // const [groups, setGroups] = useState([]);
  const [isPDFSaving, setPDFSaving] = useState(false);
  const [triggerDownloadPdf, isPDFGenerating] = usePdfTrigger();
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const { t } = useTranslation();
  const User = useUser();
  const {
    // user,
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
  // const {
  //   data: userSettingsData,
  //   refetch
  // } = useQuery(userSettingsQuery, {
  //   fetchPolicy: "network-only",
  //   onCompleted: data => {
  //     if (error) {
  //       return;
  //     }
  //     setUserSettings(userSettingsData);
  //   }
  // });

  // useEffect(() => {
  //   if (User?.user?.currentUser) {
  //     setGroups(User?.user?.currentUser?.groups);
  //   }
  // }, [User.isFetching, User]);

  // const [showSaveModal, setShowSaveModal] = useState(false);
  const [tourData, setTourData] = useState([]);
  const [tourStructure, setTourStructure] = useState([]);

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

  useEffect(() => {
    if (data) setTourData(data);
  }, [data]);

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

  useEffect(() => {
    if (
      User?.user?.currentUser &&
      tourData?.introTexts &&
      personalAnalysisResult &&
      resultConfig
    ) {
      const struct = buildTourDataStructure(
        personalAnalysisResult,
        resultConfig,
        tourData.introTexts,
        User.user.currentUser
      );
      setTourStructure(struct);
    }
  }, [User, tourData, personalAnalysisResult, resultConfig]);

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

  // const handleItemDetailClick = (sectionId, numberId) => {
  //   const tourDataStructure = buildTourDataStructure(
  //     props.personalAnalysisResult,
  //     resultConfig,
  //     introTexts,
  //     userSettings
  //   );

  //   let sectionIndex = tourDataStructure.findIndex(
  //     section => section.sectionName === sectionId
  //   );

  //   if (sectionIndex < 0) {
  //     sectionIndex = 0;
  //   }

  //   let elementIndex = tourDataStructure[
  //     sectionIndex
  //   ].sectionElements.findIndex(element => element.numberId === numberId);

  //   if (elementIndex < 0) {
  //     elementIndex = 0;
  //   }

  //   setIsTourOpen(true);
  //   setTourSectionIndex(sectionIndex);
  //   setTourElementIndex(elementIndex);
  // };

  // const navigateToElementHandler = anchor => {
  //   const domElement = document.getElementById(anchor);
  //   if (domElement) {
  //     domElement.scrollIntoView({ block: "start", behavior: "smooth" });
  //   }
  // };

  // const handleClose = () => {
  //   if (analysisId) {
  //     props.history.push("/userHome");
  //   } else {
  //     setShowSaveModal(true);
  //   }
  // };

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

  // const handleSaveBtnClick = () => setSaveDialogOpen(true);

  LoadingOverlay.hide();

  // const userSettingsChanged = async () => {
  //   try {
  //     const res = await refetch();
  //     if (res?.data?.currentUser) {
  //       setUserSettings(res.data.currentUser);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const onSubmit = () => console.log("submit");

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

  return (
    <>
      <section className="anal">
        <Header user={User?.user} plusBtn={openPopup} />
        <div className="container">
          <div className="anal-inner">
            <h1 className="anal-title">Numerology Calculator</h1>
            <div className="anal-form__wrapper">
              <AnalForm onSubmit={onSubmit} />
            </div>
          </div>
          {User?.user && <AnalBlock anals={User?.user?.analyses} />}
        </div>
      </section>
      <Results
        sidebarItems={structure}
        renderItems={sections}
        onDownloadClick={handleDownloadClick}
        isDownloadable={isDownloadable()}
        onBuyClick={openPopup}
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
      {false && (
        <Popup>
          <Topbar />
        </Popup>
      )}
      {/* <TourView
        onClose={() => console.log("closed")}
        tourData={tourData}
        name={`${personalAnalysisResult.firstNames} ${personalAnalysisResult.lastName}`}
        // compareTourData={
        //   personalAnalysisCompareResult &&
        //   buildTourDataStructure(
        //     personalAnalysisCompareResult,
        //     resultConfig,
        //     introTexts,
        //     userSettings
        //   )
        // }
        // compareName={
        //   personalAnalysisCompareResult &&
        //   `${personalAnalysisCompareResult.firstNames} ${personalAnalysisCompareResult.lastName}`
        // }
        // sectionIndex={tourSectionIndex}
        // elementIndex={tourElementIndex}
        // onIndexChange={(sectionIndex, elementIndex) => {
        //   setTourSectionIndex(sectionIndex);
        //   setTourElementIndex(elementIndex);
        // }}
      //   user={User?.user?.currentUser}
      //   accessLevel={personalAnalysisResult.accessLevel}
      // />
      {/* <MainContainer>
        <NavigationBar
          leftButtonIcon={isTourOpen ? iconClosePrimary : iconBackPrimary}
          leftButtonOnClick={
            isTourOpen ? () => setIsTourOpen(false) : () => handleClose()
          }
          isSettingsVisibleOnBookPage={isTourOpen}
          userSettingsChanged={userSettingsChanged}
        />
        {!isTourOpen && [
          <TitleBar
            primaryName={`${personalAnalysisResult.firstNames} ${personalAnalysisResult.lastName}`}
            primaryDate={personalAnalysisResult.dateOfBirth}
            secondaryName={
              personalAnalysisCompareResult &&
              `${personalAnalysisCompareResult.firstNames} ${personalAnalysisCompareResult.lastName}`
            }
            onRemoveSecondaryName={() => {
              props.history.push(
                `/resultPersonal/${personalAnalysisResult.firstNames}/${personalAnalysisResult.lastName}/${personalAnalysisResult.dateOfBirth}`
              );
            }}
            key="titlebar"
          />,
          <ActionBar key="actionbar">
            <TextButton
              title={t("COMPARE_NAME")}
              onClick={() => setIsNameDialogOpen(true)}
            />
            <TextButton
              icon={saveIconPrimary}
              title={t("SAVE")}
              onClick={handleSaveBtnClick}
            />
            <TextButton
              primary
              icon={bookIconWhite}
              title={t("READ_ALL")}
              onClick={() => {
                setIsTourOpen(true);
                setTourSectionIndex(0);
                setTourElementIndex(0);
              }}
            />
          </ActionBar>,
          <ContentArea key="resultContent">
            <ContentNavigation
              contentItems={buildContentDataStructure(
                resultConfig,
                personalAnalysisResult
              )}
              onItemClick={navigateToElementHandler}
              autoAdapt
            />

            <ResultContent>
              {resultConfig.map(resultSection => (
                <ResultPanel
                  title={resultSection.name}
                  rightActionIcon={bookIconPrimary}
                  onRightActionClick={() =>
                    handleItemDetailClick(resultSection.name)
                  }
                  id={resultSection.name}
                  key={resultSection.name}
                >
                  {resultSection.tables.map(tableData => (
                    <ResultTable
                      name={tableData.name}
                      numbers={tableData.numberIds.map(numberId =>
                        _.get(personalAnalysisResult, numberId)
                      )}
                      compareNumbers={
                        personalAnalysisCompareResult &&
                        tableData.numberIds.map(numberId =>
                          _.get(personalAnalysisCompareResult, numberId)
                        )
                      }
                      headings={tableData.headings}
                      showTitle={tableData.showTitle}
                      handleTextDetailClick={handleItemDetailClick}
                      sectionId={resultSection.name}
                      accessLevel={personalAnalysisResult.accessLevel}
                      key={`${resultSection.name + tableData.name}`}
                    />
                  ))}
                </ResultPanel>
              ))}
            </ResultContent>
          </ContentArea>
        ]}

        {isTourOpen && (
          <TourView
            onClose={() => setIsTourOpen(false)}
            tourData={buildTourDataStructure(
              personalAnalysisResult,
              resultConfig,
              introTexts,
              userSettings
            )}
            name={`${personalAnalysisResult.firstNames} ${personalAnalysisResult.lastName}`}
            compareTourData={
              personalAnalysisCompareResult &&
              buildTourDataStructure(
                personalAnalysisCompareResult,
                resultConfig,
                introTexts,
                userSettings
              )
            }
            compareName={
              personalAnalysisCompareResult &&
              `${personalAnalysisCompareResult.firstNames} ${personalAnalysisCompareResult.lastName}`
            }
            sectionIndex={tourSectionIndex}
            elementIndex={tourElementIndex}
            onIndexChange={(sectionIndex, elementIndex) => {
              setTourSectionIndex(sectionIndex);
              setTourElementIndex(elementIndex);
            }}
            user={userSettings}
            accessLevel={personalAnalysisResult.accessLevel}
          />
        )}

        <NameInputDialog
          show={isNameDialogOpen}
          onHide={() => setIsNameDialogOpen(false)}
          firstNames={personalAnalysisResult.firstNames}
          lastName={personalAnalysisResult.lastName}
          compareFirstNames={
            personalAnalysisCompareResult &&
            personalAnalysisCompareResult.firstNames
          }
          compareLastName={
            personalAnalysisCompareResult &&
            personalAnalysisCompareResult.lastName
          }
          onChange={(
            firstNames,
            lastName,
            compareFirstNames,
            compareLastName
          ) => {
            const hasCompareName =
              !!(compareFirstNames.length > 0) ||
              !!(compareLastName.length > 0);

            let hasNameChanged =
              firstNames !== personalAnalysisResult.firstNames ||
              lastName !== personalAnalysisResult.lastName;

            if (personalAnalysisCompareResult) {
              hasNameChanged =
                hasNameChanged ||
                compareFirstNames !==
                  personalAnalysisCompareResult.firstNames ||
                compareLastName !== personalAnalysisCompareResult.lastName;
            } else {
              hasNameChanged = hasNameChanged || hasCompareName;
            }

            if (hasNameChanged) {
              let firstNameParam;
              let lastNameParam;

              if (hasCompareName) {
                firstNameParam = [firstNames, compareFirstNames || firstNames];
                lastNameParam = [lastName, compareLastName || lastName];
              } else {
                firstNameParam = firstNames;
                lastNameParam = lastName;
              }

              props.history.push(
                `/resultPersonal/${firstNameParam}/${lastNameParam}/${personalAnalysisResult.dateOfBirth}`
              );
            } else {
              setIsNameDialogOpen(false);
            }
          }}
        />
        <CreditsBuyModal />
        <AnalysisAutoSaveDialog
          onAction={() => setShowSaveModal(false)}
          isOpen={showSaveModal}
          onCancel={() => props.history.push("/userHome")}
          onClose={() => setShowSaveModal(false)}
        />
        <SaveAnalysisDialog
          isOpen={saveDialogOpen}
          onClose={() => setSaveDialogOpen(false)}
          onSave={group => {
            const firstNames = decodeURIComponent(
              props.match.params.firstNames
            );
            const lastNames = decodeURIComponent(props.match.params.lastNames);
            const dateOfBirth = decodeURIComponent(
              props.match.params.dateOfBirth
            );

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
            saveAnalysis(analysisName, group.id);
            setSaveDialogOpen(false);
            LoadingOverlay.showWithText();
          }}
          groups={groups}
        />
        {!isTourOpen && <Footer />}
      </MainContainer> */}
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
