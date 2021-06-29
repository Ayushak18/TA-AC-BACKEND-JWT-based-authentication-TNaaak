let jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: async (req, res, next) => {
    let token = req.headers.authorization;
    try {
      if (token) {
        let payload = await jwt.verify(token, 'thisIsSecretWeAreGoingToUse');
        req.user = payload;
        next();
      } else {
        res.status(400).json({ error: 'No Token' });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
