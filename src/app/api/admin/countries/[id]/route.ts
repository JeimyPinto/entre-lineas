import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/shared/api/supabaseAdmin';
import { getCurrentUser } from '@/features/auth/services';

/**
 * PUT /api/admin/countries/[id]
 * Actualiza un país
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
    const { code, name, has_departments } = body;

    const supabase = createAdminClient();

    const updateData: any = {};
    if (code !== undefined) {
      if (code.length !== 2) {
        return NextResponse.json({ error: 'El código debe tener 2 letras' }, { status: 400 });
      }
      updateData.code = code.toUpperCase();
    }
    if (name !== undefined) updateData.name = name;
    if (has_departments !== undefined) updateData.has_departments = has_departments;

    const { data, error } = await supabase
      .from('countries')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating country:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in PUT /api/admin/countries/[id]:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/countries/[id]
 * Elimina un país
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
      .from('countries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting country:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error('Error in DELETE /api/admin/countries/[id]:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}