// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
 
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
 
  // Use your site URL from .env.local as a reliable base
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://samdenadeals.com";
 
  // If user is not logged in and trying to access dashboard, redirect to login
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", baseUrl));
  }
 
  return NextResponse.next();
}
 
// Apply middleware to all dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
 