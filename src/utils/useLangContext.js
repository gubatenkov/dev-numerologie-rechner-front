import { useContext } from "react";

import { LangContext } from "../contexts/LangContext";

const useLangContext = () => {
  return useContext(LangContext);
};

export default useLangContext;
