import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => (token?.userId ? true : false),
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
