import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// src/proxy.ts
export async function proxy(request: NextRequest) {
  // For Firebase Auth, we'll handle authentication on the client side
  // The middleware will just allow all requests through
  // Authentication will be checked in the components/pages themselves
  return NextResponse.next();
}


export const config = {
  matcher: '/profile',
};