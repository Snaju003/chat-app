/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { ChevronRight } from "lucide-react";

const ConversationList = ({ conversations, activeChat, onChatSelect }) => {
  return (
    <div className='flex-grow overflow-y-auto'>
      {conversations.map((conv) => (
        <ConversationItem
          key={conv._id}
          conversation={conv}
          isActive={activeChat === conv._id}
          onSelect={() => onChatSelect(conv._id)}
        />
      ))}
    </div>
  );
};

const ConversationItem = ({ conversation, isActive, onSelect }) => {
  return (
    <div
      className={`p-4 gap-7 flex items-center hover:bg-gray-800 cursor-pointer ${
        isActive ? "bg-indigo-950" : ""
      }`}
      onClick={onSelect}
    >
      <img
        src={conversation.profilepic}
        width={40}
        height={40}
        alt='Profile Pic'
      />
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
