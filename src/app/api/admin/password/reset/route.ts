import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateVerificationToken } from '@/lib/auth-utils';

/**
 * POST /api/admin/password/reset
 * Genera token de reset y envía email
 */
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email requerido' },
        { status: 400 }
      );
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // No revelar si el email existe por seguridad
      return NextResponse.json(
        {
          success: true,
          message: 'Si el email existe, se enviará un enlace de recuperación',
        },
        { status: 200 }
      );
    }

    // Generar token
    const token = generateVerificationToken();
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hora

    // Guardar token en BD
    await prisma.verificationToken.create({
      data: {
        email,
        token,
        type: 'password_reset',
        expires: expiresAt,
        userId: user.id,
      },
    });

    // TODO: Aquí iría envio de email con Nodemailer
    // Por ahora solo loguear
    const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/reset-password?token=${token}`;
    console.log(`[Password Reset] Reset link for ${email}: ${resetLink}`);
    console.log(`[Password Reset] Token: ${token} (expires at ${expiresAt.toISOString()})`);

    return NextResponse.json(
      {
        success: true,
        message: 'Si el email existe, se enviará un enlace de recuperación',
        // Dev only - remover en producción
        ...(process.env.NODE_ENV === 'development' && { token, resetLink }),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[password/reset] Error:', error);
    return NextResponse.json(
      { error: 'Error al procesar solicitud' },
      { status: 500 }
    );
  }
}
