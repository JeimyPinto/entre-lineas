import { handlers, auth, signIn, signOut } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

// Safe initialization - check for required env vars
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Only create client if both env vars are present
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

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

        // Check if supabase client is initialized
        if (!supabase) {
          console.error("[auth] Supabase client not initialized - missing env vars");
          return null;
        }

        // Verificar usuario en Supabase
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single();

        if (error || !user) return null;

        // Verificar contraseña con Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError || !authData.user) return null;

        return {
          id: authData.user.id,
          email: authData.user.email!,
          name: user.name || authData.user.email!,
          role: user.role || "user",
          org_role: user.org_role || [],
          image: user.image || authData.user.user_metadata?.avatar_url,
        };
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
