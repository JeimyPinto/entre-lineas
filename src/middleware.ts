import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecrypt } from "jose";
import { hkdf } from "@panva/hkdf";

const COOKIE_NAME = "next-auth.session-token";
const ENC = "A256CBC-HS512";
const ALG = "dir";

async function deriveKey(secret: string, salt: string): Promise<Uint8Array> {
  return await hkdf("sha256", secret, salt, `Auth.js Generated Encryption Key (${salt})`, 64);
}

async function decryptToken(token: string, secret: string): Promise<Record<string, unknown> | null> {
  try {
    const key = await deriveKey(secret, COOKIE_NAME);
    const { payload } = await jwtDecrypt(token, key, {
      keyManagementAlgorithms: [ALG],
      contentEncryptionAlgorithms: [ENC, "A256GCM"],
    });
    return payload as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isApiAdminRoute = pathname.startsWith("/api/admin");
  const isLoginPage = pathname === "/login";

  if (!isAdminRoute && !isApiAdminRoute && !isLoginPage) {
    return NextResponse.next();
  }

  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    return NextResponse.next();
  }

  const raw = request.cookies.get(COOKIE_NAME)?.value;
  const payload = raw ? await decryptToken(raw, secret) : null;

  const isLoggedIn = !!payload;
  const role = payload?.role as string | undefined;
  const orgRole = payload?.org_role as string[] | undefined;
  const isAdmin = role === "admin" || orgRole?.includes("admin");

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL(isAdmin ? "/admin" : "/", request.url));
  }

  if (isAdminRoute || isApiAdminRoute) {
    if (!isLoggedIn) {
      const callbackUrl = pathname + request.nextUrl.search;
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, request.url)
      );
    }

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/login",
  ],
};
