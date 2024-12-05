import { useState } from "react";
import ChatSidebar from "../components/sidebar/ChatSideBar";
import EmptyChatArea from "../components/EmptyChatArea";
import useLogout from "../hooks/useLogout";
import useGetConversations from "../hooks/useGetConversation";
import ChatArea from "../components/messages/ChatArea";
import MessageInput from "../components/messages/MessageInput";

const ChatHome = () => {
  const { logout } = useLogout();
  const [activeChat, setActiveChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { conversations } = useGetConversations();

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("token");
    localStorage.removeItem("auth-user");
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <ChatSidebar
        conversations={conversations}
        searchTerm={searchTerm}
        activeChat={activeChat}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onChatSelect={setActiveChat}
        handleLogout={handleLogout}
        className="w-80 bg-white shadow-lg border-r border-gray-200"
      />

      <div className="flex flex-col flex-grow">
        {activeChat ? (
          <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="bg-slate-950 shadow-sm border-b border-gray-800 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={
                    activeChat.profilepic ||
                    "https://avatar.iran.liara.run/public/boy?username=default"
                  }
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <span className="text-lg font-semibold text-gray-800">
                    {activeChat.fullName}
                  </span>
                  <p className="text-sm text-gray-500">Online</p>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-grow bg-gray-800 overflow-y-auto p-6">
              <ChatArea
                messages={[
                  {
                    senderName: "Dibs",
                    text: "You were the Chosen One!",
                    time: "12:45",
                    status: "Delivered",
                    isSender: false,
                  },
                  {
                    senderName: "Snanju003",
                    text: "I hate you!",
                    time: "12:46",
                    status: "Seen at 12:46",
                    isSender: true,
                  },
                ]}
                className="space-y-4"
              />
            </div>

            {/* Message Input */}
            <div className="bg-slate-950 border-t border-gray-800 p-4">
              <MessageInput className="w-full" />
            </div>
          </div>
        ) : (
          <EmptyChatArea />
        )}
      </div>
    </div>
  );
};

export default ChatHome;
