import React from "react";

import "./index.scss";

const NumPill = ({ numbers = [] }) => {
  const generateSixRandomNums = () => {
    for (let i = 0; i < 6; i++) {
      const randomNumber = Math.floor(Math.random() * 10);
      numbers.push(randomNumber);
    }
  };

  generateSixRandomNums();

  const setNumbers = () => {
    if (numbers.length) {
      return numbers.map((num, i) => {
        return (
          <span
            key={i}
            className={
              num % 2 === 0
                ? "numpill__item numpill__item--bold"
                : "numpill__item"
            }
          >
            {num}
          </span>
        );
      });
    }
  };

  return <div className="numpill">{setNumbers()}</div>;
};

export default NumPill;
