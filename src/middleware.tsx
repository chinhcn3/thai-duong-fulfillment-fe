import { navigateCheck } from "@/security/router-guard";
import { isPath } from "@/security/router-guard/helpers";
import { NextRequest, NextResponse } from "next/server";
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|fonts).*)",
  ],
};
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const path = isPath(pathname);

  const isApi = path.relativeWith("/api");

  if (isApi) return NextResponse.next();

  const res = NextResponse.next();

  const cookie = req.cookies;

  const redirect = navigateCheck({ pathname, cookie });
  if (pathname !== redirect && !path.isClientPath()) {
    const res = NextResponse.redirect(new URL(redirect, req.url), 307);
    console.warn(`>>> do redirect ${pathname} -> ${redirect}`);
    return res;
  }

  return res;
}
