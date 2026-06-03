import { NextResponse, type NextRequest } from 'next/server';

/**
 * Next.js 16 Proxy Middleware
 * 
 * Usa sistema de auth propio basado en cookies:
 * - admin_session: cookie HttpOnly establecida tras login exitoso
 * - Se elimina en logout
 */

const ADMIN_SESSION_COOKIE = 'admin_session';

export default async function proxy(request: NextRequest) {
  // Verificamos que el middleware se esté ejecutando
  console.log('[Proxy Middleware] Verificando acceso para:', request.nextUrl.pathname);

  const response = NextResponse.next({
    request,
  });

  // Leer cookie de sesión
  const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE);
  const isAuthenticated = !!sessionCookie?.value;

  // 1. Si está logueado y va al LOGIN -> Mandar al DASHBOARD
  if (isAuthenticated && request.nextUrl.pathname.startsWith('/admin/login')) {
    console.log('✅ Usuario autenticado, redirigiendo a dashboard');
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // 2. Si NO está logueado y va a cualquier ruta /admin (que no sea login) -> Mandar al LOGIN
  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    console.log('🚫 Acceso denegado, redirigiendo a login');
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return response;
}

// Configuración del matcher para el middleware
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
