import React from "react";

function AuthError() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 min-h-screen">
      <h1 className="text-2xl font-black text-red-600 ">Auth Error</h1>
      <p>Something went wrong</p>
    </div>
  );
}

export default AuthError;
