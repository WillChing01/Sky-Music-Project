const { verifyToken } = require('../utility/jwt');
const User = require('../models/User');

const getTokenByAuthHeader = (header) => {
    return header.split(' ')[1];
};

const getUserIdIfValid = async (_id) => {
   const idIfValid = await User.findOne({ _id }).select('_id');
   return idIfValid;
};

const requireAuth = async (req, res, next) => {
  const { authorization: authHeader } = req.headers;

  if (!authHeader) {
    return res.status(401).json({
        error: 'Authorization token required.'
    });
  } else {
    const token = getTokenByAuthHeader(authHeader);
    try {
      const { _id } = verifyToken(token);
      req.user = await getUserIdIfValid(_id);
      next();
    } catch (err) {
      res.status(401).json({
          error: 'Request not authorized.'
      });
    }
  }
};

module.exports = requireAuth;