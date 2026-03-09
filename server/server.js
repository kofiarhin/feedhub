require('dotenv').config();
const app = require('./app');
const { connectDb } = require('./config/db');

const port = process.env.PORT || 5000;

const bootstrap = async () => {
  await connectDb();
  app.listen(port, () => {
    console.log(`server started on port: ${port}`);
  });
};

bootstrap();
