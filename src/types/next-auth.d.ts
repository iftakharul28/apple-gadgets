/**
 * Module augmentation for `next-auth` types
 * Allows us to add custom properties to the `session` object
 * and keep type safety
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/

import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    name: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    name: string | null;
  }
}
