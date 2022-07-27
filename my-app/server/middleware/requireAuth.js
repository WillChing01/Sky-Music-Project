const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utility/jwt');
const User = require('../models/User');

const getTokenByAuthHeader = (header) => {
    return header.split(' ')[1]
};

const requireAuth = async (req, res, next) => {
  const { authorization: authHeader } = req.headers;

  if (!authHeader) {
    return res.status(401).json({
        error: 'Authorization token required.'
    });
  }
  const token = getTokenByAuthHeader(authHeader);

  try {
    const { _id } = verifyToken(token);
    req.user = await User.findOne({ _id }).select('_id');
    next();
  } catch (err) {
    res.status(401).json({
        error: 'Request not authorized.'
    });
  }
}

module.exports = requireAuth;