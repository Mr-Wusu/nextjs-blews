import type { Metadata } from "next";
import "@/styles/globals.css";
import Footer from "./_components/Footer";
import Navbar from "./_components/NavBar";
import { ScrollProvider } from "@/contexts/scrollContext";

export const metadata: Metadata = {
  title: "Blews Stitches",
  description:
    "A website where you get clothes tailored inch-perfect from your desires!",
};

export default function RootLayout({
  children,
  admin,
  users,
}: Readonly<{
  children: React.ReactNode;
  admin: React.ReactNode;
  users: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <ScrollProvider>
          <Navbar admin={admin} users={users} />
          <div className="bg-lightRose1 text-darkRose2">{children}</div>
          <Footer />
        </ScrollProvider>
      </body>
    </html>
  );
}
