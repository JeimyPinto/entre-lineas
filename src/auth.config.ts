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

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
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