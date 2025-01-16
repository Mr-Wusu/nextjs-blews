"use client";
import { ReactNode, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import ScrollContext from "@/contexts/scrollContext";
import { CgSearch } from "react-icons/cg";

import MenuAndProfile from "./MenuAndProfile";
import { useHomePage } from "@/contexts/HomePageContext";

// Define prop types
interface NavbarProps {
  admin: ReactNode;
  users: ReactNode;
}

export default function Navbar({ admin, users }: NavbarProps) {
  const { data: session } = useSession();
const { isHomePage, setIsHomePage } = useHomePage();

  const [isSignedOut, setIsSignedOut] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { scrolled } = useContext(ScrollContext);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      setIsHomePage(false);
    } else {
      setIsHomePage(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (session) {
      setIsSignedOut(false);
      setIsAdmin(session.user?.email === "wusu_prince@yahoo.com");
    } else {
      setIsSignedOut(true);
    }
  }, [session]);

  return (
    <nav
      className={`justify-between items-center p-3  fixed w-full z-50 flex  ${
        isHomePage && !scrolled
          ? "bg-transparent text-lightRose1"
          : !isHomePage && !scrolled
          ? "bg-lightRose1 text-rose-800 shadow-md"
          : !isHomePage && scrolled
          ? "bg-lightRose1 text-rose-800 shadow-md z-50"
          : isHomePage && scrolled
          ? "bg-lightRose1 text-rose-800 shadow-md"
          : "text-rose-800 shadow-md "
      }`}
    >
      <MenuAndProfile />
      <h2 className={`h2-custom-font text-xl ml-[-5rem]`}>
        Blews&apos; Stitches
      </h2>
      {isSignedOut ? (
        <button>
          <CgSearch className="text-2xl" />
        </button>
      ) : isAdmin ? (
        admin
      ) : (
        users
      )}
    </nav>
  );
}
