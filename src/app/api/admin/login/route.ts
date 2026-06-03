import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/features/auth/services';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 });
    }

    const user = await login(email, password);
    
    return NextResponse.json({ 
      success: true, 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    });
} catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Credenciales incorrectas';
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
