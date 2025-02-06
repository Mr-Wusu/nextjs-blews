"use client";
import Link from "next/link";
import { useState } from "react";
import { RiDashboardLine, RiCloseFill } from "react-icons/ri";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
 
  function handleClick() {
   setIsOpen(!isOpen);
 }

  return (
    <div className="relative">
      <RiDashboardLine
        className="text-[1.4rem] cursor-pointer"
        onClick={handleClick}
      />

      <div
        className={`absolute top-8 right-0 bg-white text-darkRose1 p-4 text-sm min-w-max flex flex-col gap-2 rounded-[.6rem] shadow transition-all duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"
        }`}
      >
        <div
          className="absolute bg-rose-600 h-5 w-5 rounded-full right-[-11px] top-[-8px] text-lightRose1 grid place-content-center cursor-pointer "
          onClick={handleClick}
        >
          <RiCloseFill />
        </div>
        <Link href="/upload-cloth" onClick={handleClick}>
          Upload cloth
        </Link>
        <Link href="/cloth-orders" onClick={handleClick}>
          Cloth Orders
        </Link>
      </div>
    </div>
  );
}
