import { NextResponse } from 'next/server';

export function middleware(request) {
  const authCookie = request.cookies.get('agri_auth');
  const isAuthenticated = authCookie?.value === '1';

  // Protect /add-item route
  if (request.nextUrl.pathname.startsWith('/add-item')) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/add-item/:path*'],
};
