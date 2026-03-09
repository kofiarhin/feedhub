const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true, unique: true },
    cuisineType: { type: String, required: true, index: true },
    openingHours: { type: String, required: true },
    logo: { type: String, default: '' },
    rating: { type: Number, default: 4.5 },
    deliveryEstimate: { type: String, default: '30-40 min' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Store', storeSchema);
