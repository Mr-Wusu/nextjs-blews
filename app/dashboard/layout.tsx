import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Blews Stitches",
  description:
    "This is an individual page for your profile, settings and if you are an admin, super powers for the entire app",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-screen flex flex-col gap-2 items-center justify-center bg-lightRose1 text-darkRose2">
        {children}
      </div>
    </>
  );
}
