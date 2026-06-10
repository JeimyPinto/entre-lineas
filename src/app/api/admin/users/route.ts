import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { generateVerificationToken } from '@/lib/auth-utils';

/**
 * GET /api/admin/users
 * Lista todos los usuarios
 */
export async function GET() {
  try {
    // Verificar autenticación
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Obtener usuarios con paginación
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        createdAt: true,
        role: true,
        org_role: true,
        banned: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error in GET /api/admin/users:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

/**
 * POST /api/admin/users/invite
 * Invita a un nuevo usuario por correo electrónico
 */
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email requerido' }, { status: 400 });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    // Verificar que el usuario no exista
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'El usuario ya existe' },
        { status: 409 }
      );
    }

    // Generar token de invitación
    const token = generateVerificationToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días

    // Guardar token
    await prisma.verificationToken.create({
      data: {
        email,
        token,
        type: 'invite',
        expires: expiresAt,
      },
    });

    // TODO: Enviar email de invitación con Nodemailer
    const inviteLink = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/signup?invite=${token}&email=${encodeURIComponent(email)}`;
    console.log(`[User Invite] Invite link for ${email}: ${inviteLink}`);
    console.log(`[User Invite] Token: ${token} (expires at ${expiresAt.toISOString()})`);

    return NextResponse.json({
      success: true,
      message: 'Invitación enviada',
      ...(process.env.NODE_ENV === 'development' && { token, inviteLink }),
    });
  } catch (error) {
    console.error('Error in POST /api/admin/users:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

