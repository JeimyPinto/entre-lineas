import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth-utils';

/**
 * POST /api/auth/signup
 * Crear nuevo usuario con email y contraseña
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // Validar entrada
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña requeridos' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Verificar que el usuario no exista
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 409 }
      );
    }

    // Hash de la contraseña
    const hashedPassword = await hashPassword(password);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email,
        role: 'user',
        emailVerified: null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Usuario creado exitosamente',
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[signup] Error:', error);
    return NextResponse.json(
      { error: 'Error interno al crear usuario' },
      { status: 500 }
    );
  }
}
