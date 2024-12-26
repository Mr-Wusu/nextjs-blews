"use client";
import { ReactNode, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ScrollContext from "@/contexts/scrollContext";

import MenuAndProfile from "./MenuAndProfile";

// Define prop types
interface NavbarProps {
  admin: ReactNode;
  users: ReactNode;
}

export default function Navbar({ admin, users }: NavbarProps) {
  const [isHomePage, setIsHomePage] = useState(true);
  const [isSignedOut, setIsSignedOut] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { scrolled } = useContext(ScrollContext);
    const pathname = usePathname();
    console.log(pathname);    

  useEffect(() => {
    if(pathname !== "/") {
      setIsHomePage(false);
    }
  }, [pathname]);

  return (
    <nav
      className={`justify-between items-center p-3  fixed w-full z-50 flex  ${
        isHomePage && !scrolled
          ? "bg-transparent text-lightRose1"
          : !isHomePage && !scrolled
          ? "bg-lightRose1 text-darkRose2 shadow-md"
          : isHomePage && scrolled
          ? "bg-lightRose1 text-darkRose2 shadow-md"
          : "bg-lightRose1 text-darkRose2 shadow-md"
      }`}
    >
      <MenuAndProfile isHomePage={isHomePage} setIsHomePage={setIsHomePage} />
      <h2
        className={`h2-custom-font text-xl ml-[-5rem] ${
          scrolled ? "text-darkRose2" : ""
        }`}
      >
        Blews&apos; Stitches
      </h2>
      {isSignedOut ? <button>Sign In</button> : isAdmin ? admin : users}
    </nav>
  );
}
