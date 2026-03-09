const sanitizeUser = (userDoc) => {
  const user = userDoc.toObject ? userDoc.toObject() : userDoc;
  const { password, __v, ...safeUser } = user;
  return safeUser;
};

module.exports = sanitizeUser;
