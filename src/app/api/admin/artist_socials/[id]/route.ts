import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/shared/api/supabaseAdmin';
import { getCurrentUser } from '@/features/auth/services';

/**
 * PUT /api/admin/artist_socials/[id]
 * Actualiza una red social
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { artist_id, platform, url, label } = body;

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('artist_socials')
      .update({ artist_id, platform, url, label: label || '' })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating artist_social:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in PUT /api/admin/artist_socials/[id]:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/artist_socials/[id]
 * Elimina una red social
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id } = await params;

    const supabase = createAdminClient();

    const { error } = await supabase
      .from('artist_socials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting artist_social:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error('Error in DELETE /api/admin/artist_socials/[id]:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}