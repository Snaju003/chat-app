/* eslint-disable react/prop-types */
import { ChevronRight } from 'lucide-react';
import { useSocketContext } from "../../context/SocketContext";

const ConversationList = ({ conversations, activeChat, onChatSelect }) => {
  const { onlineUsers } = useSocketContext();
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
      className={`p-3 md:p-4 gap-3 md:gap-4 flex items-center hover:bg-gray-800 cursor-pointer transition-colors ${
        isActive ? "bg-indigo-950" : ""
      }`}
      onClick={onSelect}
    >
      <div className="relative flex-shrink-0">
        <img
          src={conversation.profilepic}
          width={40}
          height={40}
          alt='Profile Pic'
          className='rounded-full w-8 h-8 md:w-10 md:h-10 object-cover'
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full border-2 border-slate-950"></span>
        )}
      </div>
      <div className='flex-grow min-w-0'>
        <div className='flex justify-between items-center'>
          <h3 className='font-semibold text-sm md:text-base truncate'>{conversation.fullname}</h3>
        </div>
      </div>
      <ChevronRight className='text-gray-400 flex-shrink-0' size={16} />
    </div>
  );
};

export default ConversationList;

