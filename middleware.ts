import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const { pathname } = url;
  if (pathname.endsWith(`/portfolio`) || pathname.endsWith(`/insights`)) {
    const targetPath = `${pathname}/All`;
    return NextResponse.redirect(new URL(targetPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!api|_next|_vercel|.*\\..*).*)",

    // Custom redirect matcher
    "/portfolio/:path*",
    "/insight/:path*",
  ],
};
