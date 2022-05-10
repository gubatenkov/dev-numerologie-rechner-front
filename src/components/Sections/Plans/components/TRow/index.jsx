import React from "react";

import checkPath from "../../../../../images/check.svg";

const TRow = ({ id, text, bold, option1, option2, option3, option4 }) => {
  const thClass = bold
    ? "plans-table__body-col plans-table__body-col--bold"
    : "plans-table__body-col";

  return (
    <tr className="plans-table__body-row">
      <td className={thClass}>{text}</td>
      <td className="plans-table__body-col">
        {option1 && <img src={checkPath} alt="check icon" />}
      </td>
      <td className="plans-table__body-col">
        {option2 && <img src={checkPath} alt="check icon" />}
      </td>
      <td className="plans-table__body-col">
        {option3 && <img src={checkPath} alt="check icon" />}
      </td>
      <td className="plans-table__body-col">
        {option4 && <img src={checkPath} alt="check icon" />}
      </td>
    </tr>
  );
};

export default TRow;
