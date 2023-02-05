import { withAuth } from "next-auth/middleware";
export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === true,
  },
});

export const config = {
  matcher: ["/dashboard", "/checkout"],
};
