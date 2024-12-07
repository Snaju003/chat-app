/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ChatSidebar from "../components/sidebar/ChatSideBar";
import EmptyChatArea from "../components/EmptyChatArea";
import useLogout from "../hooks/useLogout";
import useGetConversations from "../hooks/useGetConversation";
import MessageInput from "../components/messages/MessageInput";
import useConversation from "../zustand/useConversation";
import useUserDetails from "../hooks/useUserDetails";
import Messages from "../components/messages/Messages";

const ChatHome = () => {
  const { logout } = useLogout();
  const [ searchTerm, setSearchTerm ] = useState("");
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();
  const { userDetails, loading, error } = useUserDetails(selectedConversation);

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("token");
    localStorage.removeItem("auth-user");
  };

  useEffect(() => {
    return () => {setSelectedConversation(null)};
  }, [setSelectedConversation]);

  return (
    <div className='flex h-screen bg-gray-100 overflow-hidden'>
      <ChatSidebar
        conversations={conversations}
        searchTerm={searchTerm}
        activeChat={selectedConversation}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onChatSelect={setSelectedConversation}
        handleLogout={handleLogout}
        className='w-80 bg-white shadow-lg border-r border-gray-200'
      />

      <div className='flex flex-col flex-grow'>
        {selectedConversation ? (
          <div className='flex flex-col h-full'>

            {/* Chat Header */}
            <div className='bg-slate-950 shadow-sm border-b border-gray-800 px-6 py-4 flex items-center justify-between'>
              <div className='flex items-center space-x-4'>
                <img
                  src={
                    userDetails?.profilepic ||
                    "https://avatar.iran.liara.run/public/boy?username=default"
                  }
                  alt='Profile'
                  className='w-10 h-10 rounded-full object-cover'
                />
                <div>
                  {loading ? (
                    <span className='text-lg font-semibold text-gray-800'>
                      Loading...
                    </span>
                  ) : error ? (
                    <span className='text-lg font-semibold text-red-500'>
                      Error!
                    </span>
                  ) : (
                    <span className='text-lg font-semibold text-white'>
                      {userDetails?.fullName}
                    </span>
                  )}
                  <p className='text-sm text-gray-500'>Online</p>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className='flex-grow bg-gray-800 overflow-y-auto p-6'>
              <Messages/>
            </div>

            {/* Message Input */}
            <div className='bg-slate-950 border-t border-gray-800 p-4'>
              <MessageInput className='w-full' />
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
