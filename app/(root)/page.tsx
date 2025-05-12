import React from "react";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

async function HomePage() {
  const session = await auth();
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
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
