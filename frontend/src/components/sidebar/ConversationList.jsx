/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { ChevronRight } from "lucide-react";
import { useSocketContext } from "../../context/SocketContext";

const ConversationList = ({ conversations, activeChat, onChatSelect }) => {
  const {onlineUsers} = useSocketContext();
  const isOnline = (id) => onlineUsers.includes(id);
  
  return (
    <div className='flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 scrollbar-corner-none'>
      {conversations.map((conv) => (
        <ConversationItem
          key={conv._id} 
          conversation={conv}
          isActive={activeChat === conv._id}
          onSelect={() => onChatSelect(conv._id)}
          isOnline={isOnline(conv._id)}
        />
      ))}
    </div>
  );
};

const ConversationItem = ({ conversation, isActive, onSelect, isOnline }) => {
  return (
    <div
      className={`p-4 gap-7 flex items-center hover:bg-gray-800 cursor-pointer ${
        isActive ? "bg-indigo-950" : ""
      }`}
      onClick={onSelect}
    >
      <div className="relative">
        <img
          src={conversation.profilepic}
          width={40}
          height={40}
          alt='Profile Pic'
          className='rounded-full'
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        )}
      </div>
      <div className='flex-grow'>
        <div className='flex justify-between items-center'>
          <h3 className='font-semibold'>{conversation.fullname}</h3>
        </div>
      </div>
      <ChevronRight className='text-gray-400' size={20} />
    </div>
  );
};

export default ConversationList;