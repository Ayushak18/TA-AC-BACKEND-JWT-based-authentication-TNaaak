let jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: async (req, res, next) => {
    let token = req.headers.authorization;
    try {
      if (token) {
        let payload = await jwt.verify(token, 'Secret');
        req.user = payload;
        next();
      } else {
        res.send('No Token present');
      }
    } catch (error) {
      next(error);
    }
  },
};
