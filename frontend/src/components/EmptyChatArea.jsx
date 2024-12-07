/* eslint-disable no-unused-vars */
import React from "react";
import { MessageCircle } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";

const EmptyChatArea = () => {
  const { authUser } = useAuthContext();
  // console.log({authUser});
  return (
    <div className="flex items-center justify-center h-full bg-slate-800">
      <div className="text-center">
        <MessageCircle size={64} className="mx-auto text-gray-400 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-400 pb-5">
          Welcome {authUser.fullname}
        </h1>
        <h2 className="text-xl font-semibold text-gray-400 pb-2">
          Select a conversation
        </h2>
        <p className="text-gray-400">Or start a new chat</p>
      </div>
    </div>
  );
};

export default EmptyChatArea;
