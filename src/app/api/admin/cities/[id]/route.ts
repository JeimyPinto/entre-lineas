import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/shared/api/supabaseAdmin';
import { auth } from '@/auth';

/**
 * PUT /api/admin/cities/[id]
 * Actualiza una ciudad
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { department_id, name } = body;

    const supabase = createAdminClient();

    const updateData: any = {};
    if (department_id !== undefined) updateData.department_id = department_id;
    if (name !== undefined) updateData.name = name;

    const { data, error } = await supabase
      .from('cities')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating city:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in PUT /api/admin/cities/[id]:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/cities/[id]
 * Elimina una ciudad
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
      .from('cities')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting city:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error('Error in DELETE /api/admin/cities/[id]:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}