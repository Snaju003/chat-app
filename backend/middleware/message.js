import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ msg: "Token verification failed." });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "No user found with this ID." });
    }

    req.user = user;

    next();

  } catch (e) {
    console.error("Error in protectRoute middleware:", e);
    res.status(500).json({ msg: "Internal server error or invalid token." });
  }
};
