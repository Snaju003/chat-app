export const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;
    const newMessage = new Message({
      sender,
      receiver,
      text,
    });
    const savedMessage = await newMessage.save();
    const newParticipant = new Participant({
      participants: [sender, receiver],
      message: savedMessage._id,
    });
    await newParticipant.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};
