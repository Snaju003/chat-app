// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import ChatSidebar from '../components/ChatSideBar';
import EmptyChatArea from '../components/ChatArea';
import useLogout from '../hooks/useLogout';
import useGetConversations from '../hooks/useGetConversation';

const ChatHome = () => {
  const {logout} = useLogout();
  const [activeChat, setActiveChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // const conversations = [
  //   { id: 1, name: 'Team Rocket', lastMessage: 'Preparing for our next mission', unread: 3 },
  //   { id: 2, name: 'Alex Johnson', lastMessage: 'Sure, let\'s schedule that meeting', unread: 1 },
  //   { id: 3, name: 'Design Team', lastMessage: 'Mockups are ready for review', unread: 0 }
  // ];

  const {conversations} = useGetConversations();
  // console.log(conversations);
  

  const handleLogout = async() => {
    await logout();
    localStorage.removeItem('token');
    localStorage.removeItem('auth-user');
    };

  // const filteredConversations = conversations.filter(conv =>
  //   conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="flex h-screen bg-slate-600">
      {/* Sidebar */}
      <ChatSidebar 
        conversations={conversations}
        searchTerm={searchTerm}
        activeChat={activeChat}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onChatSelect={setActiveChat}
        handleLogout={handleLogout}
      />

      {/* Main Chat Area */}
      <div className="flex-grow flex items-center justify-center bg-slate-600">
        {activeChat ? (
          <p className="text-gray-300">Chat area for selected conversation</p>
        ) : (
          <EmptyChatArea />
        )}
      </div>
    </div>
  );
};

export default ChatHome;