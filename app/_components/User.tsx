"use client";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

import {
  SignedOut,
  SignInButton,
  useUser,
  useOrganizationList,
} from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import Image from "next/image";
import ProfileOpen from "./ProfileOpen";

interface UserProps {
  userObj: {
    // Ensure this matches the structure being passed
    clip: {
      size: number;
    };
    btnWidth: string;
    imageContainer: {
      height: string;
      width: string;
    };
  };
}

function User({ userObj }: UserProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { user } = useUser();
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { userMemberships } = useOrganizationList({
    userMemberships: { infinite: false },
  });
  // Check if the user is an admin in any organization
 

  useEffect(() => {
    if (isAuthenticated && user && userMemberships?.data?.length) {
      const adminMembership = userMemberships.data.find(
        (m) => m.role === "org:admin" // Adjust to "admin" if needed
      );
      setIsAdmin(!!adminMembership);
    } else {
      setIsAdmin(false);
    }
  }, [user, isAuthenticated, userMemberships]);
  return (
    <div>
      {!isLoading && !isAuthenticated ? (
        <SignedOut>
          <div
            className={`h-fit bg-gradient-to-r from-rose-700 to-rose-400 hover:bg-gradient-to-r hover:from-rose-600 hover:to-rose-300 active:scale-95 text-lightRose1 py-1 px-2 tracking-wide rounded self-center transition-bg duration-300 ease-in-out grid place-content-center ${
              userObj.btnWidth
            }`}
          >
            <SignInButton />
          </div>
        </SignedOut>
      ) : isLoading ? (
        <ClipLoader color="#e11d48" loading={true} size={userObj.clip.size} />
      ) : (
        <div
          className="h-fit relative"
          onClick={() => setIsProfileOpen((prev) => !prev)}
        >
          <div
            className={`relative h-[${userObj.imageContainer.height}] w-[${userObj.imageContainer.width}] rounded-full`}
          >
            <Image
              src={user?.imageUrl || "/default-avatar.png"}
              alt={`${user?.firstName || "User"}`}
              width={40}
              height={40}
              className="rounded-full object-cover cursor-pointer"
            />
          </div>
          {isProfileOpen && user && (
            <>
              <div
                className="w-screen h-screen opacity-30 bg-black fixed top-0 right-0 left-0 bottom-0 z-40"
                onClick={() => {
                  setIsProfileOpen(false);
                }}
              />
              <ProfileOpen
                setIsProfileOpen={setIsProfileOpen}
                user={user}
                isAdmin={isAdmin}
                btn=""
                nameFont=""
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default User;
