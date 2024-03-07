import { rateLimiter } from './lib/rate-limiter';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const ip = req.ip ?? '127.0.0.1';

  try {
    const { success } = await rateLimiter.limit(ip);

    if (!success) return new NextResponse('You are writing messages too fast');

    return NextResponse.next();
  } catch (error) {
    return new NextResponse(
      'Sorry, something went wrong while processing your message. Please try again later'
    );
  }
}

export const config = {
  matcher: '/api/message/:path*',
};
