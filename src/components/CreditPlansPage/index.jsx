import React, { useState } from "react";

import "./index.scss";

import Header from "../Header";
import Sidebar from "../SidebarD2";
import Plans from "../Sections/Plans";
import LinksBlock from "../LinksBlock";
import FooterHoriz from "../FooterHoriz";
import PopupBase from "../Popups/PopupBase";
import { useUser } from "../../contexts/UserContext";
import BoxWithCards from "../BoxWithCards/BoxWithCards";
import { useTranslation } from "react-i18next";

const CreditPlansPage = () => {
  const User = useUser();
  const { t } = useTranslation();
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const openPopup = () => setPopupVisibility(true);

  const closePopup = () => setPopupVisibility(false);

  return (
    <div className="plans-page">
      <Header
        user={User?.user}
        plusBtn={openPopup}
        isSidebarVisible={isSidebarVisible}
        onOpen={() => setSidebarVisible(true)}
        onClose={() => setSidebarVisible(false)}
      />
      <Sidebar isVisible={isSidebarVisible} openPopup={openPopup} />
      <section className="anal">
        <div className="container">
          <div className="anal-inner">
            <h1 className="anal-title">{t("PLANS_TITLE_TEXT")}</h1>
          </div>
          <LinksBlock />
        </div>
      </section>
      <Plans />
      <FooterHoriz />
      {isPopupVisible && (
        <PopupBase
          name="Pricing"
          title="Read all texts of numerological analysis!"
          onClose={closePopup}
          children={<BoxWithCards />}
        />
      )}
    </div>
  );
};

export default CreditPlansPage;
