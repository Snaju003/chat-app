import { useState } from "react";
import { Search } from "lucide-react";
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
			c.fullName.toLowerCase().includes(search.toLowerCase())
		);

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};

	return (
		<form onSubmit={handleSubmit} className='relative w-full pr-4 pl-4'>
			<div className="relative">
        <Search className="absolute left-2 top-2 text-gray-400" />
        <input
          type="text"
          placeholder="Search conversations"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-950"
        />
      </div>
		</form>
	);
};

export default SearchBar;


{/* <div className="p-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search conversations"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-950"
        />
      </div>
    </div> */}