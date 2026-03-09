const mongoose = require('mongoose');
const { MENU_CATEGORIES, MENU_TAGS } = require('../constants/appConstants');

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: '' },
    category: { type: String, enum: MENU_CATEGORIES, required: true, index: true },
    tags: [{ type: String, enum: MENU_TAGS, index: true }],
    available: { type: Boolean, default: true },
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true, index: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);
