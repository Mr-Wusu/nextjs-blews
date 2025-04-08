"use client";
import { useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  useOrganization,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";

import ScrollContext from "@/contexts/scrollContext";
import { useHomePage } from "@/contexts/HomePageContext";
import { Button } from "./Button";

export default function Navbar() {
  const { isHomePage, setIsHomePage } = useHomePage();
  const { scrolled } = useContext(ScrollContext);
  const pathname = usePathname();
  const { user } = useUser();
  // Get authentication state and user ID
  const { isSignedIn } = useAuth();
  // Get organization data (including role)
  const { membership } = useOrganization();
  const isAdmin = membership?.role === "org:admin";
  useEffect(() => {
    if (pathname !== "/") {
      setIsHomePage(false);
    } else {
      setIsHomePage(true);
    }
  }, [pathname, setIsHomePage]);

  return (
    <>
      <nav
        className={`md:hidden justify-between items-center p-3  fixed w-full z-50 flex  ${
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
        {/* <MenuAndProfile /> */}
        {/* Use another display for menu and profile on mobile display */}
        <h2 className={`h2-custom-font text-xl ml-[-5rem]`}>
          Blews&apos; Stitches
        </h2>
        <div className="">
          {/* Mobile UI for non-signedIn users, signedIn regular users and signedIn Admin users */}
        </div>
      </nav>
      <nav
        className={`hidden md:flex justify-between items-center h-16 px-4 fixed w-full z-50  shadow-md ${
          isHomePage && !scrolled
            ? "bg-transparent text-lightRose1"
            : isHomePage && scrolled
              ? "bg-lightRose1 text-darkRose1"
              : !isHomePage && !scrolled
                ? "bg-lightRose1 text-darkRose1"
                : "bg-lightRose1 text-darkRose1"
        }`}
      >
        <div>
          <h2
            className={`h2-custom-font md:text-xl lg:text-2xl ${isHomePage && scrolled ? "text-darkRose2" : !isHomePage ? "text-darkRose2" : ""}`}
          >
            Blews&apos; Stitches
          </h2>
        </div>
        <div>
          <ul
            className={`flex md:space-x-3 lg:space-x-5 md:text-lg lg:text-xl -ml-12 ${isHomePage && scrolled ? "text-darkRose2" : !isHomePage ? "text-darkRose2" : ""}`}
          >
            <li>
              <Link
                className={`cursor-pointer border-b-2 border-b-transparent hover:border-b-lightRose1 px-2 transition-all duration-300 rounded-[.4rem] ${isHomePage && scrolled ? "hover:!border-b-darkRose2" : !isHomePage ? "hover:!border-b-darkRose2" : ""}`}
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`cursor-pointer border-b-2 border-b-transparent hover:border-b-lightRose1 px-2 transition-all duration-300 rounded-[.4rem] ${isHomePage && scrolled ? "hover:!border-b-darkRose2" : !isHomePage ? "hover:!border-b-darkRose2" : ""}`}
                href="/about-us"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                className={`cursor-pointer border-b-2 border-b-transparent hover:border-b-lightRose1 px-2 transition-all duration-300 rounded-[.4rem] ${isHomePage && scrolled ? "hover:!border-b-darkRose2" : !isHomePage ? "hover:!border-b-darkRose2" : ""}`}
                href="/contact-us"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                className={`cursor-pointer border-b-2 border-b-transparent hover:border-b-lightRose1 px-2 transition-all duration-300 rounded-[.4rem] ${isHomePage && scrolled ? "hover:!border-b-darkRose2" : !isHomePage ? "hover:!border-b-darkRose2" : ""}`}
                href="/measurements"
              >
                Measurements
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <SignedOut>
            <Button className="h-fit">
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn></SignedIn>
        </div>
      </nav>
    </>
  );
}
