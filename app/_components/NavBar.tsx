"use client";
import { ReactNode, useContext } from "react";
import ScrollContext from "@/contexts/scrollContext";

import MenuAndProfile from "./MenuAndProfile";

// Define prop types
interface NavbarProps {
  admin: ReactNode;
  users: ReactNode;
}

export default function Navbar({ admin, users }: NavbarProps) {
  const { scrolled } = useContext(ScrollContext);

  const isSignedOut = false;
  const isAdmin = false;

  return (
    <nav
      className={`justify-between items-center p-3  fixed w-full z-50 flex text-lightRose1 ${
        scrolled ? "shadow-md bg-lightRose1 " : ""
      }`}
    >
      <MenuAndProfile />
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
