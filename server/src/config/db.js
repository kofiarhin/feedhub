const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async () => {
  if (!env.mongoUri) {
    throw new Error('MONGO_URI is required');
  }

  await mongoose.connect(env.mongoUri);
  return mongoose.connection;
};

module.exports = connectDB;
