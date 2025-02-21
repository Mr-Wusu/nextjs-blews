import Link from "next/link";
import { useState } from "react";
import { RiProfileLine } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";

export default function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative">
      <div className="rounded-xl overflow-hidden">
        <RiProfileLine
          className="text-[1.5rem]  cursor-pointer"
          onClick={handleClick}
        />
      </div>

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
        <Link href="/dashboard/my-orders" onClick={handleClick}>
          My Orders
        </Link>
        <Link href="/dashboard/received-clothes" onClick={handleClick}>
          Clothes received
        </Link>
      </div>
    </div>
  );
}
