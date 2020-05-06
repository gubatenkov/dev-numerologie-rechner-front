import React from "react";
import { useTranslation } from "react-i18next";

const useStyles = () => {
  return {
    container: {
      display: "flex",
      flex: 1,
      alignItems: "space-between",
      justifyContent: "space-between",
      marginTop: 25,
      paddingTop: 25,
      borderStyle: "solid",
      borderWidth: "1px 0px 0px 0px",
      borderColor: "#F3F9FA"
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

export const TotalPrice = props => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { totalPrice } = props;

  return (
    <div style={styles.container}>
      <p style={styles.text}>{t("BUY_MODAL.TOTAL_INCL_UST")}</p>
      <p style={styles.text}>€ {totalPrice}</p>
    </div>
  );
};
