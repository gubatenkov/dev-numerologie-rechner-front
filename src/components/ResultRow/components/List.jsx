import React from "react";

const List = ({ result }) => {
  const mapList = result => {
    if (result.list.length) {
      return result.list.map(item => ` ${item}`);
    } else {
      return "0";
    }
  };

  return <div className="result-row__list">{mapList(result)}</div>;
};

export default List;
