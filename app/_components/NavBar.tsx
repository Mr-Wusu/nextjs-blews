"use client";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import ScrollContext from "@/contexts/scrollContext";
import { CgSearch } from "react-icons/cg";

import MenuAndProfile from "./MenuAndProfile";
import { useHomePage } from "@/contexts/HomePageContext";
import Dashboard from "./Dashboard";
import UserProfile from "./UserProfile";

import Link from "next/link";
import { Button } from "./Button";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";

export default function Navbar() {
  const { data: session } = useSession();
  const { isHomePage, setIsHomePage } = useHomePage();
  const [isProfileOpen, setProfileOpen] = useState(false);
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
  }, [pathname, setIsHomePage]);

  useEffect(() => {
    if (session) {
      setIsSignedOut(false);
      setIsAdmin(
        session.user?.email === "wusu_prince@yahoo.com" ||
          session.user?.email === "test.paws1234@gmail.com"
      );
    } else {
      setIsSignedOut(true);
      setIsAdmin(false);
    }
    return () => {
      // Cleanup: Reset state when session changes or component unmounts
      setIsSignedOut(false);

      setIsAdmin(false);
    };
  }, [session]);

  function handleProfileOpen(e: React.MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();
    setProfileOpen(false);
  }

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
        <MenuAndProfile />
        <h2 className={`h2-custom-font text-xl ml-[-5rem]`}>
          Blews&apos; Stitches
        </h2>
        {isSignedOut ? (
          <button>
            <CgSearch className="text-2xl" />
          </button>
        ) : isAdmin ? (
          <Dashboard />
        ) : (
          <UserProfile />
        )}
      </nav>
      <nav
        className={`hidden md:flex justify-between items-center h-16 px-4 fixed w-full z-50  shadow-md ${
          isHomePage && !scrolled
            ? "bg-transparent text-lightRose1"
            : isHomePage && scrolled
              ? "bg-lightRose1 text-darkRose1"
              : !isHomePage && !scrolled
                ? "bg-lightRose1 text-darkRose1"
                : ""
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
          {isSignedOut ? (
            <div className="flex space-x-4 text-xl">
              <Link href="/api/auth/signin">
                <Button className="mt-0 text-[1.125rem]">Sign In</Button>
              </Link>
            </div>
          ) : (
            <div>
              {isAdmin ? (
                <div onClick={() => setProfileOpen(true)} className="relative">
                  <div className="h-9 w-9 relative rounded-full overflow-hidden cursor-pointer">
                    {session?.user?.image ? (
                      <Image
                        src={session?.user?.image}
                        alt="profile image"
                        layout="fill"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <Image
                        src="/images/avatar-2.jpg"
                        alt="profile image"
                        layout="fill"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                  </div>
                  <div
                    className={`absolute flex flex-col gap-2 bg-lightRose1 text-darkRose2 shadow-lg rounded-[.7rem] p-4 transition-all duration-300 top-[50px] -right-[15rem] opacity-0 ${isProfileOpen ? "opacity-100 top-[50px] right-[1rem]" : ""}`}
                  >
                    <button
                      className="absolute bg-rose-700 top-0 right-0 rounded-tr-[.7rem] rounded-bl-[0.7rem] text-lightRose1 z-50 cursor-pointer"
                      onClick={(e) => {
                        handleProfileOpen(e);
                      }}
                    >
                      <IoIosClose className="text-2xl" />
                    </button>
                    <div>
                      <p>{session?.user?.name}</p>
                      <p>{session?.user?.email}</p>
                    </div>
                    <div className="h-[1px] w-full bg-rose-800" />
                    <div className="flex flex-col gap-[.5rem] py-3">
                      <Link
                        className="w-max px-1 border-b border-transparent hover:border-rose-800 transition-all duration-300 cursor-pointer"
                        href="/dashboard/cloth-orders"
                      >
                        <button onClick={(e) => handleProfileOpen(e)}>
                          Cloth Orders
                        </button>
                      </Link>
                      <Link
                        className="border-b border-transparent w-max px-1 hover:border-rose-800 transition-all duration-300 cursor-pointer"
                        href="/dashboard/upload-cloth"
                      >
                        <button onClick={(e) => handleProfileOpen(e)}>
                          Upload Cloth
                        </button>
                      </Link>
                      <Link className="ml-auto" href="/auth/signout">
                        <Button
                          className="mt-2 "
                          onClick={(e) => handleProfileOpen(e)}
                        >
                          Sign Out
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
