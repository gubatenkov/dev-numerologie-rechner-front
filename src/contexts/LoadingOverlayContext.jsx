import React, { useContext, createContext, useState } from "react";
import { useTranslation } from "react-i18next";

const LoadingOverlayContext = createContext({});

export const LoadingOverlayProvider = props => {
  const value = useLoadingOverlayProvider();
  return (
    <LoadingOverlayContext.Provider value={value}>
      {props.children}
    </LoadingOverlayContext.Provider>
  );
};

export const useLoadingOverlay = () => {
  return useContext(LoadingOverlayContext);
};

const useLoadingOverlayProvider = () => {
  const { t } = useTranslation();

  const [isShowing, setIsShowing] = useState(false);
  const [text, setText] = useState(t("LOADING"));

  const showWithText = text => {
    if (text) {
      setText(text);
    } else {
      setText(t("LOADING"));
    }
    setIsShowing(true);
  };

  const hide = () => {
    setIsShowing(false);
  };

  return {
    isShowing,
    hide,
    showWithText,
    text
  };
};
