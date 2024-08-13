import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Log all cookies
  console.log("Cookies:", request.cookies);

  // Forward all requests
  return NextResponse.next();
}

// Config to apply middleware to all routes
export const config = {
  matcher: "/:path*",
};
