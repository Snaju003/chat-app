import mongoose from 'mongoose';
import Message from "../models/messages.js";
import Conversation from "../models/conversation.js";
import User from "../models/user.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    const senderId = req.userId;

    // Enhanced validation
    if (!senderId || !receiverId || !text) {
      return res.status(400).json({ error: "Sender ID, receiver ID, and text are required." });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(senderId) || 
        !mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ error: "Invalid user ID format." });
    }

    // Prevent sending message to self
    if (senderId === receiverId) {
      return res.status(400).json({ error: "Cannot send message to yourself." });
    }

    // Validate text content
    const trimmedText = text.trim();
    if (trimmedText.length === 0 || trimmedText.length > 1000) {
      return res.status(400).json({ 
        error: "Message must be between 1 and 1000 characters." 
      });
    }

    // Efficient user lookup
    const users = await User.find({ 
      _id: { $in: [senderId, receiverId] } 
    });

    if (users.length !== 2) {
      return res.status(404).json({ error: "One or both users not found." });
    }

    // Create new message
    const newMessage = new Message({
      senderId,
      receiverId,
      text: trimmedText,
    });

    const savedMessage = await newMessage.save();

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
    }

    // Add message to conversation
    conversation.messages.push(savedMessage._id);
    await conversation.save();

    res.status(200).json(savedMessage);
  } catch (error) {
    // More robust error handling
    console.error('Message send error:', {
      message: error.message,
      stack: error.stack,
      senderId,
      receiverId
    });

    res.status(500).json({ 
      error: "An unexpected error occurred while processing your message." 
    });
  }
};