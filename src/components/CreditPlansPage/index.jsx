import React, { useState } from "react";

import Header from "../Header";
import Plans from "../Sections/Plans";
import LinksBlock from "../LinksBlock";
import FooterHoriz from "../FooterHoriz";
import PopupBase from "../Popups/PopupBase";
import { useUser } from "../../contexts/UserContext";
import BoxWithCards from "../BoxWithCards/BoxWithCards";

const CreditPlansPage = () => {
  const User = useUser();
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const openPopup = () => setPopupVisibility(true);

  const closePopup = () => setPopupVisibility(false);

  return (
    <div className="plans-page">
      <section className="anal">
        <Header user={User?.user} plusBtn={openPopup} />
        <div className="container">
          <div className="anal-inner">
            <h1 className="anal-title">Analysis Comparison</h1>
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
