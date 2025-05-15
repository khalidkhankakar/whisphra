import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { signIn } from "@/auth";
import { usersTable } from "@/drizzle/models";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

import { loginSchema, registerSchema } from "../schema";

export const authRouter = createTRPCRouter({

  registerWithGoogle: baseProcedure.mutation(async () => {
    await signIn("google", { redirect: false });
  }),
  signInWithCreditionals: baseProcedure.input(loginSchema).mutation(async ({ input: { email, password } }) => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      return { success: true, message: "Login successful" };
    }
    catch (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: (error as Error).message });
    }
  }),

  createUser: baseProcedure.input(registerSchema).mutation(
    async ({ ctx, input }) => {
      const { email, name, password, passwordConfirmation } = input;

      if (password !== passwordConfirmation) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Passwords must match" });
      }

      const [existingUser] = await ctx.db.select().from(usersTable).where(eq(usersTable.email, email));

      if (existingUser) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      try {
        const user = await ctx.db.insert(usersTable).values({
          email,
          name,
          password: hashedPassword,
          provider: "credentials",
          providerAccountId: email,
          emailVerified: new Date(),

        });

        if (!user) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Error creating user" });
        }

        await signIn("credentials", { email, password, redirect: false });
        return { message: "User created successfully" };
      }
      catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: (error as Error).message });
      }
    },
  ),

});
