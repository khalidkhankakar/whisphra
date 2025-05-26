import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

function ChatSidebar() {
  return (
    <div className="h-full pb-4 flex flex-col relative md:w-[350px] bg-slate-300 w-full lg:w-[400px]">

      <div className="w-full py-3 sticky top-0">

        <div className="px-3">
          <h1 className="text-2xl font-bold tracking-wide text-green-600 font-serif ">Whispra</h1>
        </div>

        <div className="px-3">
          Searchbox
        </div>
      </div>

      <div className="flex-1 px-3 border border-red-300 py-4 flex flex-col gap-y-2 min-h-0 pb-[88px] overflow-y-auto">
        {/* <div className=""> */}
          <h1 className="text-xl font-bold tracking-wide bg-slate-400 rounded-2xl p-3 font-serif ">Chats</h1>
          <h1 className="text-xl font-bold tracking-wide bg-slate-400 rounded-2xl p-3 font-serif ">Chats</h1>
          <h1 className="text-xl font-bold tracking-wide bg-slate-400 rounded-2xl p-3 font-serif ">Chats</h1>
          <h1 className="text-xl font-bold tracking-wide bg-slate-400 rounded-2xl p-3 font-serif ">Chats</h1>
          <h1 className="text-xl font-bold tracking-wide bg-slate-400 rounded-2xl p-3 font-serif ">Chats</h1>
          <h1 className="text-xl font-bold tracking-wide bg-slate-400 rounded-2xl p-3 font-serif ">Chats</h1>
          <h1 className="text-xl font-bold tracking-wide bg-slate-400 rounded-2xl p-3 font-serif ">Chats</h1>
          <h1 className="text-xl font-bold tracking-wide bg-slate-400 rounded-2xl p-3 font-serif ">Chats</h1>
          <h1 className="text-xl font-bold tracking-wide bg-slate-400 rounded-2xl p-3 font-serif ">Chats</h1>
          <h1 className="text-xl font-bold tracking-wide bg-slate-400 rounded-2xl p-3 font-serif ">Chats</h1>
          <h1 className="text-xl font-bold tracking-wide bg-slate-400 rounded-2xl p-3 font-serif ">Chats</h1>
        {/* </div> */}
      </div>
    </div>
  );
}

export default ChatSidebar;
