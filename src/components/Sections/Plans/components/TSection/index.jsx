import React, { useState } from "react";

import TRow from "../TRow";

const TSection = ({ heading, rows }) => {
  const [isActive, setActive] = useState(false);
  const tableClass = isActive
    ? "plans-table plans-table--active"
    : "plans-table";

  const renderRows = rows => {
    return rows.map((row, index) => {
      return <TRow key={index} {...row} />;
    });
  };

  const handleClick = () => setActive(!isActive);

  return (
    <table className={tableClass}>
      <thead className="plans-table__body-heading">
        <tr>
          <th>
            <span onClick={handleClick}>{heading}</span>
          </th>
        </tr>
      </thead>
      <tbody>{renderRows(rows)}</tbody>
    </table>
  );
};

export default TSection;
