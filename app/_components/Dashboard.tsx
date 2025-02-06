"use client";
import Link from "next/link";
import { useState } from "react";
import { RiDashboardLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button type="button" onClick={(prev) => setIsOpen(!prev)}>
        <RiDashboardLine className="text-[1.4rem]" />
      </button>

      <div
        className={`absolute top-8 right-0 bg-white text-darkRose1 p-4 text-sm min-w-max flex flex-col gap-2 rounded-[.6rem] shadow translate-x-[120%] opacity-0 transition-all duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0 opacity-100" : ""
        }`}
      >
        <div
          className="absolute bg-rose-600 h-5 w-5 rounded-full right-[-11px] top-[-8px] text-lightRose1 grid place-content-center cursor-pointer "
          onClick={(prev) => setIsOpen(!prev)}
        >
          <IoClose />
        </div>
        <Link href="/upload-cloth" onClick={(prev) => setIsOpen(!prev)}>
          Upload cloth
        </Link>
        <Link href="/admin/cloth-orders">Cloth Orders</Link>
      </div>
    </div>
  );
}
