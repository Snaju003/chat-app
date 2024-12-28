/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { MessageCircle, Settings, LogOut } from "lucide-react";
import SearchBar from "./SearchBar";
import ConversationList from "./ConversationList";

const ChatSidebar = ({
  conversations,
  activeChat,
  onChatSelect,
  handleLogout,
}) => {
  const handleNewConversation = (name) => {};
  return (
    <div className="w-80 bg-slate-950 border-r border-gray-800 flex flex-col text-gray-200 gap-5">
      <div className="p-4 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-2xl font-bold flex items-center">
          <MessageCircle className="mr-2" /> ChitChat
        </h1>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-800 rounded-full">
            <LogOut size={20} onClick={handleLogout} />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full">
            <Settings size={20} />
          </button>
        </div>
      </div>

      <SearchBar />

      <ConversationList
        conversations={conversations}
        activeChat={activeChat}
        onChatSelect={onChatSelect}
      />
    </div>
  );
};

export default ChatSidebar;

// import React from 'react';
// import { MessageCircle, Settings, LogOut, X } from 'lucide-react';
// import SearchBar from './SearchBar';
// import ConversationList from './ConversationList';

// const ChatSidebar = ({
//   conversations,
//   activeChat,
//   onChatSelect,
//   handleLogout,
//   isSidebarOpen,
//   setIsSidebarOpen
// }) => {
//   const handleNewConversation = (name) => {
//     // Implement new conversation logic here
//   }

//   return (
//     <div className={`fixed inset-y-0 left-0 z-30 w-80 bg-slate-950 border-r border-gray-800 flex flex-col text-gray-200 gap-5 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
//       <div className="p-4 flex justify-between items-center border-b border-gray-800">
//         <h1 className="text-2xl font-bold flex items-center">
//           <MessageCircle className="mr-2" /> ChitChat
//         </h1>
//         <div className="flex space-x-2">
//           <button className="p-2 hover:bg-gray-800 rounded-full" onClick={handleLogout}>
//             <LogOut size={20} />
//           </button>
//           <button className="p-2 hover:bg-gray-800 rounded-full">
//             <Settings size={20} />
//           </button>
//           <button className="md:hidden p-2 hover:bg-gray-800 rounded-full" onClick={() => setIsSidebarOpen(false)}>
//             <X size={20} />
//           </button>
//         </div>
//       </div>

//       <SearchBar />

//       <ConversationList
//         conversations={conversations}
//         activeChat={activeChat}
//         onChatSelect={(conversation) => {
//           onChatSelect(conversation);
//           setIsSidebarOpen(false);
//         }}
//       />
//     </div>
//   );
// };

// export default ChatSidebar;
