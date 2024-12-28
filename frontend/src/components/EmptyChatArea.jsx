/* eslint-disable react/prop-types */
import { MessageCircle } from 'lucide-react';
import { useAuthContext } from "../context/AuthContext";

const EmptyChatArea = ({ setIsSidebarOpen }) => {
  const { authUser } = useAuthContext();

  const handleStartConversation = () => {
    setIsSidebarOpen(true);
  };

  return (
    <div className="flex items-center justify-center h-full bg-slate-800 p-4">
      <div className="text-center">
        <MessageCircle size={64} className="mx-auto text-gray-400 mb-4" />
        <h1 className="text-xl md:text-2xl font-semibold text-gray-400 pb-5">
          Welcome {authUser.fullName}
        </h1>
        <div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors md:hidden"
            onClick={handleStartConversation}
          >
            Start a conversation
          </button>

          <div className="hidden md:block">
            <h2 className="text-xl font-semibold text-gray-400 pb-2">
              Select a conversation
            </h2>
            <p className="text-gray-400">Or start a new chat</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyChatArea;

