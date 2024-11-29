// middleware.ts
import { verifyToken } from '@/actions/session.action'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicPaths = ['/', '/login', '/forgot-password', '/reset-password']

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const currentPath = request.nextUrl.pathname;

  try {
    // Check if the path is a dashboard path
    const isDashboardPath = currentPath.startsWith('/dashboard');

    // For public paths
    if (publicPaths.includes(currentPath)) {
      if (token) {
        const tokenVerification = await verifyToken(token);
        if (tokenVerification.success) {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      }
      return NextResponse.next();
    }

    // For dashboard paths
    if (isDashboardPath) {
      if (!token) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      const tokenVerification = await verifyToken(token);
      if (!tokenVerification.success) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}