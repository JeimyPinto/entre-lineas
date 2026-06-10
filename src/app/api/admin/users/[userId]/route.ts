import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

/**
 * PATCH /api/admin/users/[userId]
 * Actualiza un usuario (ban/unban)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    // Verificar autenticación
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { userId } = await params;
    const body = await request.json();

    // Actualizar usuario (ban)
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        banned: body.disabled === true,
      },
      select: {
        id: true,
        email: true,
        banned: true,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error in PATCH /api/admin/users/[userId]:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/users/[userId]
 * Elimina un usuario
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    // Verificar autenticación
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { userId } = await params;

    // Eliminar token de verificación asociados
    await prisma.verificationToken.deleteMany({
      where: { userId },
    });

    // Eliminar sesiones del usuario
    await prisma.session.deleteMany({
      where: { userId },
    });

    // Eliminar cuentas (OAuth)
    await prisma.account.deleteMany({
      where: { userId },
    });

    // Eliminar usuario
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
      select: {
        id: true,
        email: true,
      },
    });

    return NextResponse.json({ success: true, user: deletedUser });
  } catch (error) {
    console.error('Error in DELETE /api/admin/users/[userId]:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
