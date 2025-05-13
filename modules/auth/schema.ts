import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(50, {
    message: "Name must be less than 50 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  passwordConfirmation: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}).refine(data => data.password === data.passwordConfirmation, {
  message: "Passwords must match",
  path: ["passwordConfirmation"],
});

export const loginSchema = z.object({

  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
