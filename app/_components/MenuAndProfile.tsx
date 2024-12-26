"use client";
import { useState, useContext } from "react";
import { Dispatch, SetStateAction } from "react";
import { FaRegUser } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { MdOutlineClose } from "react-icons/md";
import styles from "@/styles/components.module.scss";
import Link from "next/link";
import ScrollContext from "@/contexts/scrollContext";

interface MenuAndProfileProps {
  isHomePage: boolean;
   setIsHomePage: Dispatch<SetStateAction<boolean>>;
}

export default function MenuAndProfile({ isHomePage, setIsHomePage }: MenuAndProfileProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrolled } = useContext(ScrollContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`${styles.menu_and_profile} `}>
      <div className="" onClick={toggleMenu}>
        <LuMenu
          className={`text-2xl cursor-pointer ${
            isHomePage && !scrolled
              ? "hover:text-rose200 transition-all duration-200"
              : isHomePage && scrolled
              ? "hover:text-rose-600 transition-all duration-200"
              : !isHomePage
              ? "hover:text-rose-600 transition-all duration-200"
              : ""
          }`}
        />
      </div>
      <button>
        <FaRegUser
          className={`text-lg ${
            isHomePage && !scrolled
              ? "hover:text-rose200 transition-all duration-200"
              : isHomePage && scrolled
              ? "hover:text-rose-600 transition-all duration-200"
              : !isHomePage
              ? "hover:text-rose-600 transition-all duration-200"
              : ""
          }`}
        />
      </button>

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
