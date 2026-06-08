import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/shared/api/supabaseAdmin';
import { auth } from '@/auth';

/**
 * DELETE /api/admin/youtube_cache/[id]
 * Elimina una entrada de cache
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id } = await params;

    const supabase = createAdminClient();

    const { error } = await supabase
      .from('youtube_cache')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting youtube_cache:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error('Error in DELETE /api/admin/youtube_cache/[id]:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}