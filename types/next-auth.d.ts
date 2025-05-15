/* eslint-disable ts/consistent-type-definitions */
// eslint-disable-next-line unused-imports/no-unused-imports
import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image?: string | null;
    };
    accessToken?: string;
  };

}
