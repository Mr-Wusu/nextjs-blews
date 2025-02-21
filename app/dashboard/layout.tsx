import type { Metadata } from "next";
import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export const metadata: Metadata = {
  title: "Dashboard | Blews Stitches",
  description:
    "This is an individual page for your profile, settings and if you are an admin, super powers for the entire app",
};

export default async function DashboardLayout({
  children,
  users,
  admin,
}: Readonly<{
  children: React.ReactNode;
  users: React.ReactNode;
  admin: React.ReactNode;
}>) {
  const session = await auth();
  const isAdmin = session?.user?.email === "wusu_prince@yahoo.com";
  console.log(isAdmin);

  return (
    <>
      <div className="min-h-screen flex flex-col gap-2 items-center justify-center bg-lightRose1 text-darkRose2">
        {children}
        {isAdmin ? admin : users}
      </div>
    </>
  );
}
