import React from "react";

import { CreditsSelector } from "./CreditsSelector";
import { TotalPrice } from "./TotalPrice";

const useStyles = () => {
  return {
    container: {
      marginRight: 10
    },
    text: {
      margin: 0,
      padding: 0
    }
  };
};

export const CreditsBuyModalBodyMobile = props => {
  const {
    personalShorts,
    setPersonalShorts,
    personalLongs,
    setPersonalLongs,
    PRICE_PERSONAL_SHORT,
    PRICE_PERSONAL_LONG,
    totalPrice
  } = props;

  const styles = useStyles();

  return (
    <div style={styles.container}>
      <CreditsSelector
        name="Persönlichkeitsnumeroskop kurz"
        value={personalShorts}
        setValue={setPersonalShorts}
        price={PRICE_PERSONAL_SHORT}
      />
      <CreditsSelector
        name="Persönlichkeitsnumeroskop lang"
        value={personalLongs}
        setValue={setPersonalLongs}
        price={PRICE_PERSONAL_LONG}
      />

      <TotalPrice totalPrice={totalPrice} />
    </div>
  );
};
