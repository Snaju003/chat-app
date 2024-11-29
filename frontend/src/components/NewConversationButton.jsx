/* eslint-disable no-unused-vars */
import React from 'react';
import { Plus } from 'lucide-react';

const NewConversationButton = () => {
  return (
    <div className="p-4 border-t border-gray-800">
      <button className="w-full bg-indigo-950 text-white py-2 rounded-lg flex items-center justify-center hover:bg-gray-800">
        <Plus className="mr-2" /> New Conversation
      </button>
    </div>
  );
};

export default NewConversationButton;