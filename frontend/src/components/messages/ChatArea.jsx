import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

/* eslint-disable react/prop-types */
const ChatArea = () => {
  const { messages, loading } = useGetMessages();
  return (
    <>
      {messages.map((message, index) => (
        <div key={index} className={`chat ${message.isSender ? "chat-end" : "chat-start"}`}>         
            <div >
            {!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
            </div>
          </div>
      ))}
    </>
  );
};

export default ChatArea;