import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { db } from "./drizzle/db";
import { usersTable } from "./drizzle/models";
import { loginSchema } from "./lib/validations";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validFields = loginSchema.safeParse(credentials);
        if (!validFields.success)
          return null;

        const { email, password } = validFields.data;

        // Find user by email
        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
        if (!user || !user?.password)
          return null;

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)
          return null;

        if (!user.emailVerified)
          return null;
        // Return the user object that satisfies NextAuth's User type
        return {
          id: user.id as string,
          name: user.name as string,
          email: user.email as string,
          image: user.image ? (user.image as string) : "",
        };
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      let userExists;
      console.log({ user });
      if (user?.email) {
        [userExists] = await db.select().from(usersTable).where(eq(usersTable.email, user.email));
        if (userExists)
          return false;
      }
      if (
        !userExists && user?.email && user?.name && user?.image && user?.id
      ) {
        console.log("here");
        // create the user in the database
        const response = await db
          .insert(usersTable)
          .values({
            provider: "google",
            providerAccountId: user.id,
            name: user.name,
            email: user.email,
            emailVerified: new Date(),
            id: user.id,
            image: user.image,
          })
          .returning();
        if (!response)
          return false;
        return true;
      }

      if (
        userExists?.provider === "credentials"
        && !userExists?.emailVerified
      ) {
        // TODO: send email
        return false;
      }

      return true;
    },

    async jwt({ token, user, account, profile }) {
      // console.log("JWT THIRD");

      // If user signs in for the first time
      if (account) {
        // console.log({ account, profile, user });
        token.id = user.id;
        token.accessToken = account.access_token;
      }

      return token;
    },

    async session({ session, token }) {
      // console.log("SESSION TWO");

      session.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
    },

  },
  pages: {
    signIn: "/login",
    error: "/auth-error",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
});
