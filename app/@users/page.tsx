"use client";
import { useContext } from "react";
import { IoSearchOutline } from "react-icons/io5";
import ScrollContext from "@/contexts/scrollContext";

function UsersDashboard() {
  const { scrolled } = useContext(ScrollContext);

  return (
    <div className="">
      <IoSearchOutline className={`hover:text-rose-200 text-2xl ${scrolled ? "text-darkRose2": "" }`} />
    </div>
  );
}

export default UsersDashboard;
