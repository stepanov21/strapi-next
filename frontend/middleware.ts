import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {getMyUserData} from "@/data/services/get-my-user-data";

export async function middleware(request: NextRequest) {
    const user = await getMyUserData();
    const currentPath = request.nextUrl.pathname;

    if (currentPath.startsWith("/dashboard") && user.ok === false) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}