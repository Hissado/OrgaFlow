import { NextResponse, type NextRequest } from "next/server";

const publicRoutes = ["/login", "/forgot-password"];

export function middleware(request: NextRequest) {
  const hasSession = request.cookies.get("sb-access-token") || request.cookies.get("sb-auth-token");
  const isPublic = publicRoutes.some((r) => request.nextUrl.pathname.startsWith(r));

  if (!hasSession && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (hasSession && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
