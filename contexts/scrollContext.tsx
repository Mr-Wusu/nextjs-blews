"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
interface ScrollContextProps {
  scrolled: boolean;
}

const ScrollContext = createContext<ScrollContextProps>({
  scrolled: false,
});

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);


  const handleScroll = () => {
    setScrolled(window.scrollY > 400);
  };


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ scrolled }}>
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollContext;
