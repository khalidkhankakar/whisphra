import React from "react";

type Props = Readonly<{
  children: React.ReactNode;
}>;

function RootLayout({ children }: Props) {
  return (
    <main>
      {children}
    </main>
  );
}

export default RootLayout;
