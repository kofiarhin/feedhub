const sanitizeUser = (userDoc, extra = {}) => {
  const user = userDoc.toObject ? userDoc.toObject() : userDoc;
  const { password, __v, ...safeUser } = user;

  return {
    ...safeUser,
    ...extra,
  };
};

module.exports = sanitizeUser;
