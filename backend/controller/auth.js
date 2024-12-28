import User from "../models/user.js";
import bcrypt from "bcryptjs";
import {
  generateTokenAndSetCookie,
  generateRefreshTokenAndSetCookie,
} from "../utils/token.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const user = await User.findOne({ username });
    if (user)
      return res.status(400).json({ message: "Username already exists" });

    const boyprofilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlprofilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilepic: gender === "male" ? boyprofilepic : girlprofilepic,
    });

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);
    generateRefreshTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      profilepic: newUser.profilepic,
    });
  } catch (error) {
    console.error("Error in signup controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);
    generateRefreshTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullname,
      username: user.username,
      profilePic: user.profilepic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.cookie("refreshToken", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "Unauthenticated" ,status:401});
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ message: "Unauthenticated" });
    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilepic: user.profilepic,
    });
  } catch (error) {
    console.log("Error in refresh token controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
