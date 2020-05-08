import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";

export default ({ type, typeMessage, usedTypes, onBuy }) => {
  const { t } = useTranslation();
  const isTypeIncluded = usedTypes && usedTypes.includes(type);
  return (
    <Button
      variant={isTypeIncluded ? "success" : "secondary"}
      size="sm"
      onClick={() => onBuy(type)}
    >
      {isTypeIncluded ? (
        <i className="fa fa-icon fa-check-circle-o" />
      ) : (
        <i className="fa fa-icon fa-shopping-cart" />
      )}{" "}
      {typeMessage}{" "}
      {isTypeIncluded ? (
        <Fragment>
          {" "}
          | <strong>{t("DOWNLOAD")}</strong>
        </Fragment>
      ) : (
        <Fragment>
          {" "}
          | <strong>{t("BUY")}</strong>
        </Fragment>
      )}
    </Button>
  );
};
