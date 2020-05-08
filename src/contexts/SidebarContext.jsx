import React, { useContext, createContext, useState } from "react";
const SidebarContext = createContext({});

export const SidebarProvider = props => {
  const value = useSidebarProvider();
  return (
    <SidebarContext.Provider value={value}>
      {props.children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  return useContext(SidebarContext);
};

const useSidebarProvider = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  return { isVisible, setIsVisible, showLanguages, setShowLanguages };
};
