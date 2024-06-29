import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    const pathname = request.nextUrl.pathname;

    if (
        (pathname.startsWith("/login") || pathname.startsWith("/register")) &&
        ((refreshToken && accessToken) || refreshToken)
    ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (pathname.startsWith("/dashboard") && !refreshToken && !accessToken) {
        const response = NextResponse.redirect(new URL("/login", request.url));

        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login/:path*", "/register/:path*"],
};
