import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./index.scss";

import Burger from "../Burger";
import PillImg from "../PillImg";
import LangDrop from "../LangDrop";
import Typography from "../Typography";
import EmailWidget from "../EmailWidget";
import ButtonImg from "../Buttons/ButtonImg";
import BaseBtn from "../Buttons/BaseBtn/BaseBtn";

import plusIcon from "../../images/plus.svg";
import logoMini from "../../images/logoMini.png";
import { useUser } from "../../contexts/UserContext";
import useLangContext from "../../utils/useLangContext";
import useFormContext from "../../utils/useFormContext";

const Header = ({
  className,
  plusBtn,
  user,
  isSidebarVisible = false,
  onOpen,
  onClose
}) => {
  const User = useUser();
  const { t } = useTranslation();
  const location = useLocation();
  const { lang } = useLangContext();
  const { analType } = useFormContext();
  const [longs, setLongs] = useState(0);
  const [shorts, setShorts] = useState(0);
  const isExactPage = location.pathname === "/plans" ? true : false;

  useEffect(() => {
    User.setLanguageWithId(lang);
  }, [User, lang]);

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

  const handlePillClick = () => plusBtn();

  const setAnalysisItemsElseText = () => {
    if (user) {
      return (
        <>
          <Typography
            className="header__info"
            as="p"
            fw="500"
            fs="14px"
            lh="20px"
            color="#fff"
            upperCase
          >
            {t(analType)}
          </Typography>
          <div className="header__credits header__credits--ml10">
            <PillImg text="S" switched onClick={handlePillClick}>
              {shorts}
            </PillImg>
            <PillImg text="L" switched onClick={handlePillClick}>
              {longs}
            </PillImg>
          </div>
          <ButtonImg
            className="header__plus"
            imgPath={plusIcon}
            onClick={plusBtn}
          />
        </>
      );
    } else {
      return (
        <Typography
          className="header__info"
          as="p"
          fw="500"
          fs="14px"
          lh="20px"
          color="#fff"
          upperCase
        >
          {t("HEADER_UNAUTH_TEXT")}
        </Typography>
      );
    }
  };

  const setAuthWidgetElseBtns = () => {
    if (user) {
      return <EmailWidget email={user.currentUser.email} />;
    } else {
      return (
        <div className="header-btns">
          <BaseBtn
            className={`base-btn outlined base-btn__login ${
              location.pathname === "/login" ? "hidden" : ""
            }`}
            href="/login"
            link
          >
            {t("HEADER_LOGIN_BTN_TEXT")}
          </BaseBtn>
          <BaseBtn
            className={`base-btn base-btn__signup ${
              location.pathname === "/register" ? "hidden" : ""
            }`}
            href="/register"
            link
          >
            {t("HEADER_SIGNUP_BTN_TEXT")}
          </BaseBtn>
        </div>
      );
    }
  };

  return (
    <header className={`header header-auth ${className}`}>
      <div className="header-inner">
        <div className="header-left">
          <Burger
            isActive={isSidebarVisible}
            onClick={isSidebarVisible ? onClose : onOpen}
          />
          <div className="header-brand">
            <Link to="/">
              <img className="header__img" src={logoMini} alt="logo" />
            </Link>
          </div>
          <div className="header-left__analysis">
            {setAnalysisItemsElseText()}
          </div>
        </div>

        <div className="header-brand__mobile">
          <Link to="/">
            <img className="header__img" src={logoMini} alt="logo" />
          </Link>
        </div>

        <div className="header-right">
          {user && !isExactPage && (
            <Typography
              className="header-right__plans"
              as={Link}
              to="/plans"
              fs="14px"
              lh="20px"
              fw="500"
              color="#fff"
            >
              {t("HEADER_CREDIT_PLANS_TEXT")}
            </Typography>
          )}
          <LangDrop />
          {setAuthWidgetElseBtns()}
        </div>
      </div>
    </header>
  );
};

export default Header;
