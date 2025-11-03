/* eslint-disable react-dom/no-missing-button-type */
import { MessageCircle, User, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

function MobileBottombar() {
  // eslint-disable-next-line prefer-const
  let activeTab = "chats"; // Todo This should be managed by state or props in a real application
  return (
    <div className="flex fixed bottom-1 rounded-t-xl w-full z-50 lg:hidden border-t border-gray-300 bg-slate-100 shadow-lg ">
      <Link
        href="/chats"
        className={`flex-1 py-3 flex flex-col items-center ${activeTab === "chats" ? "text-emerald-700" : "text-gray-600"}`}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="text-xs mt-1">Chats</span>
      </Link>
      <button
        className={`flex-1 py-3 flex flex-col items-center ${activeTab === "groups" ? "text-emerald-700" : "text-gray-600"}`}
      >
        <Users className="h-6 w-6" />
        <span className="text-xs mt-1">Groups</span>
      </button>
      <button
        className={`flex-1 py-3 flex flex-col items-center ${activeTab === "profile" ? "text-emerald-700" : "text-gray-600"}`}
      >
        <User className="h-6 w-6" />
        <span className="text-xs mt-1">Profile</span>
      </button>
    </div>
  );
}

export default MobileBottombar;
