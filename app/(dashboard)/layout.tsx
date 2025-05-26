import React from "react";

import ChatSidebar from "@/modules/chat/client/chat-sidebar";
import MiniSidebar from "@/modules/chat/client/mini-sidebar";
import MobileBottombar from "@/modules/chat/client/mobile-bttombar";
import MobileTopbar from "@/modules/chat/client/mobile-topbar";

type Props = Readonly<{
  children: React.ReactNode;
}>;

function ChatLayout({ children }: Props) {
  return (
    <main className="flex h-screen overflow-hidden">
      <MiniSidebar />
      <ChatSidebar />
      {/* <MobileTopbar /> */}
      <div className="flex flex-col flex-1 w-full">
        {children}
      </div>
      <MobileBottombar />

    </main>
  );
}

export default ChatLayout;
