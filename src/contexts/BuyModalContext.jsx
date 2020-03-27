import React, { useContext, createContext, useState } from "react";
const BuyModalContext = createContext({});

export const BuyModalProvider = props => {
  const value = useBuyModalProvider();
  return (
    <BuyModalContext.Provider value={value}>
      {props.children}
    </BuyModalContext.Provider>
  );
};

export const useBuyModal = () => {
  return useContext(BuyModalContext);
};

const useBuyModalProvider = () => {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, setIsOpen };
};
