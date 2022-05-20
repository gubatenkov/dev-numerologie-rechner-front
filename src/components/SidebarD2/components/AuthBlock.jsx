import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";

import "./AuthBlock.scss";

import PillImg from "../../PillImg";
import LangDrop from "../../LangDrop";
import ButtonImg from "../../Buttons/ButtonImg";

import plusIcon from "../../../images/plus.svg";

const AuthBlock = ({ user, openPopup }) => {
  const { t } = useTranslation();
  const [longs, setLongs] = useState(0);
  const [shorts, setShorts] = useState(0);

  // if number of user credits was changed, update the number of shorts and longs
  useEffect(() => {
    updateUserCredits();
    // eslint-disable-next-line
  }, [user]);

  const updateUserCredits = () => {
    if (user) {
      const data = user?.currentUser?.credits;
      const newShorts = data?.find(el => el?.type === "persoenlichkeit_kurz")
        ?.total;
      const newLongs = data?.find(el => el?.type === "persoenlichkeit_lang")
        ?.total;
      if (newShorts && newShorts !== shorts) {
        setShorts(newShorts);
      }
      if (newLongs && newLongs !== longs) {
        setLongs(newLongs);
      }
    }
  };

  const handlePillClick = () => openPopup();

  return (
    <div className="authblock">
      <div className="authblock-top">
        <PillImg text="U">{user?.email ?? "email@gmail.com"}</PillImg>
        <PillImg text="S" switched onClick={handlePillClick}>
          {shorts}
        </PillImg>
        <PillImg text="L" switched onClick={handlePillClick}>
          {longs}
        </PillImg>
        <ButtonImg
          className="header__plus"
          imgPath={plusIcon}
          onClick={handlePillClick}
        />
      </div>
      <div className="authblock-center">
        <Link className="authblock-top__link" to="/plans">
          {t("HEADER_CREDIT_PLANS_TEXT")}
        </Link>
        <div className="authblock-center__locale">
          <p className="authblock-center__locale-text">
            {t("SIDEBAR_LANG_TEXT")}
          </p>
          <LangDrop className="authblock-top__langrop" />
        </div>
      </div>
    </div>
  );
};

export default AuthBlock;
