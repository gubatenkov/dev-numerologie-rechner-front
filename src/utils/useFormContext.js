import { useContext } from "react";

import { FormContext } from "../contexts/FormContext";

const useFormContext = () => {
  return useContext(FormContext);
};
export default useFormContext;
