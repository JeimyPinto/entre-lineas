import NextAuth from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      org_role?: string[];
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
    org_role?: string[];
  }
}

// Get env vars - these should be set in .env.local
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create adapter only if env vars are available
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let adapter: any = undefined;
if (supabaseUrl && supabaseServiceKey) {
  adapter = SupabaseAdapter({
    url: supabaseUrl,
    secret: supabaseServiceKey,
  });
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  providers: [
    // Providers se configurarán en auth.ts para permitir override
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  pages: {
    signIn: "/login",
    error: "/login",
    newUser: "/onboarding",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.org_role = user.org_role;
      }
      if (trigger === "update" && session) {
        token.role = session.user.role;
        token.org_role = session.user.org_role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.org_role = token.org_role as string[] | undefined;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isApiAdminRoute = nextUrl.pathname.startsWith("/api/admin");

      if (isAdminRoute || isApiAdminRoute) {
        const isAdmin = auth?.user?.role === "admin" || 
          auth?.user?.org_role?.includes("admin");
        if (!isAdmin) {
          return false; // Redirigirá a /login
        }
      }
      return true;
    },
  },
  events: {
    async createUser({ user }) {
      console.log("Nuevo usuario creado:", user.email);
    },
    async linkAccount({ account }) {
      console.log("Cuenta vinculada:", account.provider);
    },
  },
  debug: process.env.NODE_ENV === "development",
});