import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/shared/api/supabaseAdmin';
import { auth } from '@/auth';

/**
 * GET /api/admin/users
 * Lista todos los usuarios de Supabase Auth
 */
export async function GET() {
  try {
    // Verificar autenticación
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const supabase = createAdminClient();

    // Listar usuarios con paginación explícita
    const { data: { users }, error } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

    if (error) {
      console.error('Error listing users:', JSON.stringify(error, null, 2));
      return NextResponse.json({ 
        error: error.message, 
        code: error.code,
        status: error.status 
      }, { status: 500 });
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
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email requerido' }, { status: 400 });
    }

    const supabase = createAdminClient();

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
