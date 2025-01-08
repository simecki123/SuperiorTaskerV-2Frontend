import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./routing";

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Redirect to the login page if the user is on root or locale paths
  if (pathname === "/" || pathname === "/en" || pathname === "/hr") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Handle locale and all other routes using intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/",
    "/login",
    "/register",
    "/profile",
    "/tasks",
    "/projects", 
    "/group",
    "/group-info",
    "/project-tasks",
    "/(hr|en)/:path*"
  ]
};