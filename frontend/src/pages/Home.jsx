// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import ChatSidebar from "../components/ChatSideBar";
import EmptyChatArea from "../components/EmptyChatArea";
import useLogout from "../hooks/useLogout";
import useGetConversations from "../hooks/useGetConversation";
import ChatArea from "../components/ChatArea";

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
    <div className="flex h-screen bg-slate-600">
      <ChatSidebar
        conversations={conversations}
        searchTerm={searchTerm}
        activeChat={activeChat}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onChatSelect={setActiveChat}
        handleLogout={handleLogout}
      />

      <div className="flex-grow flex items-center justify-center bg-slate-600">
        {activeChat ? <ChatArea receiverImg={conversations.profilepic} /> : <EmptyChatArea />}
      </div>
    </div>
  );
};

export default ChatHome;
