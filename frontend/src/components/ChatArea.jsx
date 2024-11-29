/* eslint-disable no-unused-vars */
import React from 'react';
import { MessageCircle } from 'lucide-react';

const EmptyChatArea = () => {
  return (
    <div className="text-center">
      <MessageCircle size={64} className="mx-auto text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-gray-200">Select a conversation</h2>
      <p className="text-gray-400">Or start a new chat</p>
    </div>
  );
};

export default EmptyChatArea;