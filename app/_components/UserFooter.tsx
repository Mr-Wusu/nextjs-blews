"use client";
import { useOrganizationList, useUser } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import FooterForm from "./FooterForm";

interface UserMembership {
  role: string;
}

const UserFooter = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { isAuthenticated } = useConvexAuth();
  const { userMemberships } = useOrganizationList({
    userMemberships: { infinite: false },
  });
  const { user } = useUser();

  useEffect(() => {
    if (isAuthenticated && user && userMemberships?.data?.length) {
   

      const adminMembership = userMemberships.data.find(
        (m: UserMembership) => m.role === "org:admin" // Adjust to "admin" if needed
      );
      setIsAdmin(!!adminMembership);
    } else {
      setIsAdmin(false);
    }
  }, [user, isAuthenticated, userMemberships]);

  if(isAdmin) return null; 
  if (!isAdmin) return (
    <div className="flex flex-col gap-3" id="user-footer">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h2 className="text-[1rem] font-bold">What next?</h2>
          <p className="text-sm">
            Do you have something else in mind? Let&apos;s make it yours. Rest
            assured it will be inch-perfect! Show us your desired outfit here:
          </p>
        </div>
      </div>
      <FooterForm />
    </div>
  );
}

export default UserFooter;