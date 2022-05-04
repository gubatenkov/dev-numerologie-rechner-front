import React from "react";

import "./index.scss";

import Sector from "../../Sector";
import Typography from "../../Typography";

const Promo = () => {
  return (
    <section className="promo">
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
              Get to know yourself with psychomerological analysis
            </Typography>
          </div>
          <div className="promo__right">
            <Typography as="p" color="#323232" lh="25px" fs="18px" fw="400">
              Activate all texts of the <strong>extended</strong> version of the
              numeroscope of your current calculation for online reading
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promo;
