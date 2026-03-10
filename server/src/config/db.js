const mongoose = require("mongoose");
const env = require("./env");

const connectDB = async () => {
  if (!env.mongoUri) {
    throw new Error("MONGO_URI is required");
  }

  await mongoose.connect(env.mongoUri);
  console.log("connected to database");
  return mongoose.connection;
};

module.exports = connectDB;
