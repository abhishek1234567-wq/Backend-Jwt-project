import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user's name is required to create user"],
      minlength: [3, "user's name must be 3 characters long"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email is required to create user"],
      unique: [true, "email must be unique to register a user"],
    },
    role: {
      type: String,
      enum: ["user", "manager", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "password is required to register a user"],
      trim: true,
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
