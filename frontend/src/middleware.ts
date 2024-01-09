import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    let auth = request.cookies.get("auth_token");

    if (
        !auth &&
        (request.url.endsWith("dashboard") || request.url.endsWith("review"))
    )
        return NextResponse.redirect(new URL("/", request.url));
    else if (auth && request.url.endsWith("login"))
        return NextResponse.redirect(new URL("/dashboard", request.url));
}

export const config = {
    matcher: ["/login", "/dashboard", "/review"],
};
