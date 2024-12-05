/* eslint-disable no-unused-vars */
import React from "react";
import { MessageCircle } from "lucide-react";

const EmptyChatArea = () => {
  return (
    <div className="flex items-center justify-center h-full bg-gray-800">
      <div className="text-center">
        <MessageCircle size={64} className="mx-auto text-slate-950 mb-4" />
        <h2 className="text-xl font-semibold text-slate-950">
          Select a conversation
        </h2>
        <p className="text-slate-950">Or start a new chat</p>
      </div>
    </div>
  );
};

export default EmptyChatArea;
