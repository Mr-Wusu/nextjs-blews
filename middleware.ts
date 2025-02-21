import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";
import * as urls from "@/lib/routes";

const { auth } = NextAuth(authConfig);

export default async function blewsMiddleware(
  req: NextRequest
): Promise<NextResponse> {
  const { nextUrl } = req;

  const session = await auth();
  const isAuthenticated = !!session?.user;

  const isStaticFile =
    nextUrl.pathname.startsWith("/_next/") ||
    nextUrl.pathname.startsWith("/images/") ||
    nextUrl.pathname.startsWith("/fonts/") ||
    nextUrl.pathname.startsWith("/icon.jpg");
  const isApiRoute = nextUrl.pathname.startsWith("/api/");
  const isCheckoutRoute = /^\/clothes\/[^/]+\/checkout$/.test(nextUrl.pathname);
  const isPublicRoute = urls.publicRoutes.some((url) => {
    const regex = new RegExp(`^${url.replace(/\[.*?\]/g, "[^/]+")}$`);
    return regex.test(nextUrl.pathname);
  });
 

  // Ensure /clothes/${cloth.id} routes are public
  const isClothDetailRoute = /^\/clothes\/[^/]+$/.test(nextUrl.pathname);

  if (
    !isAuthenticated &&
    (isCheckoutRoute ||
      (!isPublicRoute && !isStaticFile && !isApiRoute && !isClothDetailRoute))
  ) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}
