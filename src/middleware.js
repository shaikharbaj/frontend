import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;
  const publicRoutes = path === "/login" || path === "/register";
  const homeRoute = path === "/";
  const protectedRoute = path === "/dashboard/home";
  if (publicRoutes && token !== undefined) {
    return NextResponse.redirect(new URL("/dashboard/home", request.nextUrl.origin));
  }
  if (!token && protectedRoute) {
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }
  if (homeRoute && token) {
    return NextResponse.redirect(new URL("/dashboard/home", request.nextUrl.origin));
  }
  if(homeRoute && !token){
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }
}
export const config = {
  matcher: ["/dashboard/home", "/login", "/register","/"],
};
