"use client";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CgSearch } from "react-icons/cg";
import ScrollContext from "@/contexts/scrollContext";

function Default() {
  const [isHomePage, setIsHomePage] = useState(true);
  const pathname = usePathname();
  const { scrolled } = useContext(ScrollContext);

  useEffect(() => {
    setIsHomePage(pathname === "/");
  }, [pathname]);

  return (
    <div className="">
      <CgSearch
        className={`cursor-pointer text-2xl ${
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
  );
}

export default Default;
