const app = require('./app');
const connectDB = require('./config/db');
const env = require('./config/env');

const startServer = async () => {
  try {
    if (!env.jwtSecret) throw new Error('JWT_SECRET is required');
    await connectDB();
    app.listen(env.port, () => {
      console.log(`FeedHub API running on port ${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
