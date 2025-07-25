import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined');
    // In this case, we can't verify the token, so we deny access.
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret);
    
    // Token is valid, allow the request to continue.
    return NextResponse.next();
  } catch (err) {
    // Token verification failed (e.g., it's invalid or expired).
    console.error('JWT Verification Error:', err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/profile',
}; 