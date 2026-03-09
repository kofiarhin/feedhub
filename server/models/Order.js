const mongoose = require('mongoose');
const { ORDER_STATUS, FULFILLMENT_TYPES, PAYMENT_METHODS } = require('../constants/appConstants');

const orderItemSchema = new mongoose.Schema(
  {
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, index: true },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    notes: { type: String, default: '' },
    fulfillmentType: { type: String, enum: FULFILLMENT_TYPES, required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, enum: PAYMENT_METHODS, default: 'cash_on_delivery' },
    status: { type: String, enum: Object.values(ORDER_STATUS), default: ORDER_STATUS.PENDING, index: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
