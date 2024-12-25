"use client";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import styles from "@/styles/components.module.scss";
import Link from "next/link";

interface MenuAndProfileProps {
  isScrolled: boolean;
}

export default function MenuAndProfile({ isScrolled }: MenuAndProfileProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  console.log(isScrolled);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`${styles.menu_and_profile} `}>
      <div className={`${styles.menu}`} onClick={toggleMenu}>
        <div
          className={`${
            styles.first_line
          } h-[1.6px] w-[24px] transition-all duration-300 ${
            isScrolled ? "bg-darkRose2" : "bg-lightRose2"
          }`}
        />
        <div
          className={`${styles.second_line} h-[1.6px] w-[24px]  ${
            isScrolled ? "bg-darkRose2" : "bg-lightRose2"
          }`}
        />
        <p
          className={`${styles.menu_p} ${
            isScrolled ? "text-darkRose2 font-semibold " : "text-lightRose1"
          }`}
        >
          MENU
        </p>
      </div>
      <button className={styles.profile}>
        <FaRegUser />
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
                onClick={toggleMenu}
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
