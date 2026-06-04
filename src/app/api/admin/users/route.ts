import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/shared/api/supabaseServer';
import { getCurrentUser } from '@/features/auth/services';

/**
 * GET /api/admin/users
 * Lista todos los usuarios de Supabase Auth
 */
export async function GET() {
  try {
    // Verificar autenticación
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const supabase = await createClient();

    // Listar usuarios (solo primeros 1000, paginación simple)
    const { data: { users }, error } = await supabase.auth.admin.listUsers();

    if (error) {
      console.error('Error listing users:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

// Filtrar y formatear usuarios
    const formattedUsers = users?.map(user => ({
      id: user.id,
      email: user.email,
      email_confirmed_at: user.email_confirmed_at,
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at,
      app_metadata: user.app_metadata,
      user_metadata: user.user_metadata,
    })) || [];

    return NextResponse.json({ users: formattedUsers });
  } catch (error) {
    console.error('Error in GET /api/admin/users:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

/**
 * POST /api/admin/users/invite
 * Invita a un nuevo usuario por correo electrónico
 */
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email requerido' }, { status: 400 });
    }

    const supabase = await createClient();

    // Enviar invitación por email
    const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/reset-password`,
    });

    if (error) {
      console.error('Error inviting user:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Invitación enviada' });
  } catch (error) {
    console.error('Error in POST /api/admin/users:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
