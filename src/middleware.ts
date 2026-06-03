import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Rutas que requieren autenticación
const protectedRoutes = ['/admin'];
// Rutas públicas dentro de admin
const publicAdminRoutes = ['/admin/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Si es una ruta de admin
  const isAdminRoute = pathname.startsWith('/admin');

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  // 2. Si es la página de login, permitir acceso
  if (publicAdminRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // 3. Verificar autenticación
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 4. Si no hay usuario, redirigir a login
  if (!user) {
    const url = new URL('/admin/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
