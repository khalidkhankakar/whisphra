import React from "react";

type Props = Readonly<{
  children: React.ReactNode;
}>;

function AuthLayout({ children }: Props) {
  return (
    <main>
      {children}
    </main>
  );
}

export default AuthLayout;
