import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/shared/api/supabaseAdmin';
import { getCurrentUser } from '@/features/auth/services';

/**
 * GET /api/admin/countries
 * Lista todos los países
 */
export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('countries')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching countries:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error in GET /api/admin/countries:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

/**
 * POST /api/admin/countries
 * Crea un nuevo país
 */
export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { code, name, has_departments } = body;

    if (!code || !name) {
      return NextResponse.json({ error: 'code y name son requeridos' }, { status: 400 });
    }

    if (code.length !== 2) {
      return NextResponse.json({ error: 'El código debe tener 2 letras' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('countries')
      .insert([{ code: code.toUpperCase(), name, has_departments: has_departments || false }])
      .select()
      .single();

    if (error) {
      console.error('Error creating country:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in POST /api/admin/countries:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}