"use client";

import Image from "next/image";

import { registerWithGoogle } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";

function SocialLogin() {
  return (
    <form
      action={registerWithGoogle}
    >
      <Button type="submit" className="cursor-pointer">
        <Image
          src="/icons/google.svg"
          width={20}
          height={20}
          alt="google"
        />
        <span>Signin with Google</span>
      </Button>
    </form>
  );
}

export default SocialLogin;
