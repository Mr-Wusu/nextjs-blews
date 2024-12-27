"use client";
import { useState, useContext, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { signIn, signOut,  getProviders, ClientSafeProvider } from "next-auth/react";
import { FaRegUser } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { MdOutlineClose } from "react-icons/md";
import styles from "@/styles/components.module.scss";
import Link from "next/link";
import ScrollContext from "@/contexts/scrollContext";
import Image from "next/image";

interface MenuAndProfileProps {
  isHomePage: boolean;
  setIsHomePage: Dispatch<SetStateAction<boolean>>;
}

export default function MenuAndProfile({
  isHomePage,
  setIsHomePage,
}: MenuAndProfileProps) {
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrolled } = useContext(ScrollContext);

  const isUserLoggedIn = false;

  useEffect(() => {
      const fetchProviders = async () => {
        const response = await getProviders();
        setProviders(response);
      };
      fetchProviders();
    }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const signOut = () => {
    // signOut();
    setOpenProfile(!openProfile);
  };

  const signIn = (providerId: string) => {
    // signIn(providerId);
    console.log(providerId);
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
              ? "hover:text-rose200 transition-all duration-200"
              : isHomePage && scrolled
              ? "hover:text-rose-600 transition-all duration-200"
              : !isHomePage
              ? "hover:text-rose-600 transition-all duration-200"
              : ""
          }`}
        />
      </div>
      {isUserLoggedIn ? (
        <div className="relative " onClick={toggleProfile}>
          <div className="relative h-6 w-6 rounded-full overflow-hidden cursor-pointer">
            <Image
              src="/images/testifiers/prince1.jpg"
              alt="profile"
              className="object-cover"
              fill
            />
          </div>
          <div
            className={`h-20 w-44 bg-lightRose1 rounded-[.4rem] absolute translate-x-3 shadow-lg ${
              openProfile
                ? "translate-y-[8px] opacity-100 transition-all duration-150 ease-linear"
                : "-translate-y-[40%] opacity-0"
            }`}
          >
            <button
              type="button"
              className="bg-black text-sm px-2 py-1 rounded-[.4rem] translate-x-24 text-lightRose1 translate-y-10"
              onClick={signOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
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
        >
          {providers &&
            Object.values(providers).map((provider: ClientSafeProvider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className=""
                >
                  Sign In
                </button>
              )
            )}
        </FaRegUser>
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
