/* eslint-disable react/prop-types */

const ChatArea = ({ messages, receiverImg , senderImg  }) => {
  console.log("Receiver Image:", receiverImg);
  console.log("Sender Image:", senderImg);

  return (
    <>
      {messages.map((message, index) => (
        <div key={index} className={`chat ${message.isSender ? "chat-end" : "chat-start"}`}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                className="object-cover w-full h-full"
                alt={message.isSender ? "Sender's avatar" : "Receiver's avatar"}
                src={message.isSender ? senderImg : receiverImg}
              />
            </div>
          </div>
          <div className="chat-header">
            {message.senderName}
            <time className="text-xs opacity-50">{message.time}</time>
          </div>
          <div className="chat-bubble">{message.text}</div>
          <div className="chat-footer opacity-50">{message.status}</div>
        </div>
      ))}
    </>
  );
};

export default ChatArea;