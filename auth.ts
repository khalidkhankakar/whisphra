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
          throw new Error("Invalid fields");

        const { email, password } = validFields.data;

        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
        if (!user || !user.password)
          throw new Error("User not found");

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)
          throw new Error("Incorrect password");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image || "",
        };
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        const provider = account?.provider;

        if (!user?.email)
          return false;

        const [existingUser] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, user.email));

        // 🔹 CASE 1: Google Sign-in
        if (provider === "google") {
          if (existingUser) {
            // If user exists with a different provider, prevent conflict
            if (existingUser.provider !== "google") {
              console.warn("Email already registered with different provider.");
              return false;
            }
            return true; // login
          }

          // Create new Google user
          const response = await db
            .insert(usersTable)
            .values({
              provider: "google",
              providerAccountId: user.id || "",
              name: user.name || "",
              email: user.email || "",
              emailVerified: new Date(),
              id: user.id, // or generate your own ID
              image: user.image || "",
            })
            .returning();

          if (!response)
            return false;

          return true;
        }

        // 🔹 CASE 2: Credentials Sign-in
        if (provider === "credentials") {
          if (!existingUser) {
            console.warn("Credentials user not found.");
            return false;
          }

          // If email not verified, block login
          // if (!existingUser.emailVerified) {
          //   // TODO: send verification email
          //   console.warn("Email not verified.");
          //   return false;
          // }

          return true;
        }

        return false;
      }
      catch (error) {
        console.error("signIn error:", error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
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
