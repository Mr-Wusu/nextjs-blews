"use client";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

const ConvexClerkProvider = ({ children }: { children: ReactNode }) => (
  <ClerkProvider
    publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
    appearance={{
      layout: {
        socialButtonsVariant: "iconButton",
        logoImageUrl: "/images/appPhotos/photo-8-transparent.png",
      },
      variables: {
        colorBackground: "#fff1f2",
        colorText: "#881337",
        colorPrimary: "#be123c",
        colorInputBackground: "#fda4af",
        colorInputText: "#4c0519",
      },
      elements: {
        rootBox: {
          height: "500px", // Set desired height
          maxHeight: "75vh", // Optional: limit max height
        },
        card: {
          height: "450px", // Alternative: target the card container
        },
      },
    }}
  >
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  </ClerkProvider>
);

export default ConvexClerkProvider;
