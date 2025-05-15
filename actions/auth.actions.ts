"use server";

import { signIn } from "@/auth";

export async function registerWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}
