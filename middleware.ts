import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isSignedInRoute = createRouteMatcher([
  "/clothes/:item+", // Matches /clothes/agbada, /clothes/shirts/details, etc., but NOT /clothes/
]);

const isAdminRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isSignedInRoute(req)) await auth.protect();
  if (isAdminRoute(req)) await auth.protect({ role: "org:admin" });
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
