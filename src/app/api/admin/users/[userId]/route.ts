import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/shared/api/supabaseServer';
import { getCurrentUser } from '@/features/auth/services';

/**
 * PATCH /api/admin/users/[userId]
 * Actualiza un usuario (ban/unban)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    // Verificar autenticación
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { userId } = await params;
    const body = await request.json();

    const supabase = await createClient();

// Actualizar usuario (ban_duration debe ser string | undefined, no null)
    const banDuration = body.disabled ? 'forever' : undefined;
    
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      ban_duration: banDuration,
    });

    if (error) {
      console.error('Error updating user:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in PATCH /api/admin/users/[userId]:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/users/[userId]
 * Elimina un usuario
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    // Verificar autenticación
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { userId } = await params;

    const supabase = await createClient();

    // Eliminar usuario
    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      console.error('Error deleting user:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/admin/users/[userId]:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
