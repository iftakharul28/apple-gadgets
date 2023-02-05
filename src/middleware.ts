import { withAuth } from "next-auth/middleware";
// import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  // async function middleware(req) {
  //    const res = NextResponse.next();
  //    return NextResponse.rewrite(new URL("/dashboard", req.url));
  // },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard", "/checkout"],
};
