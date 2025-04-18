"use client";
import { useContext, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { usePathname } from "next/navigation";
import {
  SignedOut,
  SignInButton,

  useOrganization,
  useUser,
  useClerk,
} from "@clerk/nextjs";

import { OrganizationMembershipResource } from "@clerk/types";
import Link from "next/link";
import Image from "next/image";
import ScrollContext from "@/contexts/scrollContext";
import { useHomePage } from "@/contexts/HomePageContext";
import ProfileOpen from "./ProfileOpen";
import { useConvexAuth } from "convex/react";
import SideNav from "./SideNav";

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isHomePage, setIsHomePage } = useHomePage();
  const { scrolled } = useContext(ScrollContext);
  const pathname = usePathname();
  const { setActive } = useClerk();
  const {  user } = useUser();
    const {isLoading, isAuthenticated} = useConvexAuth()
  const { membership, organization } = useOrganization();
  const isAdmin = membership?.role === "org:admin";


  

  useEffect(() => {
    if (pathname !== "/") {
      setIsHomePage(false);
    } else {
      setIsHomePage(true);
    }
  }, [pathname, setIsHomePage]);

  useEffect(() => {
    if (isAuthenticated && organization) {
      user?.getOrganizationMemberships().then((memberships) => {
        if (memberships.data.length > 0) {
          const adminMembership = memberships.data.find(
            (m: OrganizationMembershipResource) => m.role === "org:admin"
          );
          const orgToActivate = adminMembership || memberships.data[0];
          setActive({ organization: orgToActivate.organization.id });
        }
      });
    }
  }, [ user, organization, isAuthenticated, setActive]);

  // if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <nav
        className={`md:hidden justify-between items-center p-3 fixed w-full z-50 flex shadow-sm shadow-black/30 ${
          isHomePage && !scrolled
            ? "bg-transparent text-lightRose1"
            : "bg-lightRose1 text-rose-800 "
        }`}
      >
        <SideNav />
        <h2 className="h2-custom-font sm+:text-[1.2rem]">
          Blews&apos; Stitches
        </h2>
        {!isLoading && !isAuthenticated ? (
          <SignedOut>
            <div className="h-fit bg-gradient-to-r from-rose-700 to-rose-400 hover:bg-gradient-to-r hover:from-rose-600 hover:to-rose-300 active:scale-95 w-[100px] text-lightRose1 py-1 tracking-wide rounded self-center transition-bg duration-300 ease-in-out grid place-content-center">
              <SignInButton>Sign In</SignInButton>
            </div>
          </SignedOut>
        ) : isLoading ? (
          <ClipLoader color="#e11d48" loading={true} size={25} />
        ) : (
          <div className="relative h-9 w-9 rounded-full bg-yellow-300 text-red-600">
            <Image
              src={user?.imageUrl || "/default-avatar.png"}
              alt={`${user?.firstName || "User"}'s profile picture`}
              width={40} // Adjusted to match h-10 w-10
              height={40}
              className="rounded-full object-cover cursor-pointer"
              onClick={() => setIsProfileOpen((prev) => !prev)}
            />
            {isProfileOpen && user && (
              <ProfileOpen
                setIsProfileOpen={setIsProfileOpen}
                user={user}
                isAdmin={isAdmin}
                btn="w-[5rem] text-[.895rem] "
                nameFont="text-[.875rem]"
              />
            )}
          </div>
        )}
      </nav>
      <nav
        className={`hidden md:flex justify-between items-center h-16 px-4 fixed w-full z-50 shadow-md ${
          isHomePage && !scrolled
            ? "bg-transparent text-lightRose1"
            : "bg-lightRose1 text-darkRose1"
        }`}
      >
        <div>
          <h2
            className={`h2-custom-font md:text-xl lg:text-2xl ${
              (isHomePage && scrolled) || !isHomePage ? "text-darkRose2" : ""
            }`}
          >
            Blews&apos; Stitches
          </h2>
        </div>
        <div>
          <ul
            className={`flex md:space-x-3 lg:space-x-5 md:text-lg lg:text-xl -ml-12 ${
              (isHomePage && scrolled) || !isHomePage ? "text-darkRose2" : ""
            }`}
          >
            <li>
              <Link
                className={`cursor-pointer border-b-2 border-b-transparent hover:border-b-lightRose1 px-2 transition-all duration-300 rounded-[.4rem] ${
                  (isHomePage && scrolled) || !isHomePage
                    ? "hover:!border-b-darkRose2"
                    : ""
                }`}
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`cursor-pointer border-b-2 border-b-transparent hover:border-b-lightRose1 px-2 transition-all duration-300 rounded-[.4rem] ${
                  (isHomePage && scrolled) || !isHomePage
                    ? "hover:!border-b-darkRose2"
                    : ""
                }`}
                href="/about-us"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                className={`cursor-pointer border-b-2 border-b-transparent hover:border-b-lightRose1 px-2 transition-all duration-300 rounded-[.4rem] ${
                  (isHomePage && scrolled) || !isHomePage
                    ? "hover:!border-b-darkRose2"
                    : ""
                }`}
                href="/contact-us"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                className={`cursor-pointer border-b-2 border-b-transparent hover:border-b-lightRose1 px-2 transition-all duration-300 rounded-[.4rem] ${
                  (isHomePage && scrolled) || !isHomePage
                    ? "hover:!border-b-darkRose2"
                    : ""
                }`}
                href="/measurements"
              >
                Measurements
              </Link>
            </li>
          </ul>
        </div>
        <div>
          {!isLoading && !isAuthenticated ? (
            <SignedOut>
              <div className="h-fit bg-gradient-to-r from-rose-700 to-rose-400 hover:bg-gradient-to-r hover:from-rose-600 hover:to-rose-300 active:scale-95 w-[100px] text-lightRose1 py-1 tracking-wide rounded self-center transition-bg duration-300 ease-in-out grid place-content-center">
                <SignInButton />
              </div>
            </SignedOut>
          ) : isLoading ? (
            <ClipLoader color="#e11d48" loading={true} size={40} />
          ) : (
            <div
              className="h-fit relative "
              onClick={() => setIsProfileOpen((prev) => !prev)}
            >
              <div className="relative h-10 w-10 rounded-full">
                <Image
                  src={user?.imageUrl || "/default-avatar.png"}
                  alt={`${user?.firstName || "User"}'s profile picture`}
                  width={40} // Adjusted to match h-10 w-10
                  height={40}
                  className="rounded-full object-cover cursor-pointer"
                />
              </div>
              {isProfileOpen && user && (
                <ProfileOpen
                  setIsProfileOpen={setIsProfileOpen}
                  user={user}
                  isAdmin={isAdmin}
                  btn=""
                  nameFont=""
                />
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
