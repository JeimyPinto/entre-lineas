import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth-utils';

/**
 * POST /api/admin/password/confirm
 * Valida token y actualiza contraseña
 */
export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token y contraseña requeridos' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Buscar token válido
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 400 }
      );
    }

    // Verificar que no haya expirado
    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id },
      });
      return NextResponse.json(
        { error: 'El link de recuperación ha expirado' },
        { status: 400 }
      );
    }

    // Verificar que sea de reset de contraseña
    if (verificationToken.type !== 'password_reset') {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 400 }
      );
    }

    if (!verificationToken.user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 400 }
      );
    }

    // Hash de la nueva contraseña
    const hashedPassword = await hashPassword(password);

    // Actualizar contraseña
    await prisma.user.update({
      where: { id: verificationToken.user.id },
      data: { password: hashedPassword },
    });

    // Eliminar token usado
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    // Eliminar todas las sesiones del usuario para obligar re-login
    await prisma.session.deleteMany({
      where: { userId: verificationToken.user.id },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Contraseña actualizada exitosamente',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[password/confirm] Error:', error);
    return NextResponse.json(
      { error: 'Error al actualizar contraseña' },
      { status: 500 }
    );
  }
}
