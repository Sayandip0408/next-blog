import { NextResponse } from 'next/server';

export function middleware(request) {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/log-in', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', 'protected-route', '/feed'],
};
