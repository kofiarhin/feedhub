const express = require('express');
const cors = require('cors');
const { clerkMiddleware } = require('@clerk/express');
const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const tagRoutes = require('./routes/tagRoutes');
const healthRoutes = require('./routes/healthRoutes');
const { loadUser } = require('./middleware/loadUser');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());
app.use(clerkMiddleware());
app.use(loadUser);

app.get('/', (req, res) => res.json({ success: true, data: 'welcome to feedhub', message: 'OK' }));
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/health', healthRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
