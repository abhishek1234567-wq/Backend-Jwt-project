import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateAuthToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    config.JWT_SECRET,
    {
      expiresIn: "24h",
    },
  );

  return token;
};

export default generateAuthToken;
