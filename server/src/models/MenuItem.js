const mongoose = require('mongoose');
const MENU_TAGS = require('../constants/menuTags');

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String },
    category: { type: String, required: true },
    tags: [{ type: String, enum: MENU_TAGS }],
    available: { type: Boolean, default: true },
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true }
  },
  { timestamps: true }
);

menuItemSchema.index({ storeId: 1 });
menuItemSchema.index({ category: 1 });
menuItemSchema.index({ tags: 1 });
menuItemSchema.index({ createdAt: -1 });

module.exports = mongoose.model('MenuItem', menuItemSchema);
