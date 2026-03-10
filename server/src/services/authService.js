const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Store = require('../models/Store');
const ApiError = require('../utils/ApiError');
const sanitizeUser = require('../utils/sanitizeUser');
const { signToken } = require('../utils/jwt');
const ROLES = require('../constants/roles');

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const generateUniqueStoreSlug = async (storeName) => {
  const baseSlug = slugify(storeName) || `store-${Date.now()}`;
  let candidate = baseSlug;
  let counter = 1;

  while (await Store.exists({ slug: candidate })) {
    candidate = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return candidate;
};

const getAdminStoreSummary = async (adminId) => {
  const store = await Store.findOne({ adminId }).select('_id name slug');
  if (!store) {
    return { storeId: null, store: null };
  }

  return {
    storeId: store._id,
    store: {
      id: store._id,
      name: store.name,
      slug: store.slug
    }
  };
};

const attachStoreIfAdmin = async (user) => {
  if (user.role !== ROLES.ADMIN) {
    return { user: sanitizeUser(user), store: null };
  }

  const { storeId, store } = await getAdminStoreSummary(user._id);
  return {
    user: sanitizeUser(user, { storeId }),
    store
  };
};

const buildAuthPayload = async (user) => {
  const { user: safeUser, store } = await attachStoreIfAdmin(user);
  return {
    token: signToken({ userId: user._id, role: user.role }),
    user: safeUser,
    store
  };
};

const assertUniqueEmail = async (email) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, 'Email already registered', 'DUPLICATE_KEY');
  }
};

const registerCustomer = async ({ name, email, password, phone, address }) => {
  await assertUniqueEmail(email);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    role: ROLES.CUSTOMER
  });

  return buildAuthPayload(user);
};

const registerPartner = async ({ name, email, password, store }) => {
  await assertUniqueEmail(email);

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: ROLES.ADMIN
  });

  try {
    const slug = await generateUniqueStoreSlug(store.name);
    await Store.create({
      ...store,
      slug,
      adminId: createdUser._id
    });

    return buildAuthPayload(createdUser);
  } catch (error) {
    await User.findByIdAndDelete(createdUser._id);
    throw error;
  }
};

const loginUser = async ({ email, password }, expectedRole) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, 'Invalid credentials', 'INVALID_CREDENTIALS');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials', 'INVALID_CREDENTIALS');
  }

  if (expectedRole && user.role !== expectedRole) {
    throw new ApiError(403, 'Account role is not allowed for this login', 'FORBIDDEN');
  }

  return buildAuthPayload(user);
};

const getCurrentUser = async (user) => {
  const payload = await attachStoreIfAdmin(user);
  return payload.user;
};

module.exports = {
  registerCustomer,
  registerPartner,
  loginUser,
  getCurrentUser
};
