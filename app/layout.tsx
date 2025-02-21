import type { Metadata } from "next";
import "@/styles/globals.css";
import Footer from "./_components/Footer";
import Navbar from "./_components/NavBar";
import { ScrollProvider } from "@/contexts/scrollContext";
import { SessionProvider } from "next-auth/react";
import { HomePageProvider } from "@/contexts/HomePageContext";

export const metadata: Metadata = {
  title: "Home | Blews Stitches",
  description:
    "A website where you get clothes tailored inch-perfect from your desires!",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <HomePageProvider>
        <html lang="en">
          <body>
            <ScrollProvider>
              <Navbar />

              <div className="bg-lightRose1 text-darkRose2">
                {modal}
                {children}
              </div>
              <Footer />
              <div id="root-modal" />
            </ScrollProvider>
          </body>
        </html>
      </HomePageProvider>
    </SessionProvider>
  );
}
