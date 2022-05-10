import React, { useState } from "react";

import Header from "../Header";
import AnalBlock from "../AnalBlock";
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
          {User?.user?.analyses?.length && (
            <AnalBlock anals={User?.user?.analyses} text="Learn more" />
          )}
        </div>
      </section>

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
