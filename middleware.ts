import { NextResponse,NextRequest } from "next/server";

export function middleware(request:NextRequest){
    const { pathname } = request.nextUrl;

    const token = request.cookies.get('token')?.value;
    if(!token) {
        if(pathname === '/dashboard'){
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    }
    if(token) {
        if(pathname === '/'){
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }
}

export const config = {
    matcher:['/','/dashboard/:path*','/register/:path*'],
};