export { default } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  const session = req.cookies.get("next-auth.session-token");
  if (session) return NextResponse.next();
  else return NextResponse.redirect(new URL("/auth/login", req.url));
}

export const config = {
  matcher: ["/checkout", "/dashboard"],
  pages: {
    signIn: "/auth/login",
  },
};
