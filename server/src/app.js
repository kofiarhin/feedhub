const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const tagRoutes = require('./routes/tagRoutes');
const healthRoutes = require('./routes/healthRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/health', healthRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
