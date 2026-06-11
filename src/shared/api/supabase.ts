import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Validate environment variables during build time
if (typeof window === 'undefined') {
  // We're in a server environment (Node.js during build or server runtime)
  if (!supabaseUrl || !supabaseAnonKey) {
    // Throw a clear error during build time to prevent silent failures
    throw new Error('Supabase credentials missing. Make sure to set SUPABASE_URL and SUPABASE_ANON_KEY in your .env.local');
  }
}

// Lazy initialization to avoid build-time errors in browsers during SSR
let supabaseInstance: ReturnType<typeof createClient> | null = null;

function getSupabaseClient(): ReturnType<typeof createClient> {
  // If instance doesn't exist, create it
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        flowType: 'pkce',
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    });
  }
  return supabaseInstance;
}

// Export a real client that throws meaningful errors when not configured
export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(target, prop) {
    // Handle the case where we're accessing properties on the proxy itself
    if (prop === 'then' || prop === 'catch') {
      return undefined;
    }

    try {
      const client = getSupabaseClient();
      return (client as any)[prop];
    } catch (err) {
      // Re-throw with more context if it's a configuration error
      if (err instanceof Error && err.message.includes('Supabase credentials missing')) {
        throw err;
      }
      throw new Error('Failed to access Supabase client. Make sure to set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
    }
  },
});