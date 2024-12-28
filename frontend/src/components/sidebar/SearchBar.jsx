import { useState } from "react";
import { Search } from 'lucide-react';
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
import useGetConversation from "../../hooks/useGetConversation";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.fullname.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation._id);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <form onSubmit={handleSubmit} className='relative w-full px-3 md:px-4'>
      <div className='relative'>
        <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none' size={18} />
        <input
          type='text'
          placeholder='Search conversations'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full pl-8 pr-4 py-2 bg-slate-900 border border-gray-800 rounded-lg text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-950 transition-all'
        />
      </div>
    </form>
  );
};

export default SearchBar;

