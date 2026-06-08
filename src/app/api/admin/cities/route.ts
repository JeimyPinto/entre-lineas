import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/shared/api/supabaseAdmin';
import { auth } from '@/auth';

/**
 * GET /api/admin/cities
 * Lista todas las ciudades
 */
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('cities')
      .select(`
        *,
        departments!inner(
          name,
          countries!inner(name)
        )
      `)
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching cities:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error in GET /api/admin/cities:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

/**
 * POST /api/admin/cities
 * Crea una nueva ciudad
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { department_id, name } = body;

    if (!department_id || !name) {
      return NextResponse.json({ error: 'department_id y name son requeridos' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('cities')
      .insert([{ department_id, name }])
      .select()
      .single();

    if (error) {
      console.error('Error creating city:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in POST /api/admin/cities:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}