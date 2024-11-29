// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { MessageCircle, Users, Settings, Search, Plus, ChevronRight } from 'lucide-react';

const ChatHome = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const conversations = [
    { id: 1, name: 'Team Rocket', lastMessage: 'Preparing for our next mission', unread: 3 },
    { id: 2, name: 'Alex Johnson', lastMessage: 'Sure, let\'s schedule that meeting', unread: 1 },
    { id: 3, name: 'Design Team', lastMessage: 'Mockups are ready for review', unread: 0 }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-slate-600">
      {/* Sidebar */}
      <div className="w-80 bg-slate-950 border-r border-gray-800 flex flex-col text-gray-200">
        <div className="p-4 flex justify-between items-center border-b border-gray-800">
          <h1 className="text-2xl font-bold flex items-center">
            <MessageCircle className="mr-2" /> ChitChat
          </h1>
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <Users size={20} />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <Settings size={20} />
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-950"
            />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto">
          {filteredConversations.map(conv => (
            <div
              key={conv.id}
              className={`p-4 flex items-center hover:bg-gray-800 cursor-pointer ${
                activeChat === conv.id ? 'bg-indigo-950' : ''
              }`}
              onClick={() => setActiveChat(conv.id)}
            >
              <div className="w-12 h-12 bg-indigo-950 rounded-full flex items-center justify-center text-white mr-4">
                {conv.name.charAt(0)}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{conv.name}</h3>
                  {conv.unread > 0 && (
                    <span className="bg-indigo-950 text-white text-xs px-2 py-1 rounded-full">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm truncate">{conv.lastMessage}</p>
              </div>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-800">
          <button className="w-full bg-indigo-950 text-white py-2 rounded-lg flex items-center justify-center hover:bg-gray-800">
            <Plus className="mr-2" /> New Conversation
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-grow flex items-center justify-center bg-slate-600">
        {activeChat ? (
          <p className="text-gray-300">Chat area for selected conversation</p>
        ) : (
          <div className="text-center">
            <MessageCircle size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-200">Select a conversation</h2>
            <p className="text-gray-400">Or start a new chat</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHome;
