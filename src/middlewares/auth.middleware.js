import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const auhtUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "user not authorized",
    });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = await userModel.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token is Invalid or Expired",
    });
  }
};

const auhtMiddleware = {
  auhtUser,
};

export default auhtMiddleware;
