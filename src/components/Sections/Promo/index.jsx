import React from "react";

import "./index.scss";

import Sector from "../../Sector";
import Typography from "../../Typography";
import { useTranslation } from "react-i18next";

const Promo = ({ className, ...restProps }) => {
  const { t } = useTranslation();

  return (
    <section className={`promo ${className}`}>
      <div className="container">
        <div className="promo-inner">
          <Sector left="-1" top="-1" />
          <Sector right="-1" top="-1" rotation="90" />
          <Sector left="-1" bottom="-1" rotation="-90" />
          <Sector right="-1" bottom="-1" rotation="180" />
          <div className="promo__left">
            <Typography
              as="h2"
              color="#313236"
              lh="69px"
              fs="46px"
              fw="900"
              capitalize
            >
              {t("PROMO_BIG_TEXT")}
            </Typography>
          </div>
          <div className="promo__right">
            <Typography as="p" color="#323232" lh="25px" fs="18px" fw="400">
              {t("PROMO_SMALL_TEXT")}
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promo;
