import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export default function auth(req, res, next) {
  const token = req.cookie.jwt;
  if (!token)
    return res
      .status(401)
      .json({ msg: "No authentication token, authorization denied" });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ msg: "Token is not valid" });
  }
}
