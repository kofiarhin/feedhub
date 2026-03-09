const mongoose = require('mongoose');
const { ALL_FULFILLMENT_TYPES, FULFILLMENT_TYPES } = require('../constants/fulfillmentTypes');
const { ALL_PAYMENT_METHODS, PAYMENT_METHODS } = require('../constants/paymentMethods');
const { ORDER_STATUS, VALID_ORDER_STATUS } = require('../constants/orderStatus');

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
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
      type: String,
      required: function requiredAddress() {
        return this.fulfillmentType === FULFILLMENT_TYPES.DELIVERY;
      }
    },
    notes: { type: String },
    fulfillmentType: { type: String, enum: ALL_FULFILLMENT_TYPES, default: FULFILLMENT_TYPES.DELIVERY },
    items: { type: [orderItemSchema], required: true },
    totalPrice: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, enum: ALL_PAYMENT_METHODS, default: PAYMENT_METHODS.CASH_ON_DELIVERY },
    status: { type: String, enum: VALID_ORDER_STATUS, default: ORDER_STATUS.PENDING }
  },
  { timestamps: true }
);

orderSchema.index({ storeId: 1 });
orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);
