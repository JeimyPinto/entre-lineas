import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/shared/api/supabaseAdmin';
import { auth } from '@/auth';

/**
 * DELETE /api/admin/youtube_cache/bulk
 * Elimina múltiples entradas de cache
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { ids } = await request.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'Array de IDs requerido' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { error } = await supabase
      .from('youtube_cache')
      .delete()
      .in('id', ids);

    if (error) {
      console.error('Error bulk deleting youtube_cache:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, deletedIds: ids });
  } catch (error) {
    console.error('Error in DELETE /api/admin/youtube_cache/bulk:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}