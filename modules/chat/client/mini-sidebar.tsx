import { MessageCircleMore, Settings, User, UsersRound } from "lucide-react";
import React from "react";

import Hint from "@/components/shared/hint";

function MiniSidebar() {
  // TODO onclick to change the type of sidebar
  return (
    <div className="h-full py-3 hidden lg:flex items-center flex-col border-r-2 bg-gray-200 w-[70px] ">
      <div className=" flex-1 space-y-3">
        <Hint label="Chats" side="right">
          <div className="hover:bg-slate-300 p-2 rounded-full">
            <MessageCircleMore size={30} />
          </div>
        </Hint>
        <Hint label="Groups" side="right">
          <div className="hover:bg-slate-300 p-2 rounded-full">
            <UsersRound size={30} />
          </div>
        </Hint>
      </div>

      <div className="  space-y-3">
        <Hint label="Settings" side="right">
          <div className="hover:bg-slate-300 p-2 rounded-full">
            <Settings size={30} />
          </div>
        </Hint>
        <Hint label="Profile" side="right">
          <div className="hover:bg-slate-300 p-2 rounded-full">
            <User size={30} />
          </div>
        </Hint>
      </div>
    </div>
  );
}

export default MiniSidebar;
