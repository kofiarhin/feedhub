require('dotenv').config();
const mongoose = require('mongoose');
const { connectDb } = require('../config/db');
const User = require('../models/User');
const Store = require('../models/Store');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');

const seed = async () => {
  await connectDb();
  await Promise.all([User.deleteMany({}), Store.deleteMany({}), MenuItem.deleteMany({}), Order.deleteMany({})]);

  const admins = await User.insertMany([
    { clerkId: 'admin_clerk_1', name: 'Mario Rossi', email: 'mario@feedhub.demo', role: 'admin', phone: '111-111', address: 'Rome St 1' },
    { clerkId: 'admin_clerk_2', name: 'Priya Patel', email: 'priya@feedhub.demo', role: 'admin', phone: '222-222', address: 'Delhi St 2' },
    { clerkId: 'admin_clerk_3', name: 'Luis Gomez', email: 'luis@feedhub.demo', role: 'admin', phone: '333-333', address: 'Mexico St 3' }
  ]);
  const customer = await User.create({ clerkId: 'customer_clerk_1', name: 'John Customer', email: 'john@feedhub.demo', role: 'user', phone: '999-999', address: 'Main Street' });

  const stores = await Store.insertMany([
    { name: 'Roma Pizza House', description: 'Woodfired Italian classics', address: '12 Roma Ave', phone: '555-0101', adminId: admins[0]._id, cuisineType: 'italian', openingHours: '10am-10pm', logo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591' },
    { name: 'Spice Route Kitchen', description: 'Bold Indian comfort food', address: '44 Spice Rd', phone: '555-0102', adminId: admins[1]._id, cuisineType: 'indian', openingHours: '11am-11pm', logo: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe' },
    { name: 'Taco Fiesta', description: 'Fresh mexican street food', address: '99 Fiesta Blvd', phone: '555-0103', adminId: admins[2]._id, cuisineType: 'mexican', openingHours: '9am-9pm', logo: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b' }
  ]);

  const menuItems = await MenuItem.insertMany([
    { storeId: stores[0]._id, name: 'Margherita Pizza', description: 'Tomato mozzarella basil', price: 14, image: '', category: 'Main Dishes', tags: ['pizza', 'italian', 'vegetarian', 'main'] },
    { storeId: stores[0]._id, name: 'Tiramisu', description: 'Classic dessert', price: 7, image: '', category: 'Desserts', tags: ['dessert', 'italian'] },
    { storeId: stores[1]._id, name: 'Paneer Butter Masala', description: 'Creamy curry paneer', price: 15, image: '', category: 'Main Dishes', tags: ['indian', 'vegetarian', 'main'] },
    { storeId: stores[1]._id, name: 'Mango Lassi', description: 'Yogurt mango drink', price: 5, image: '', category: 'Drinks', tags: ['drink'] },
    { storeId: stores[2]._id, name: 'Chicken Tacos', description: 'Three tacos with salsa', price: 13, image: '', category: 'Main Dishes', tags: ['mexican', 'main', 'halal'] },
    { storeId: stores[2]._id, name: 'Churros', description: 'Sweet fried dessert', price: 6, image: '', category: 'Desserts', tags: ['dessert'] }
  ]);

  await Order.insertMany([
    { storeId: stores[0]._id, userId: customer._id, customerName: customer.name, phone: customer.phone, address: customer.address, fulfillmentType: 'delivery', items: [{ itemId: menuItems[0]._id, name: menuItems[0].name, price: 14, quantity: 1 }], totalPrice: 14, status: 'Completed' },
    { storeId: stores[1]._id, userId: customer._id, customerName: customer.name, phone: customer.phone, address: customer.address, fulfillmentType: 'pickup', items: [{ itemId: menuItems[2]._id, name: menuItems[2].name, price: 15, quantity: 1 }], totalPrice: 15, status: 'Pending' },
    { storeId: stores[2]._id, customerName: 'Guest Buyer', phone: '555123', address: 'Guest lane', fulfillmentType: 'delivery', items: [{ itemId: menuItems[4]._id, name: menuItems[4].name, price: 13, quantity: 2 }], totalPrice: 26, status: 'Preparing' },
    { storeId: stores[0]._id, customerName: 'Guest Buyer 2', phone: '555999', address: 'Guest avenue', fulfillmentType: 'pickup', items: [{ itemId: menuItems[1]._id, name: menuItems[1].name, price: 7, quantity: 1 }], totalPrice: 7, status: 'Ready' }
  ]);

  console.log('Seed complete');
  await mongoose.disconnect();
};

seed();
