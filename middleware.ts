import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


const isSignedInRoute = createRouteMatcher(["/clothes/:item+"]);
const isAdminRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  console.log("Request URL:", req.url);
  console.log("User ID:", userId);


  if (isAdminRoute(req)) {
    if (!userId) {
      console.log("No user ID, redirecting to sign-in");
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // Safely check if org_roles is an array and includes "Admin" or "org:admin"
    
    const hasAdminRole = sessionClaims?.org_role === "org:admin"? true: false;

        console.log("Has Admin Role:", hasAdminRole);

    if (!hasAdminRole) {
      console.log("User does not have admin role, redirecting to unauthorized");
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    console.log("Admin access granted for:", req.url);
  }

  if (isSignedInRoute(req)) {
    console.log("Protecting signed-in route:", req.url);
    if (!userId) {
      console.log("No user ID for signed-in route, redirecting to sign-in");
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
