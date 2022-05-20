import React from "react";

import "./index.scss";

const NumPill = ({ numbers = [] }) => {
  const setNumbers = () => {
    if (numbers.length) {
      return numbers.map((num, i) => {
        return (
          <span key={i} className="numpill__item numpill__item--bold">
            {num}
          </span>
        );
      });
    }
  };

  return <div className="numpill">{setNumbers()}</div>;
};

export default NumPill;
