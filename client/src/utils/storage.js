const AUTH_TOKEN_KEY = 'feedhub_auth_token';
const AUTH_USER_KEY = 'feedhub_auth_user';
const CART_KEY = 'feedhub_cart';

const readStorage = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY) || '';
export const setAuthToken = (token) => {
  if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
};
export const clearAuthToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);

export const getAuthUser = () => readStorage(AUTH_USER_KEY, null);
export const setAuthUser = (user) => localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user || null));
export const clearAuthUser = () => localStorage.removeItem(AUTH_USER_KEY);

export const getCartState = () => readStorage(CART_KEY, { items: [], storeId: null });
export const setCartState = (cartState) => localStorage.setItem(CART_KEY, JSON.stringify(cartState));
export const clearCartState = () => localStorage.removeItem(CART_KEY);
