import { createClient } from '@/lib/supabaseServer';
import { supabase as supabaseAnon } from '@/lib/supabase';

export const authService = {
  /**
   * Inicia sesión con correo y contraseña
   */
  async login(email: string, password: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    return data.user;
  },

  /**
   * Cierra la sesión actual
   */
  async logout() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  },

  /**
   * Obtiene el usuario actual de forma segura (desde el servidor)
   */
  async getCurrentUser() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) return null;
    return user;
  },

  /**
   * Verifica si hay una sesión activa
   */
  async isAuthenticated() {
    const user = await this.getCurrentUser();
    return !!user;
  }
};
