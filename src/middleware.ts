import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth?.user;
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isApiAdminRoute = req.nextUrl.pathname.startsWith("/api/admin");
  const isLoginPage = req.nextUrl.pathname === "/login";

  // Si está logueado y va a login, redirigir a admin
  if (isLoggedIn && isLoginPage) {
    const role = req.auth?.user?.role;
    const orgRole = req.auth?.user?.org_role;
    const isAdmin = role === "admin" || orgRole?.includes("admin");
    return NextResponse.redirect(new URL(isAdmin ? "/admin" : "/", req.url));
  }

  // Proteger rutas admin
  if (isAdminRoute || isApiAdminRoute) {
    if (!isLoggedIn) {
      const callbackUrl = req.nextUrl.pathname + req.nextUrl.search;
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, req.url)
      );
    }

    const role = req.auth?.user?.role;
    const orgRole = req.auth?.user?.org_role;
    const isAdmin = role === "admin" || orgRole?.includes("admin");

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/login",
  ],
};