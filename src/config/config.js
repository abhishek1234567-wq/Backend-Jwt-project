import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

if (!MONGO_URI || !JWT_SECRET) {
  throw new Error(
    "Environment variables are missing in environmenatal variables",
  );
}

const config = {
  MONGO_URI,
  JWT_SECRET,
};

export default config;
