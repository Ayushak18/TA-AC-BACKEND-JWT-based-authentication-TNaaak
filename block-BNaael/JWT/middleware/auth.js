let jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: async (req, res, next) => {
    console.log(req.headers);
    // let token = req.headers.authorization;
    // try {
    //   if (token) {
    //     let payload = await jwt.verify(token, 'ANewSecret');
    //     req.user = payload;
    //     next();
    //   } else {
    //     res.send('Token Required');
    //   }
    // } catch (error) {
    //   console.log(error);
    //   next(error);
    // }
  },
};
