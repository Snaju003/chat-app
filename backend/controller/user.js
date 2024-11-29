import User from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    const currentUser = req.user._id;
    const allUsers = await User.find({ _id: { $ne: currentUser } });
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error in getUsers controller:", error);
    res.status(500).json({
      error: "An unexpected error occurred while processing your request.",
    });
  }
};
