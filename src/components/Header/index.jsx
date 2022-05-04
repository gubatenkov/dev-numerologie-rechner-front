import React from "react";
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

const Header = ({
  className,
  user,
  isSidebarVisible = false,
  onOpen,
  onClose
}) => {
  const location = useLocation();

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
            Personality analysis
          </Typography>
          <div className="header__credits header__credits--ml10">
            <PillImg text="S" switched>
              2
            </PillImg>
            <PillImg text="L" switched>
              1
            </PillImg>
          </div>
          <ButtonImg className="header__plus" imgPath={plusIcon} />
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
          Login to your profile to display your balance
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
            Log In
          </BaseBtn>
          <BaseBtn
            className={`base-btn base-btn__signup ${
              location.pathname === "/register" ? "hidden" : ""
            }`}
            href="/register"
            link
          >
            Sign Up
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
            <a
              href="https://www.psychologischenumerologie.eu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="header__img" src={logoMini} alt="logo" />
            </a>
          </div>
          <div className="header-left__analysis">
            {setAnalysisItemsElseText()}
          </div>
        </div>

        <div className="header-brand__mobile">
          <a
            href="https://www.psychologischenumerologie.eu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="header__img" src={logoMini} alt="logo" />
          </a>
        </div>

        <div className="header-right">
          {user && (
            <Typography
              className="header-right__plans"
              as={Link}
              to="/plans"
              fs="14px"
              lh="20px"
              fw="500"
              color="#fff"
            >
              CREDIT PLANS
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
