import { NextResponse } from 'next/server';
import { verifySession } from './lib/auth';

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Check if it's an admin route (UI or API)
  if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
    
    // Allow access to login page and login API
    if (path === '/admin/login' || path === '/api/admin/login') {
      return NextResponse.next();
    }

    // Check for admin key in headers (Direct API access with key)
    const authHeader = request.headers.get('x-admin-key');
    if (authHeader === 'noor') {
      return NextResponse.next();
    }

    // Check for session cookie
    const token = request.cookies.get('admin_session')?.value;
    const isValid = token ? await verifySession(token) : false;

    if (!isValid) {
      // If accessing API, return 401
      if (path.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      // Otherwise redirect to login
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
