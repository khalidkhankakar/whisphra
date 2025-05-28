import { MessageSquare, User, Users } from "lucide-react";
import React from "react";

function MobileBottombar() {
  const activeTab = "chats"; // This should be managed by state or props in a real application
  return (
    <div className="flex fixed bottom-1 rounded-t-xl w-full z-50 lg:hidden border-t border-gray-300 bg-red-500">
      <button
        className={`flex-1 py-3 flex flex-col items-center ${activeTab === "chats" ? "text-emerald-700" : "text-gray-600"}`}
      >
        <MessageSquare className="h-6 w-6" />
        <span className="text-xs mt-1">Chats</span>
      </button>
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
