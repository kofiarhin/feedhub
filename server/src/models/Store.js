const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    cuisineType: { type: String, required: true },
    openingHours: { type: String, required: true },
    logo: { type: String },
    rating: { type: Number, default: 4.5 },
    deliveryEstimate: { type: String, default: '25-40 min' }
  },
  { timestamps: true }
);

storeSchema.index({ cuisineType: 1 });
storeSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Store', storeSchema);
