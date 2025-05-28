'use client'
import UserList from "@/modules/user/client/user-list";
import { usePathname } from "next/navigation";
import React from "react";

function ChatSidebar() {
  const pathname = usePathname();

  // also hide only mobile devices 

  // Hide sidebar on mobile devices (width < 768px) when on /chat/ route
  React.useEffect(() => {
    const handleResize = () => {
      if (pathname.startsWith('/chat/') && window.innerWidth < 768) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pathname]);

  const [hidden, setHidden] = React.useState(false);
  if (hidden) {
    return null;
  }

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

      <div className="flex-1 px-3 py-4 flex flex-col gap-y-2 min-h-0 pb-[88px] overflow-y-auto">

        <UserList />

      </div>
    </div>
  );
}

export default ChatSidebar;
