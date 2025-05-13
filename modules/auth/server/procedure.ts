import { signIn } from "@/auth";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

import { loginSchema } from "../schema";

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
      console.log({ error });
      return { success: false, message: "Invalid credentials" };
    }
  }),

});
