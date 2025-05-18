import Link from "next/link";
import { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleSideNav() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative ">
      <HiOutlineMenu
        className="text-[1.6rem] sm+:text-[1.575rem] cursor-pointer"
        onClick={toggleSideNav}
      />
      {isOpen && (
        <div className="absolute w-[11rem] rounded-[.7rem] bg-lightRose1 h-fit flex flex-col pl-1 shadow-sm shadow-black top-[2.2rem] menu-open">
          <div
            className="hover:bg-rose-500 transition-all duration-200 ease-in absolute right-[-.8rem] top-[-.5rem] shadow-sm shadow-black/50 bg-rose-600 text-lightRose1 h-7 w-7 grid place-content-center rounded-full"
            onClick={toggleSideNav}
          >
            <IoClose className="cursor-pointer font-bold" />
          </div>
          <ul className="flex flex-col gap-[1rem] p-[1rem] text-[1rem] text-darkRose2">
            <li
              onClick={toggleSideNav}
              className="hover:scale-110 transition-all duration-200 ease-out"
            >
              <Link href="/">Home</Link>
            </li>
            <li
              onClick={toggleSideNav}
              className="hover:scale-110 transition-all duration-200 ease-out"
            >
              <Link href="/about-us">About Us</Link>
            </li>
            <li
              onClick={toggleSideNav}
              className="hover:scale-110 transition-all duration-200 ease-out"
            >
              <Link href="/contact-us">Contact Us</Link>
            </li>
            <li
              onClick={toggleSideNav}
              className="hover:scale-110 transition-all duration-200 ease-out"
            >
              <Link href="/measurements">Measurements</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
