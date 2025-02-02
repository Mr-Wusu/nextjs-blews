"use client";
import { useState, useContext } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { LuMenu } from "react-icons/lu";
import { MdOutlineClose } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";

import styles from "@/styles/components.module.scss";
import ScrollContext from "@/contexts/scrollContext";
import { useHomePage } from "@/contexts/HomePageContext";

export default function MenuAndProfile() {
  const [openProfile, setOpenProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const { scrolled } = useContext(ScrollContext);
  const {isHomePage, setIsHomePage} = useHomePage()
  

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfile = () => {
    setOpenProfile(!openProfile);
  };

  return (
    <div className={`${styles.menu_and_profile} `}>
      <div className="" onClick={toggleMenu}>
        <LuMenu
          className={`text-2xl cursor-pointer ${
            isHomePage && !scrolled
              ? "text-lightRose1 hover:text-rose200 transition-all duration-200"
              : isHomePage && scrolled
              ? "text-rose-800 hover:text-rose-600 transition-all duration-200"
              : !isHomePage
              ? "hover:text-rose-600 transition-all duration-200"
              : ""
          }`}
        />
      </div>
      {session ? (
        <div className="relative " onClick={toggleProfile}>
          <div className="relative h-6 w-6 rounded-full overflow-hidden cursor-pointer">
            {session.user && typeof session.user?.image === "string" ? (
              <Image
                src={session.user?.image}
                alt="profile"
                className="object-cover"
                fill
              />
            ) : (
              <FaRegCircleUser
                className={`text-[1.4rem] ${
                  isHomePage && !scrolled
                    ? "text-lightRose1 hover:text-rose200 transition-all duration-200"
                    : isHomePage && scrolled
                    ? "text-rose-800 hover:text-rose-600 transition-all duration-200"
                    : !isHomePage
                    ? "hover:text-rose-600 transition-all duration-200"
                    : ""
                }`}
              />
            )}
          </div>
          <div
            className={`h-max w-max p-3 flex flex-col gap-1 bg-lightRose1 rounded-[.4rem] absolute translate-x-3 shadow-lg ${
              openProfile
                ? "translate-y-[8px] opacity-100 transition-all duration-150 ease-linear"
                : "-translate-y-[40%] opacity-0"
            }`}
          >
            <p className="text-darkRose2 text-sm">{session.user?.name}</p>
            <p className="text-sm text-darkRose2">{session.user?.email}</p>
            <Link
              href="/auth/signout"
              type="button"
              className="bg-gradient-to-r from-rose-700 to-rose-400 text-sm grid place-content-center py-1 rounded-[.4rem]  text-lightRose1 bottom-2 right-2"
            >
              Sign Out
            </Link>
          </div>
        </div>
      ) : (
        <div className="relative">
          <Link
            href="/api/auth/signin"
            className={`text-sm px-2 py-[3px] rounded-[.4rem] active:scale-[0.9] border-2 ${
              isHomePage && !scrolled
                ? "bg-rose-100 text-darkRose2 hover:bg-rose-300 transition-all duration-200"
                : isHomePage && scrolled
                ? "bg-gradient-to-r from-rose-700 to-rose-400 text-lightRose1 hover:bg-gradient-to-r hover:from-rose-500 hover:to-rose-300 transition-all duration-200"
                : !isHomePage
                ? "bg-gradient-to-r from-rose-700 to-rose-400 text-lightRose1 hover:bg-gradient-to-r hover:from-rose-500 hover:to-rose-300 transition-all duration-300 ease-in-out"
                : ""
            }`}
          >
            Sign In
          </Link>
        </div>
      )}

      <div
        className={`${styles.menu_content} ${
          menuOpen ? styles["slide-in"] : ""
        }`}
      >
        <div className={styles["gradient_container"]}>
          <button className={styles.close_button} onClick={toggleMenu}>
            <MdOutlineClose className="text-3xl" />
          </button>
          <ul className="flex flex-col text-lightRose2 text-2xl font-semibold h-max gap-8 tracking-wide">
            <li>
              <Link
                className="border-b-[3px] px-1 rounded-[.3rem] border-transparent hover:border-rose-950 hover:text-rose-950 hover:scale-110 duration-300 transition-all "
                onClick={(prev) => {
                  setMenuOpen(!prev);
                  setIsHomePage(true);
                }}
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="border-b-[3px] px-1 rounded-[.3rem] border-transparent hover:border-rose-950 hover:text-rose-950 hover:scale-110 duration-300 transition-all "
                onClick={toggleMenu}
                href="/about-us"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                className="border-b-[3px] px-1 rounded-[.3rem] border-transparent hover:border-rose-950 hover:text-rose-950 duration-300 transition-all "
                onClick={toggleMenu}
                href="/contact-us"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                className="border-b-[3px] px-1 rounded-[.3rem] border-transparent hover:border-rose-950 hover:text-rose-950 duration-300 transition-all "
                onClick={toggleMenu}
                href="/measurements"
              >
                Measurements
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
