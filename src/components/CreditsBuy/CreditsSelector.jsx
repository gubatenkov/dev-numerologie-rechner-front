import React from "react";

import { NumericSelector } from "../NumericSelector";

const useStyles = () => {
  return {
    heading: {
      marginBottom: 10,
      marginTop: 20
    },
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    text: {
      color: "#323232",
      textFamily: "Roboto",
      fontSize: "20px",
      fontWeight: 500,
      letterSpacing: 0,
      padding: 0,
      margin: 0
    }
  };
};

export const CreditsSelector = props => {
  const { name, value, setValue, price } = props;
  const styles = useStyles();

  return (
    <div>
      <p style={{ ...styles.text, ...styles.heading }}>{name}</p>
      <div style={styles.container}>
        <NumericSelector value={value} setValue={setValue} />
        <p style={styles.text}>€ {price * value}</p>
      </div>
    </div>
  );
};
