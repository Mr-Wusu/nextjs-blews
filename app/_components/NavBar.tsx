"use client";
import { useContext, useEffect } from "react";

import { usePathname } from "next/navigation";

import Link from "next/link";

import ScrollContext from "@/contexts/scrollContext";
import { useHomePage } from "@/contexts/HomePageContext";

import SideNav from "./SideNav";
import User from "./User";

export default function Navbar() {
  const { isHomePage, setIsHomePage } = useHomePage();
  const { scrolled } = useContext(ScrollContext);
  const pathname = usePathname();

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
        className={`md:hidden justify-between items-center p-3 fixed w-full z-50 flex shadow-sm shadow-black/30 ${
          isHomePage && !scrolled
            ? "bg-transparent text-lightRose1"
            : "bg-lightRose1 text-rose-800 "
        }`}
      >
        <SideNav />
        <h2 className="h2-custom-font sm+:text-[1.2rem]">
          Blews&apos; Stitches
        </h2>
        <User
          userObj={{
            clip: { size: 25 },
            btnWidth: "5rem",
            imageContainer: { height: "2.25rem", width: "2.25rem" },
          }}
        />
      </nav>
      <nav
        className={`hidden md:flex justify-between items-center h-16 px-4 fixed w-full z-50 shadow-md ${
          isHomePage && !scrolled
            ? "bg-transparent text-lightRose1"
            : "bg-lightRose1 text-darkRose1"
        }`}
      >
        <div>
          <h2
            className={`h2-custom-font md:text-xl lg:text-2xl ${
              (isHomePage && scrolled) || !isHomePage ? "text-darkRose2" : ""
            }`}
          >
            Blews&apos; Stitches
          </h2>
        </div>
        <div>
          <ul
            className={`flex md:space-x-3 lg:space-x-5 md:text-lg lg:text-xl -ml-12 ${
              (isHomePage && scrolled) || !isHomePage ? "text-darkRose2" : ""
            }`}
          >
            <li>
              <Link
                className={`cursor-pointer border-b-2 border-b-transparent hover:border-b-lightRose1 px-2 transition-all duration-300 rounded-[.4rem] ${
                  (isHomePage && scrolled) || !isHomePage
                    ? "hover:!border-b-darkRose2"
                    : ""
                }`}
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`cursor-pointer border-b-2 border-b-transparent hover:border-b-lightRose1 px-2 transition-all duration-300 rounded-[.4rem] ${
                  (isHomePage && scrolled) || !isHomePage
                    ? "hover:!border-b-darkRose2"
                    : ""
                }`}
                href="/about-us"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                className={`cursor-pointer border-b-2 border-b-transparent hover:border-b-lightRose1 px-2 transition-all duration-300 rounded-[.4rem] ${
                  (isHomePage && scrolled) || !isHomePage
                    ? "hover:!border-b-darkRose2"
                    : ""
                }`}
                href="/contact-us"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                className={`cursor-pointer border-b-2 border-b-transparent hover:border-b-lightRose1 px-2 transition-all duration-300 rounded-[.4rem] ${
                  (isHomePage && scrolled) || !isHomePage
                    ? "hover:!border-b-darkRose2"
                    : ""
                }`}
                href="/measurements"
              >
                Measurements
              </Link>
            </li>
          </ul>
        </div>
        <User
          userObj={{
            clip: { size: 40 },
            btnWidth: "6.25rem",
            imageContainer: { height: "2.5rem", width: "2.5rem" },
          }}
        />
      </nav>
    </>
  );
}
