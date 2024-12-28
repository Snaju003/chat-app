import { useEffect, useState } from "react";
import ChatSidebar from "../components/sidebar/ChatSideBar";
import EmptyChatArea from "../components/EmptyChatArea";
import useGetConversations from "../hooks/useGetConversation";
import MessageInput from "../components/messages/MessageInput";
import useConversation from "../zustand/useConversation";
import useUserDetails from "../hooks/useUserDetails";
import Messages from "../components/messages/Messages";
import { Menu, X } from 'lucide-react';
import { useSocketContext } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";

const ChatHome = () => {
  const { onlineUsers } = useSocketContext();
  const isOnline = (id) => onlineUsers.includes(id);
  const { logout } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();
  const { userDetails, loading, error } = useUserDetails(selectedConversation);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-80 bg-slate-950 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        <ChatSidebar
          conversations={conversations}
          searchTerm={searchTerm}
          activeChat={selectedConversation}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onChatSelect={(conversation) => {
            setSelectedConversation(conversation);
            setIsSidebarOpen(false);
          }}
          handleLogout={handleLogout}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col w-full md:w-[calc(100%-20rem)]">
        {selectedConversation ? (
          <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="bg-slate-950 shadow-sm border-b border-gray-800 px-4 py-2 md:px-6 md:py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 md:space-x-4">
                <button
                  className="md:hidden text-white p-2"
                  onClick={toggleSidebar}
                  aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
                >
                  {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <img
                  src={
                    userDetails?.profilepic ||
                    "https://avatar.iran.liara.run/public/boy?username=default"
                  }
                  alt="Profile"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                />
                <div>
                  {loading ? (
                    <span className="text-base md:text-lg font-semibold text-gray-300">
                      Loading...
                    </span>
                  ) : error ? (
                    <span className="text-base md:text-lg font-semibold text-red-500">
                      Error!
                    </span>
                  ) : (
                    <span className="text-base md:text-lg font-semibold text-white">
                      {userDetails?.fullName}
                    </span>
                  )}
                  <p className="text-xs md:text-sm text-gray-400">{isOnline(selectedConversation)?"Online":"Offline"}</p>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-grow bg-gray-800 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 scrollbar-corner-none p-4 md:p-6">
                <Messages />
            </div>

            {/* Message Input */}
            <div className="bg-slate-950 border-t border-gray-800 p-2 md:p-4">
              <MessageInput className="w-full" />
            </div>
          </div>
        ) : (
          <EmptyChatArea setIsSidebarOpen={setIsSidebarOpen} />
        )}
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ChatHome;