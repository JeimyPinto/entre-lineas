import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/shared/api/supabaseAdmin';
import { auth } from '@/auth';

/**
 * DELETE /api/admin/countries/bulk
 * Elimina múltiples países
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'Se requiere un array de IDs' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { error } = await supabase
      .from('countries')
      .delete()
      .in('id', ids);

    if (error) {
      console.error('Error bulk deleting countries:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, deletedCount: ids.length });
  } catch (error) {
    console.error('Error in DELETE /api/admin/countries/bulk:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}