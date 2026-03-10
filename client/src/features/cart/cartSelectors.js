export const selectCartItems = (state) => state.cart.items;
export const selectCartStoreId = (state) => state.cart.storeId;
export const selectCartCount = (state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartSubtotal = (state) => state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const selectCartTotal = (state) => selectCartSubtotal(state);
