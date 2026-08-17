import userModel from "../models/user.model.js";
import generateAuhtToken from "../utils/generateAuthToken.js";

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      message: "name, email, password is required to create user",
    });
  }

  const isUserExists = await userModel.findOne({ email });

  if (isUserExists) {
    return res.status(409).json({
      message: "Invalid email address",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password,
    role: role ? role : "user",
  });

  const token = generateAuhtToken(user);

  return res.status(201).json({
    message: "user registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "email or password is required to login",
    });
  }

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const token = generateAuhtToken(user);

  return res.status(200).json({
    message: "user logged in successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

const getMe = async (req, res) => {
  const { user } = req;

  return res.status(200).json({
    message: "user fetched successfully",
    user,
  });
};

const authController = {
  register,
  login,
  getMe,
};

export default authController;
