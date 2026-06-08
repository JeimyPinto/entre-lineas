import { createClient } from '@supabase/supabase-js';

/**
 * Admin client with service role key for admin operations
 * Only use in server-side code (API routes, Server Actions)
 * NEVER expose this client to the browser
 */
export function createAdminClient() {
const url = process.env.SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!url || !serviceRoleKey) {
    throw new Error('Missing Supabase admin credentials');
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}