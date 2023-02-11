import { withAuth } from "next-auth/middleware";
// import { NextRequest, NextResponse } from "next/server";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: ["/dashboard", "/checkout"],
};
