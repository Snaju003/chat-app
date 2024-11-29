/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { ChevronRight } from 'lucide-react';

const ConversationList = ({ conversations, activeChat, onChatSelect }) => {
  return (
    <div className="flex-grow overflow-y-auto">
      {conversations.map(conv => (
        <ConversationItem
          key={conv.id}
          conversation={conv}
          isActive={activeChat === conv.id}
          onSelect={() => onChatSelect(conv.id)}
        />
      ))}
    </div>
  );
};

const ConversationItem = ({ conversation, isActive, onSelect }) => {
  const { name, lastMessage, unread } = conversation;

  return (
    <div
      className={`p-4 flex items-center hover:bg-gray-800 cursor-pointer ${
        isActive ? 'bg-indigo-950' : ''
      }`}
      onClick={onSelect}
    >
      <div className="w-12 h-12 bg-indigo-950 rounded-full flex items-center justify-center text-white mr-4">
        {name.charAt(0)}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{name}</h3>
          {unread > 0 && (
            <span className="bg-indigo-950 text-white text-xs px-2 py-1 rounded-full">
              {unread}
            </span>
          )}
        </div>
        <p className="text-gray-400 text-sm truncate">{lastMessage}</p>
      </div>
      <ChevronRight className="text-gray-400" size={20} />
    </div>
  );
};

export default ConversationList;