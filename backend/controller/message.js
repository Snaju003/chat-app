import mongoose from "mongoose";
import Message from "../models/messages.js";
import Conversation from "../models/conversation.js";
import User from "../models/user.js";
import { io , getReceiverSocketId } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const {id: receiverId} = req.params;
    const senderId = req.user._id;

    if (!senderId || !receiverId || !message) {
      return res
        .status(400)
        .json({ error: "Sender ID, receiver ID, and message are required." });
    }

    if (
      !mongoose.Types.ObjectId.isValid(senderId) ||
      !mongoose.Types.ObjectId.isValid(receiverId)
    ) {
      return res.status(400).json({ error: "Invalid user ID format." });
    }

    if (senderId === receiverId) {
      return res
        .status(400)
        .json({ error: "Cannot send message to yourself." });
    }
    const trimmedText = message.trim();
    if (trimmedText.length === 0 || trimmedText.length > 1000) {
      return res.status(400).json({
        error: "Message must be between 1 and 1000 characters.",
      });
    }

    const users = await User.find({
      _id: { $in: [senderId, receiverId] },
    });

    if (users.length !== 2) {
      return res.status(404).json({ error: "One or both users not found." });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message: trimmedText,
    });

    const savedMessage = await newMessage.save();

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
    }

    conversation.message.push(savedMessage._id);
    await conversation.save();

    // await Promise.all([conversation.save(), newMessage.save()]);

		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

    res.status(200).json(savedMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error);

    res.status(500).json({
      error: "An unexpected error occurred while processing your message.",
    });
  }
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("message"); 

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.message;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
