// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const userAgent = request.headers.get('user-agent') || '';
    const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    const url = request.nextUrl.clone();

    // 정적 파일들은 리다이렉트하지 않음
    if (
        url.pathname.startsWith('/images/') ||
        url.pathname.startsWith('/icons/') ||
        url.pathname.startsWith('/assets/') ||
        url.pathname.endsWith('.png') ||
        url.pathname.endsWith('.jpg') ||
        url.pathname.endsWith('.jpeg') ||
        url.pathname.endsWith('.gif') ||
        url.pathname.endsWith('.svg') ||
        url.pathname.endsWith('.css') ||
        url.pathname.endsWith('.js')
    ) {
        return NextResponse.next();
    }

    // 모바일 디바이스인 경우 /m 경로로 리다이렉트
    if (isMobile && !url.pathname.startsWith('/m')) {
        url.pathname = `/m/${url.pathname}`;
        return NextResponse.redirect(url);
    }

    // 데스크톱에서 /m 경로 접근 시 일반 경로로 리다이렉트
    if (!isMobile && url.pathname.startsWith('/m')) {
        url.pathname = url.pathname.replace('/m', '') || '/';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};