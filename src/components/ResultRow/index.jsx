import React, { useState } from "react";

import "./index.scss";

import BuyBtn from "../Buttons/BuyBtn";

import iconPath from "../../images/cartIcon.svg";
import Matrix from "./components/Matrix";
import Number from "./components/Number";
import List from "./components/List";

const ResultRow = ({
  name,
  numberId,
  result,
  accessLevel = "ACCESS_LEVEL_GUEST",
  descriptionText: desc,
  ...restProps
}) => {
  const [isCollapsed, setCollapsed] = useState(true);
  const actions = {
    buy: {
      children: <img src={iconPath} alt="buy btn icon" />,
      handler: () => console.log("buy")
    },
    more: {
      children: "More",
      handler: () => console.log("more")
    }
  };

  const getRowClasses = () => {
    let classes = [
      "result-row",
      isCollapsed && "collapsed",
      result.type === "matrix" && "matrix"
    ];
    return classes.join(" ");
  };

  const removeHTML = str => {
    let tmp = document.createElement("div");
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || "";
  };

  const isDescriptionAvailable = () => (desc?.trim()?.length ? true : false);

  const text = !isDescriptionAvailable()
    ? `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed reiciendis ad odit in fuga rerum possimus, beatae explicabo. Assumenda, doloribus.`
    : removeHTML(desc);

  const number =
    result.value?.length > 0 ? result.value.replace(/\s/g, "") : "";

  return (
    <div className={getRowClasses()}>
      <h5 className="result-row__title">
        <span
          className="result-row__title-span"
          onClick={() => setCollapsed(!isCollapsed)}
        >
          {name}
        </span>
      </h5>
      <span className="result-row__toggle" />
      <div className="result-row__col">
        {result.type === "matrix" && (
          <Matrix
            text={text}
            result={result}
            name={name}
            numberId={numberId}
            blurred={!isDescriptionAvailable()}
          />
        )}
        {result.type === "number" && <Number value={number} />}
        {result.type === "list" && <List result={result} />}
      </div>
      <p
        className={`result-row__text ${
          isDescriptionAvailable() ? "" : "result-row__text--blur"
        }`}
      >
        {text}
      </p>
      <div className="result-row__action">
        <BuyBtn onClick={actions[desc.length === 0 ? "buy" : "more"].handler}>
          {actions[desc.length === 0 ? "buy" : "more"].children}
        </BuyBtn>
      </div>
    </div>
  );
};

export default ResultRow;
