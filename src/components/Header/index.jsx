import React from "react";

import "./index.scss";

import Burger from "../Burger";
import LangDrop from "../LangDrop";
import Typography from "../Typography";
import logoMini from "../../images/logoMini.png";
import BaseBtn from "../Buttons/BaseBtn/BaseBtn";

const Header = ({ isSidebarVisible = false, onOpen, onClose }) => {
  return (
    <header className="header">
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
          <LangDrop />
          <BaseBtn
            className="base-btn outlined base-btn__login"
            href="/login"
            link
          >
            Log In
          </BaseBtn>
          <BaseBtn className="base-btn base-btn__signup" href="/register" link>
            Sign Up
          </BaseBtn>
        </div>
      </div>
    </header>
  );
};

export default Header;
