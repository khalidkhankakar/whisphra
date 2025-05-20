import React from "react";

import ChatSidebar from "@/modules/chat/client/chat-sidebar";
import MiniSidebar from "@/modules/chat/client/mini-sidebar";

type Props = Readonly<{
  children: React.ReactNode;
}>;

function ChatLayout({ children }: Props) {
  return (
    <main className="flex h-screen overflow-hidden">
      <MiniSidebar />
      <ChatSidebar />
      <div className="flex flex-col flex-1 w-full">
        {children}
      </div>
    </main>
  );
}

export default ChatLayout;
