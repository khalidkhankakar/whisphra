import React from "react";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { caller } from "@/trpc/server";

async function HomePage() {
  const session = await auth();
  const greeting = await caller.hello({ text: "khalid" });
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <pre>{JSON.stringify(greeting, null, 2)}</pre>
      <h1>Home Page</h1>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/register" });
        }}
      >
        <Button type="submit"> Sign Out</Button>
      </form>

    </div>
  );
}

export default HomePage;
