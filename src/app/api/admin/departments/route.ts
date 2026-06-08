import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/shared/api/supabaseAdmin';
import { auth } from '@/auth';

/**
 * GET /api/admin/departments
 * Lista todos los departamentos
 */
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('departments')
      .select(`
        *,
        countries!inner(name)
      `)
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching departments:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error in GET /api/admin/departments:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

/**
 * POST /api/admin/departments
 * Crea un nuevo departamento
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { country_id, code, name } = body;

    if (!country_id || !code || !name) {
      return NextResponse.json({ error: 'country_id, code y name son requeridos' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('departments')
      .insert([{ country_id, code: code.toUpperCase(), name }])
      .select()
      .single();

    if (error) {
      console.error('Error creating department:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in POST /api/admin/departments:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}