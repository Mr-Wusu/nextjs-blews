"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface HomePageContextProps {
  isHomePage: boolean;
  setIsHomePage: (value: boolean) => void;
}

const HomePageContext = createContext<HomePageContextProps | undefined>(
  undefined
);

export const HomePageProvider = ({ children }: { children: ReactNode }) => {
  const [isHomePage, setIsHomePage] = useState(true);

  return (
    <HomePageContext.Provider value={{ isHomePage, setIsHomePage }}>
      {children}
    </HomePageContext.Provider>
  );
};

export const useHomePage = () => {
  const context = useContext(HomePageContext);
  if (!context) {
    throw new Error("useHomePage must be used within a HomePageProvider");
  }
  return context;
};
