import type { Metadata } from "next";
import "@/styles/globals.css";
import Footer from "./_components/Footer";
import Navbar from "./_components/NavBar";
import { ScrollProvider } from "@/contexts/scrollContext";
import { HomePageProvider } from "@/contexts/HomePageContext";
import ConvexClerkProvider from "@/contexts/ConvexClerkProvider";
import { ClothesProvider } from "@/contexts/ClothesContext";
import ReduxProvider from "@/contexts/ReduxProvider";

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
    <HomePageProvider>
      <html lang="en">
        <body>
          <ReduxProvider>
            <ConvexClerkProvider>
              <ScrollProvider>
                <ClothesProvider>
                  <Navbar />
                  <div className="bg-lightRose1 text-darkRose2">
                    {modal}
                    {children}
                  </div>
                  <Footer />
                  <div id="root-modal" />
                </ClothesProvider>
              </ScrollProvider>
            </ConvexClerkProvider>
          </ReduxProvider>
        </body>
      </html>
    </HomePageProvider>
  );
}
