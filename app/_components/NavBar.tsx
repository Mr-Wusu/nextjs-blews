// _components/Navbar.tsx
"use client";
import { useState, useEffect, ReactNode } from "react";
import MenuAndProfile from "./MenuAndProfile";

// Define prop types
interface NavbarProps {
  admin: ReactNode;
  users: ReactNode;
}

export default function Navbar({ admin, users }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 400); // Adjust the threshold as needed
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  const isSignedOut = false;
  const isAdmin = false;

  return (
    <nav
      className={`justify-between items-center p-3  fixed w-full z-50 flex text-lightRose1 ${
        isScrolled ? "shadow-md bg-lightRose1 " : ""
      }`}
    >
      <MenuAndProfile isScrolled={isScrolled} />
      <h2 className={`h2-custom-font text-xl ml-[-5rem] ${isScrolled ? "text-darkRose2": ""}`}>
        Blews&apos; Stitches
      </h2>
      {isSignedOut ? <button>Sign In</button> : isAdmin ? admin : users}
    </nav>
  );
}
