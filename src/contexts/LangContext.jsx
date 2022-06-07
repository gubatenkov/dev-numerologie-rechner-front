import React, { useReducer } from "react";

import { langReducer } from "../reducers/langReducer";

export const LangContext = React.createContext();

const initState = {
  lang: "en"
};

export const LangProvider = ({ children }) => {
  const [state, dispatch] = useReducer(langReducer, initState);

  const setLang = langId => {
    dispatch({ type: "SET_LANG", payload: langId });
  };

  return (
    <LangContext.Provider value={{ ...state, setLang }}>
      {children}
    </LangContext.Provider>
  );
};
