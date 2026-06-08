import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/shared/api/supabaseAdmin';
import { getCurrentUser } from '@/features/auth/services';

/**
 * GET /api/admin/artist_socials
 * Lista todas las redes sociales de artistas
 */
export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('artist_socials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching artist_socials:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error in GET /api/admin/artist_socials:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

/**
 * POST /api/admin/artist_socials
 * Crea una nueva red social
 */
export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { artist_id, platform, url, label } = body;

    if (!artist_id || !platform || !url) {
      return NextResponse.json({ error: 'artist_id, platform y url son requeridos' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('artist_socials')
      .insert([{ artist_id, platform, url, label: label || '' }])
      .select()
      .single();

    if (error) {
      console.error('Error creating artist_social:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in POST /api/admin/artist_socials:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}