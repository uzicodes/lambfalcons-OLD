import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // TODO: Replace with Firebase Auth verification
  // For now, allow all requests to pass through
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/profile',
}; 