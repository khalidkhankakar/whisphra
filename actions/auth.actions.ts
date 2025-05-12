"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { signIn } from "@/auth";
import { db } from "@/drizzle/db";
import { usersTable } from "@/drizzle/models";
import { registerSchema } from "@/lib/validations";

export async function registerWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}

export async function createUser(data) {
  const isValid = registerSchema.safeParse(data);
  if (!isValid.success) {
    return { success: false, message: isValid.error.message };
  }

  const { email, name, password, passwordConfirmation } = isValid.data;

  if (password !== passwordConfirmation) {
    return { success: false, message: "Passwords must match" };
  }

  // check if user exists by email
  const [existingUser] = await db.select().from(usersTable).where(eq(usersTable.email, email));

  if (existingUser) {
    return { success: false, message: "User already exists" };
  }
  // hash password

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await db.insert(usersTable).values({
      email,
      name,
      password: hashedPassword,
      provider: "credentials",
      providerAccountId: email,
      emailVerified: new Date(),

    });

    if (!user)
      return { success: false, message: "Error creating user" };

    signIn("credentials", { email, password });
    return { success: true, message: "User created successfully" };
  }
  catch (error) {
    console.log(error);
    return { success: false, message: "Error creating user" };
  }
}
