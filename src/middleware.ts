import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // For Firebase Auth, we'll handle authentication on the client side
  // The middleware will just allow all requests through
  // Authentication will be checked in the components/pages themselves
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/profile',
}; 