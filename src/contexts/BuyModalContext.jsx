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
  const [cartItems, setCartItems] = useState({
    personalShorts: 0,
    personalLongs: 0
  });
  const setShorts = val =>
    setCartItems(prev => ({ ...prev, personalShorts: +val }));

  const setLongs = val =>
    setCartItems(prev => ({ ...prev, personalLongs: +val }));

  return { isOpen, setIsOpen, cartItems, setShorts, setLongs };
};
