import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/shared/api/supabaseAdmin';
import { auth } from '@/auth';

/**
 * GET /api/admin/youtube_cache
 * Lista todas las entradas de cache de YouTube
 */
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('youtube_cache')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching youtube_cache:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error in GET /api/admin/youtube_cache:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}