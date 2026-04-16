import { User as SupabaseUser } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  role: string;
  name: string;
}

export class User {
  static fromSupabase(user: SupabaseUser | null): UserProfile | null {
    if (!user) return null;
    
    return {
      id: user.id,
      email: user.email || '',
      // Supabase por defecto guarda metadata en user_metadata
      role: user.user_metadata?.role || 'admin',
      name: user.user_metadata?.name || 'Administrador',
    };
  }
}
