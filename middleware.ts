import { NextResponse,NextRequest } from "next/server";

export function middleware(request:NextRequest){
    const { pathname } = request.nextUrl;

    const token = request.cookies.get('token')?.value;
    if(!token) {
        if(pathname === '/dashboard'){
            // console.log('Redirecting to home because no token is present');
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    }
    if(token) {
        if(pathname === '/' || pathname === '/register'){
            // console.log('Redirecting to dashboard because token is present');
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }
}

export const config = {
    matcher:['/','/dashboard','/register','/cart'],
};