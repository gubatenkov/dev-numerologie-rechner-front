import React, { useReducer } from "react";

import { formReducer } from "../reducers/formReducer";
import { personalStructure } from "../utils/formStructure";

export const FormContext = React.createContext();

const initState = personalStructure;

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initState);

  const setPersonalType = () => {
    dispatch({ type: "SET_PERSONAL_TYPE" });
  };

  const setCoupleType = () => {
    dispatch({ type: "SET_COUPLE_TYPE" });
  };

  const setChildType = () => {
    dispatch({ type: "SET_CHILD_TYPE" });
  };

  const pushPersonalAltnames = () => {
    dispatch({ type: "PUSH_PERSONAL_ALTNAMES" });
  };

  return (
    <FormContext.Provider
      value={{
        ...state,
        setPersonalType,
        setCoupleType,
        setChildType,
        pushPersonalAltnames
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
