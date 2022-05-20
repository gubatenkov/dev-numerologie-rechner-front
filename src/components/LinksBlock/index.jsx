import React from "react";
import { useTranslation } from "react-i18next";

import PillImg from "../PillImg";
import Typography from "../Typography";

const LinksBlock = () => {
  const { t } = useTranslation();
  const text = t("PLANS_LEANMORE_TEXT");

  return (
    <div className="prevanals">
      <Typography as="p" fs="14px" fw="700" lh="21px" color="#fff" upperCase>
        {text}
      </Typography>
      <div className="prevanals__list">
        <PillImg onClick={() => console.log("click")} blur>
          Personality Analysis
        </PillImg>
        <PillImg onClick={() => console.log("click")} blur>
          Couple Analysis
        </PillImg>
        <PillImg onClick={() => console.log("click")} blur>
          Child Analysis
        </PillImg>
      </div>
      <button className="prevanals-more base-btn outlined base-btn--mlauto">
        More
      </button>
    </div>
  );
};

export default LinksBlock;
