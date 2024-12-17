import type { Metadata } from "next";

import "@/styles/globals.scss";
import Footer from "./_components/Footer";
import MenuAndProfile from "./_components/MenuAndProfile";


export const metadata: Metadata = {
  title: "Blews Stitches",
  description: "A website where you get clothes tailored inch-perfect from your desires!",
};

export default function RootLayout({
  children, admin, users
}: Readonly<{
  children: React.ReactNode;
  admin: React.ReactNode;
  users: React.ReactNode;
}>) {
  const isSignedOut = false;
  const isAdmin = false;
  return (
    <html lang="en">
      <body className={``}>
        <nav className="justify-between items-center p-3  fixed w-full z-50 flex text-lightRose1">
          <MenuAndProfile />
          <h2 className="h2-custom-font text-xl ml-[-5rem]">Blews&apos; Stitches</h2>
          {isSignedOut ? <button>Sign In</button> : isAdmin ? admin : users}
        </nav>
        <div className="">{children}</div>

        <Footer />
      </body>
    </html>
  );
}
