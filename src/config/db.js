import mongoose from "mongoose";
import config from "./config.js";

async function connectToDB() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("connected with DB");
  } catch (error) {
    console.log("Error while connecting with DB", error);
    process.exit(1);
  }
}

export default connectToDB;
