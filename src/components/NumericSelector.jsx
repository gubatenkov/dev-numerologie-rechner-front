import React from "react";

import iconSelectorMinus from "../images/icon_selector_minus.png";
import iconSelectorPlus from "../images/icon_selector_plus.png";

const useStyles = () => {
  return {
    container: {
      height: "40px",
      width: "128px",
      borderRadius: "6px",
      backgroundColor: "#f3f9fa",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center"
    }
  };
};

export const NumericSelector = props => {
  const styles = useStyles();

  const { value, setValue } = props;

  const onDecrease = () => {
    if (value > 0) {
      setValue(Number(value) - 1);
    }
  };

  const onIncrease = () => {
    if (value >= 99) return;
    setValue(Number(value) + 1);
  };

  return (
    <div style={styles.container}>
      <div onClick={onDecrease}>
        <img
          src={iconSelectorMinus}
          width={17}
          height={17}
          alt="selector_minus"
        />
      </div>
      <input
        className="buyModalNumber"
        type="number"
        size={2}
        max={99}
        value={value}
        onChange={e => {
          if (e.target.value >= 0 && e.target.value <= 99) {
            setValue(e.target.value);
          }
        }}
      />
      <div onClick={onIncrease}>
        <img
          src={iconSelectorPlus}
          width={17}
          height={17}
          alt="selector_plus"
        />
      </div>
    </div>
  );
};
