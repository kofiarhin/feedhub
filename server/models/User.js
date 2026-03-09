const mongoose = require('mongoose');
const { USER_ROLES } = require('../constants/appConstants');

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    role: { type: String, enum: Object.values(USER_ROLES), default: USER_ROLES.USER, index: true },
    phone: { type: String, trim: true, default: '' },
    address: { type: String, trim: true, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
