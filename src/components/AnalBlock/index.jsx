import React from "react";

import "./index.scss";

import PillImg from "../PillImg";
import Typography from "../Typography";
import { useHistory } from "react-router-dom";

const AnalBlock = ({ anals }) => {
  const history = useHistory();

  const handleClick = id => {
    history.push(`/resultPersonal/${id}`);
  };

  return (
    <div className="prevanals">
      <Typography as="p" fs="14px" fw="700" lh="21px" color="#fff" upperCase>
        Previous analysis:
      </Typography>
      <div className="prevanals__list">
        {anals?.length &&
          anals.map(({ name = "analysis", id, usedCreditTypes }, index) => {
            let text = "";
            if (usedCreditTypes.length) {
              const shortType = usedCreditTypes.find(
                type => type === "persoenlichkeit_kurz"
              );
              if (shortType) {
                text = "S";
              } else {
                text = "L";
              }
            }
            return (
              <PillImg
                key={index}
                text={text}
                onClick={() => handleClick(id)}
                blur
              >
                {name.split(",")[0]}
              </PillImg>
            );
          })}
      </div>
      <button className="prevanals-more base-btn outlined base-btn--mlauto">
        More
      </button>
    </div>
  );
};

export default AnalBlock;
