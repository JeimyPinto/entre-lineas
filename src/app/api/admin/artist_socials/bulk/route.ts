import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/shared/api/supabaseAdmin';
import { getCurrentUser } from '@/features/auth/services';

/**
 * DELETE /api/admin/artist_socials/bulk
 * Elimina múltiples redes sociales
 */
export async function DELETE(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { ids } = await request.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'Array de IDs requerido' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { error } = await supabase
      .from('artist_socials')
      .delete()
      .in('id', ids);

    if (error) {
      console.error('Error bulk deleting artist_socials:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, deletedIds: ids });
  } catch (error) {
    console.error('Error in DELETE /api/admin/artist_socials/bulk:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}