/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { MessageCircle, Users, Settings, LogOut } from 'lucide-react';
import SearchBar from './SearchBar';
import ConversationList from './ConversationList';
import NewConversationButton from './NewConversationButton';

const ChatSidebar = ({ 
  conversations, 
  searchTerm, 
  activeChat, 
  onSearchChange, 
  onChatSelect,
  handleLogout
}) => {
  return (
    <div className="w-80 bg-slate-950 border-r border-gray-800 flex flex-col text-gray-200">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-2xl font-bold flex items-center">
          <MessageCircle className="mr-2" /> ChitChat
        </h1>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-800 rounded-full">
            <LogOut size={20} onClick={handleLogout}/>
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={onSearchChange} 
      />

      {/* Conversation List */}
      <ConversationList 
        conversations={conversations} 
        activeChat={activeChat} 
        onChatSelect={onChatSelect} 
      />

      {/* New Conversation Button */}
      <NewConversationButton />
    </div>
  );
};

export default ChatSidebar;
