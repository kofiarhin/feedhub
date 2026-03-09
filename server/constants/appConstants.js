const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

const ORDER_STATUS = {
  PENDING: 'Pending',
  PREPARING: 'Preparing',
  READY: 'Ready',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled'
};

const ORDER_TRANSITIONS = {
  Pending: ['Preparing'],
  Preparing: ['Ready'],
  Ready: ['Completed'],
  Completed: [],
  Cancelled: []
};

const FULFILLMENT_TYPES = ['delivery', 'pickup'];
const PAYMENT_METHODS = ['cash_on_delivery'];
const MENU_CATEGORIES = ['Starters', 'Main Dishes', 'Drinks', 'Desserts'];
const MENU_TAGS = [
  'pizza',
  'burger',
  'italian',
  'mexican',
  'indian',
  'chinese',
  'vegan',
  'vegetarian',
  'gluten-free',
  'halal',
  'dessert',
  'drink',
  'starter',
  'main'
];

module.exports = {
  USER_ROLES,
  ORDER_STATUS,
  ORDER_TRANSITIONS,
  FULFILLMENT_TYPES,
  PAYMENT_METHODS,
  MENU_CATEGORIES,
  MENU_TAGS
};
