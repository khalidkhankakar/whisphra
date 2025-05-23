"use client";

import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { loginDefaultValues, registerDefaultValues } from "@/lib/constant";
import { loginSchema, registerSchema } from "@/modules/auth/schema";
import { useTRPC } from "@/trpc/client";

import SocialLogin from "./social-login";

type Props = {
  fromType: "REGISTER" | "LOGIN";

};

function AuthForm({ fromType }: Props) {
  const formSchema = fromType === "REGISTER" ? registerSchema : loginSchema;

  const defaultValues = fromType === "REGISTER" ? registerDefaultValues : loginDefaultValues;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const router = useRouter();
  const trpc = useTRPC();

  const createUserMutation = useMutation(trpc.auth.createUser.mutationOptions({
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (success) => {
      toast.success(success.message);
      router.push("/");
    },
  }));

  const signInMutate = useMutation(trpc.auth.signInWithCreditionals.mutationOptions({
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Login successful");
      router.push("/");
    },
  }));

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (fromType === "REGISTER") {
      const registerValues = values as z.infer<typeof registerSchema>;
      createUserMutation.mutate(registerValues);
    }

    else {
      const { email, password } = values;
      // signIn by server actions
      signInMutate.mutate({ email, password });
    }
  }

  return (

    <div className="flex flex-col items-center justify-center max-w-2xl w-full mx-5  p-3">

      <div>
        <h1 className="text-2xl font-bold my-1 font-serif text-center">{fromType === "REGISTER" ? "Create an Account" : "Welcome Back"}</h1>
        <p className="text-sm text-gray-600">Hurry up! Chat with your friends</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-3 w-full">
          {fromType === "REGISTER" && (
            <FormField
              control={form.control}
              name="name"

              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Khalid Khan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Khalidkhan@me.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {fromType === "REGISTER" && (
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button disabled={fromType === "REGISTER" ? createUserMutation.isPending : signInMutate.isPending} className="cusor-pointer w-full" type="submit">{fromType === "REGISTER" ? createUserMutation.isPending ? "Registering..." : "Register" : signInMutate.isPending ? "Logging in..." : "Login"}</Button>
        </form>
      </Form>
      <Separator className="my-2 !w-1/2 !border-[0.1px] border-gray-500" />
      <SocialLogin />
      <Separator className="my-2 !w-1/3 border-[0.5px] border-gray-500" />

      <Link prefetch href={fromType === "REGISTER" ? "/login" : "/register"} className="text-sm text-blue-600">
        {fromType === "REGISTER" ? "Already have an account?" : "Don't have an account?"}
      </Link>

    </div>
  );
}

export default AuthForm;
