import { withAuth } from "next-auth/middleware";
// import { NextRequest, NextResponse } from "next/server";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === true,
  },
});
export const config = { matcher: ["/dashboard", "/checkout"] };
