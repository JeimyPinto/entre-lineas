import { handlers, auth, signIn, signOut } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth-utils";

// Simple validation using native JavaScript
function validateEmail(email: unknown): email is string {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: unknown): password is string {
  return typeof password === 'string' && password.length >= 6;
}

export { handlers, auth, signIn, signOut };

// Configuración de providers con credenciales
export const authConfig = {
  ...handlers,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials.email;
        const password = credentials.password;

        // Validate using native JS
        if (!validateEmail(email) || !validatePassword(password)) {
          return null;
        }

        try {
          // Buscar usuario en Prisma (base de datos local)
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            console.warn("[auth] User not found or no password set:", email);
            return null;
          }

          // Verificar contraseña con crypto nativo
          const isPasswordValid = await verifyPassword(password, user.password);

          if (!isPasswordValid) {
            console.warn("[auth] Invalid password for user:", email);
            return null;
          }

          // Verificar si el usuario está baneado
          if (user.banned) {
            console.warn("[auth] User is banned:", email);
            return null;
          }

          return {
            id: user.id,
            email: user.email!,
            name: user.name || user.email!,
            role: user.role,
            org_role: user.org_role,
            image: user.image,
          };
        } catch (error) {
          console.error("[auth] Error during authorization:", error);
          return null;
        }
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};
